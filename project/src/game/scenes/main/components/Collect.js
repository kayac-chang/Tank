import {waitByFrameTime} from '@kayac/utils';
import {pauseAll, Text} from './index';

import {fadeIn, fadeOut} from '../../../effect';

const {assign, defineProperties} = Object;

export function Collect(it) {
    const colors = [
        {main: 0x5A00FF, sub: 0x2679E5},
        {main: 0xFF0066, sub: 0xF171F1},
        {main: 0xD800FF, sub: 0xF154F1},
        {main: 0xFF7800, sub: 0xF1C915},
        {main: 0xFAFF00, sub: 0xFAFF00},
    ];

    const scales = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9],
        [10, 11],
        [12, 13],
        [14, 15],
    ];

    const levels =
        it.children
            .filter(({name}) => name.includes('level'))
            .map(Level);

    const count = Text(
        it.getChildByName('count'),
        {font: '36px number'}
    );

    const frame = it.getChildByName('frame');

    count.alpha = 0;

    it.addChild(count);

    pauseAll(it);

    let tint = '#176bff';

    defineProperties(it, {
        tint: {
            get() {
                return tint;
            },
            set(value) {
                tint = value;

                frame.tint = value;
            },
        },
    });

    return assign(it, {show, hide, levels});

    function Level(it) {
        const level = Number(it.name.split('@')[1]);
        const scale = scales.findIndex((rule) => rule.includes(level));
        const color = colors[scale];

        it.children.forEach((child) => {
            (child.name.includes('particle')) ?
                child.tint = color.sub :
                child.tint = color.main;
        });

        return assign(it, {show});

        async function show() {
            it.alpha = 1;

            it.transition['anim'].restart();

            showLight();

            await waitByFrameTime(500);

            count.text = level;

            showLevel(level);
        }
    }

    function showLight() {
        it.transition['light'].restart();
    }

    function showLevel(level) {
        const match = {
            '8': 'x2',
            '10': 'x3',
            '12': 'x5',
            '14': 'x8',
        }[level];

        if (match) it.transition[match].restart();
    }

    async function show() {
        it.alpha = 1;

        const show = it.transition['show'];

        show.restart();

        await waitByFrameTime(1500);

        count.text = 0;

        await fadeIn({targets: count}).finished;
    }

    async function hide() {
        await fadeOut({targets: it}).finished;

        it.alpha = 0;
    }
}
