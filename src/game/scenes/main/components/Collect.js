import {wait} from '@kayac/utils';
import {Digit, pauseAll} from './index';

import {fadeIn, fadeOut} from '../../../effect';

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

    const count = Digit(it.getChildByName('count'));

    count.fontScale = 0.4;

    count.alpha = 0;

    it.addChild(count);

    pauseAll(it);

    app.on('Energy', showEnergy);

    app.on('Count', updateCount);

    return Object.assign(it, {show, hide});

    async function showEnergy({hasMatch, newMatch}) {
        const start = hasMatch.length;
        const end = start + newMatch.length;

        for (let level = start; level < end; level++) {
            levels[level].show();

            await wait(120);
        }
    }

    function updateCount({hasMatch, newMatch}) {
        count.value = hasMatch.length + newMatch.length;
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
        }
    }

    async function show(anim) {
        it.visible = true;

        if (['x2', 'x3', 'x5', 'x8', 'light'].includes(anim)) {
            const animation = it.transition[anim];
            return animation.restart();
        }

        const show = it.transition['show'];

        show.restart();

        count.value = 0;

        await wait(1500);

        await fadeIn({targets: count}).finished;
    }

    async function hide() {
        await fadeOut({targets: it}).finished;

        it.visible = false;

        it.alpha = 1;
    }
}