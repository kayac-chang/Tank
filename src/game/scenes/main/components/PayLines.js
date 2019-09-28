import {Text} from './Text';
import {changeColor} from '../../../effect';

const {assign, defineProperties, values} = Object;

export function PayLines(it) {
    const lines = {};

    let digits = [];

    it.children.forEach((child) => {
        const [type, index] = child.name.split('@');

        if (type === 'line') {
            return lines[index] = child;
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

    const _lines =
        values(lines)
            .flatMap(({children}) => children);

    let tint = 0x176BFF;

    defineProperties(it, {
        tint: {
            get() {
                return tint;
            },
            set(value) {
                tint = value;

                change(value);
            },
        },
    });

    return assign(it, {show});

    function change(color) {
        [..._lines, ...digits]
            .forEach((it) => it.tint = color);
    }

    function show({line, scores}) {
        const payLine = lines[line];

        payLine.alpha = 1;

        const field = digits[mapping(line)];

        field.value = scores;

        return function close() {
            payLine.alpha = 0;

            field.value = '';
        };
    }
}

function mapping(lineId) {
    const conditions = [
        [1, 3, 7, 9, 13, 17, 19],
        [0, 5, 6, 11, 12, 15, 16],
        [2, 4, 8, 10, 14, 18],
    ];

    return (
        conditions
            .findIndex((row) => row.includes(lineId))
    );
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
            it.visible = Boolean(newValue);

            score.text = newValue;
        },

        get tint() {
            return frame.tint;
        },
        set tint(value) {
            frame.tint = value;
        },

        frame, score,
    };

    it.visible = false;

    return it;
}
