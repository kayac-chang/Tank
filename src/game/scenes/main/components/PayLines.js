import {wait} from '@kayac/utils';
import {Digit} from './Digit';

const condition = [
    [1, 3, 7, 9, 13, 17, 19],
    [0, 5, 6, 11, 12, 15, 16],
    [2, 4, 8, 10, 14, 18],
];

export function PayLines(it) {
    let lines = [];

    let digits = [];

    it.children.forEach((child) => {
        const [type, index] = child.name.split('@');

        if (['line', 'inner'].includes(type)) {
            if (!lines[index]) lines[index] = {};

            return lines[index][type] = child;
            //
        } else if (['score', 'frame'].includes(type)) {
            let el = child;

            if (type === 'score') {
                el = Digit(child);

                el.name = `text@${index}`;

                el.fontScale = 0.25;
            }

            if (!digits[index]) digits[index] = {};

            return digits[index][type] = el;
            //
        }
        //
    });

    lines = lines.map(PayLine);

    digits = digits.map(Field);

    it.addChild(...digits.map(({score}) => score));

    app.on('ShowResult', showResult);

    let skipIdle = false;
    app.on('SpinStart', () => {
        setAll('visible', false, lines);
        setAll('visible', false, digits);

        it.visible = false;

        skipIdle = true;
    });

    return it;

    async function showResult({results}) {
        it.visible = true;

        const matchLines =
            results
                .filter(({line}) => line !== -1)
                .map(({line}) => lines[line]);

        setAll('visible', true, matchLines);

        skipIdle = false;
        app.once('Idle', onceIdle);

        async function onceIdle() {
            if (skipIdle) return;

            setAll('visible', false, matchLines);

            let loop = true;

            app.once('SpinStart', () => loop = false);

            while (loop) {
                for (const {line, scores} of results) {
                    if (line !== -1) {
                        lines[line].visible = true;

                        showScores(line, scores);

                        await wait(850);

                        lines[line].visible = false;
                        setAll('visible', false, digits);

                        await wait(1000);
                    }
                }
            }
        }

        function showScores(line, scores) {
            const index =
                condition.findIndex((row) => row.includes(line));

            digits[index].value = scores;

            digits[index].visible = true;
        }
    }
}

function setAll(prop, value, targets) {
    targets.forEach((line) => line[prop] = value);
}

function Field({frame, score}) {
    const it = {
        get visible() {
            return frame.visible;
        },
        set visible(bool) {
            frame.visible = bool;
            score.visible = bool;
        },

        get value() {
            return score.value;
        },
        set value(newValue) {
            score.value = newValue;
        },

        frame, score,
    };

    it.visible = false;

    return it;
}

function PayLine({inner, line}) {
    const it = {
        get visible() {
            return line.visible;
        },
        set visible(bool) {
            inner.visible = bool;
            line.visible = bool;
        },
    };

    it.visible = false;

    return it;
}
