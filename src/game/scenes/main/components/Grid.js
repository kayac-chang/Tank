import {Sprite} from 'pixi.js';
import {wait} from '@kayac/utils';

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
                        .forEach((child) => {
                            child.transition['anim'].pause();

                            const animSprite = child.getChildByName('anim');
                            animSprite.anim.gotoAndStop(0);
                            animSprite.alpha = 0;
                        });
                }

                return list;
            }, []);

    const target = it.getChildByName('target');

    const {texture} = app.resource.get('energy');

    app.on('ShowResult', showResult);

    app.on('Stick', showStick);

    app.on('RandomWild', showRandomWild);

    return it;

    function showResult({results}) {
        const list = [];

        results.forEach(show);

        app.once('Idle', onceIdle);

        app.once('SpinStart', () => {
            app.off('Idle', onceIdle);

            list.forEach(close);
        });

        async function onceIdle() {
            list.forEach(close);

            let skip = false;

            app.once('SpinStart', () => skip = true);

            const result = ResultGen();

            showEffect();

            function* ResultGen() {
                while (true) {
                    for (const result of results) {
                        yield result;
                    }
                }
            }

            async function showEffect() {
                show(result.next().value);

                await wait(1000);

                list.forEach(close);

                await wait(1000);

                if (skip) return;

                showEffect();
            }
        }

        function close(it) {
            const anim = it.transition['anim'];

            anim.pause();

            it.visible = false;
        }

        function show({positions, symbols}) {
            positions.forEach((colIdx, rowIdx) => {
                if (colIdx === undefined) return;

                const symbol = String(symbols[rowIdx]);

                const effect =
                    grid[rowIdx][colIdx]['effect'];

                const it =
                    effect.getChildByName(symbol);

                it.transition['anim'].restart();

                it.visible = true;

                list.push(it);
            });
        }
    }

    function showStick({newMatch}) {
        const list =
            newMatch.map(({row, col}) => {
                const {stick} = grid[row][col];

                stick.visible = true;

                stick.transition['anim'].restart();

                showEnergy(stick);

                return stick;
            });

        app.once('Idle', () => {
            for (const stick of list) {
                stick.visible = false;
            }
        });
    }

    async function showEnergy(child) {
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

        it.removeChild(energy);
    }

    function showRandomWild(positions) {
        positions.forEach((row, rowIndex) => {
            if (!row) return;

            row.forEach(async (colIndex) => {
                const {trans} = grid[rowIndex][colIndex];

                trans.visible = true;

                trans.transition['anim'].restart();

                await wait(2000);

                trans.false = true;
            });
        });
    }
}

function Energy(texture) {
    const it = new Sprite(texture);

    it.anchor.set(.5);

    return it;
}
