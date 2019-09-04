import {Sprite} from 'pixi.js';

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

                return list;
            }, []);

    const target = it.getChildByName('target');

    const {texture} = app.resource.get('energy');

    return Object.assign(grid, {showEnergy});

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
}

function Energy(texture) {
    const it = new Sprite(texture);

    it.anchor.set(.5);

    return it;
}
