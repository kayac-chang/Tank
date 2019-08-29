import {wait} from '@kayac/utils';
import {Digit, pauseAll} from './index';

import {fadeIn} from '../../../effect';

export function Collect(it) {
    pauseAll(it);

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

    const count = Digit(it.getChildByName('count'));

    count.fontScale = 0.4;

    it.addChild(count);

    return {
        show,

        next,
    };

    function next() {
        return levels.slice(
            count.value,
            count.value + 1
        )[0];
    }

    function Level(it) {
        const level = Number(it.name.split('@')[1]);
        const scale = scales.findIndex((rule) => rule.includes(level));
        const color = colors[scale];

        it.children.forEach((child) => {
            (child.name.includes('particle')) ?
                child.tint = color.sub :
                child.tint = color.main;
        });

        return Object.assign(it, {show});

        async function show() {
            it.alpha = 1;

            const anim = it.transition['anim'];

            anim.restart();

            await wait(750);

            count.value = level;
        }
    }

    async function show(anim) {
        if (['x2', 'x3', 'x5', 'x8', 'light'].includes(anim)) {
            const animation = it.transition[anim];

            return animation.restart();
        }

        levels.forEach((it) => it.alpha = 0);

        it.visible = true;

        const show = it.transition['show'];

        show.restart();

        await wait(1500);

        count.value = 0;

        await fadeIn({targets: count}).finished;
    }
}
