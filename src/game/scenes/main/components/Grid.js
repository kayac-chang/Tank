import {Sprite} from 'pixi.js';
import {nextFrame, wait} from '@kayac/utils';

import {fadeOut, move, popIn} from '../../../effect';

export function Grid(it) {
    const grid =
        it.children
            .filter(({name}) => name !== 'target')
            .reduce((list, child) => {
                const [type, pos] = child.name.split('@');

                const [row, col] = pos.split('_').map(Number);

                if (!list[row]) list[row] = [];
                if (!list[row][col]) list[row][col] = {};

                list[row][col][type] = child;

                if (type === 'effect') {
                    child.children
                        .forEach((child) => child.transition['anim'].pause());
                }

                return list;
            }, []);

    const target = it.getChildByName('target');

    const {texture} = app.resource.get('energy');

    app.on('ShowResult', showResult);

    app.on('Idle', showIdle);

    return {show};

    function showIdle({symbols}) {
        const list = [];

        grid.forEach((row, rowIdx) => {
            row.forEach(async (col, colIdx) => {
                const symbol = String(symbols[rowIdx][colIdx]);

                const comp = col['effect'];

                comp.children
                    .forEach((child) => child.visible = false);

                const it = comp.getChildByName(symbol);

                const anim = it.transition['idle'];

                anim.loop = true;

                anim.restart();

                list.push(it);

                await nextFrame();

                it.visible = true;
            });
        });

        app.once('SpinStart', () => {
            list.forEach((it) => {
                const anim = it.transition['idle'];

                anim.pause();

                it.visible = false;
            });
        });
    }

    function showResult({results}) {
        it.visible = true;

        const list = [];

        results.forEach(({positions, symbols}) => {
            positions.forEach((colIdx, rowIdx) => {
                if (colIdx === undefined) return;

                const symbol = String(symbols[rowIdx]);

                const it =
                    grid[rowIdx][colIdx]['effect']
                        .getChildByName(symbol);

                const anim = it.transition['anim'];

                anim.restart();

                it.visible = true;

                list.push(it);
            });
        });

        app.once('Idle', onceIdle);

        app.once('SpinStart', () => {
            list.forEach((el) => {
                const anim = el.transition['anim'];

                anim.pause();

                el.visible = false;

                it.visible = false;
            });
        });

        async function onceIdle() {
            let loop = true;

            app.once('SpinStart', () => loop = false);

            while (loop) {
                for (const {positions, symbols} of results) {
                    const list =
                        positions.map((colIdx, rowIdx) => {
                            const symbol = String(symbols[rowIdx]);

                            const it =
                                grid[rowIdx][colIdx]['effect']
                                    .getChildByName(symbol);

                            const anim = it.transition['anim'];

                            anim.restart();

                            it.visible = true;

                            return it;
                        });

                    await wait(850);

                    list.forEach((it) => it.visible = false);

                    await wait(1000);
                }
            }
        }
    }

    async function show(type, [row, col]) {
        const child = grid[row][col][type];

        child.visible = true;

        const anim = child.transition['anim'];

        anim.restart();

        await wait(500);

        if (type === 'energy') energy(child);

        await fadeOut({targets: child});
    }

    async function energy(child) {
        const energy = Energy(texture);

        energy.position.set(
            child.x + (child.width / 2),
            child.y + (child.height / 2)
        );

        it.addChild(energy);

        await popIn({targets: energy});

        await Promise.all([
            move({targets: energy, x: target.x, y: target.y}).finished,
            fadeOut({targets: energy}).finished,
        ]);
    }
}

function Energy(texture) {
    const it = new Sprite(texture);

    it.anchor.set(.5);

    return it;
}
