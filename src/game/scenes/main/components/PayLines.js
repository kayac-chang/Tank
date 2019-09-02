import {wait} from '@kayac/utils';

import {Text} from './Text';

const condition = [
    [1, 3, 7, 9, 13, 17, 19],
    [0, 5, 6, 11, 12, 15, 16],
    [2, 4, 8, 10, 14, 18],
];

export function PayLines(it) {
    const lines = [];

    let digits = [];

    it.children.forEach((child) => {
        const [type, index] = child.name.split('@');

        if (type === 'line') {
            return lines.push(child);
            //
        } else if (['score', 'frame'].includes(type)) {
            let el = child;

            if (type === 'score') {
                el = Text(child, {font: '24px number'});

                el.name = `text@${index}`;
            }

            if (!digits[index]) digits[index] = {};

            return digits[index][type] = el;
        }
        //
    });

    digits = digits.map(Field);

    it.addChild(...digits.map(({score}) => score));

    app.on('ShowResult', showResult);

    app.on('SpinStart', () => {
        setAll('visible', false, lines);
        setAll('visible', false, digits);

        it.visible = false;
    });

    return it;

    async function showResult({results}) {
        it.visible = true;

        const matchLines =
            results
                .filter(({line}) => line !== -1)
                .map(({line}) => lines[line]);

        setAll('visible', true, matchLines);

        if (matchLines.length <= 0) return;

        app.once('Idle', onceIdle);

        app.once('SpinStart', () => app.off('Idle', onceIdle));

        async function onceIdle() {
            setAll('visible', false, matchLines);

            let skip = false;

            app.once('SpinStart', () => skip = true);

            const result = ResultGen();

            showLine();

            function* ResultGen() {
                while (true) {
                    for (const result of results) {
                        yield result;
                    }
                }
            }

            async function showLine() {
                const {line, scores} = result.next().value;

                if (line === -1) return;

                const payLine = lines[line];
                payLine.visible = true;

                const digit = showScores(line, scores);

                await wait(1000);

                payLine.visible = false;
                digit.visible = false;

                await wait(1000);

                if (skip) return;

                showLine();
            }
        }
    }

    function showScores(line, scores) {
        const index =
            condition.findIndex((row) => row.includes(line));

        const digit = digits[index];

        digit.value = scores;

        digit.visible = true;

        return digit;
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
            return score.text;
        },
        set value(newValue) {
            score.text = newValue;
        },

        frame, score,
    };

    it.visible = false;

    return it;
}
