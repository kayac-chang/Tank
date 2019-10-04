import {Scene, Tank, Crate} from './components';

import {SandArea} from './SandArea';
import {Keymap} from '../../core/Keymap';

import {Container} from 'pixi.js';

// import '@kayac/utils';

import {equals} from 'ramda';

function Background() {
    const it = new Container();

    const table = [
        [[-1, -1], [0, -1], [1, -1]],
        [[-1, 0], [0, 0], [1, 0]],
        [[-1, 1], [0, 1], [1, 1]],
    ];

    const targets =
        table.flatMap((row) => {
            //
            return row.map(([x, y]) => {
                const area = SandArea();

                area.name = [x, y];
                area.x = area.width * x;
                area.y = area.height * y;

                return area;
            });
        });

    it.addChild(...targets);

    return it;
}

export function create() {
    const scene = Scene();

    app.scenes['main'] = scene;

    const tank = Tank();

    tank.transformer.x = 500;
    tank.transformer.y = 500;

    scene.follow(tank);

    const crate = Crate();

    crate.transformer.x = 1000;
    crate.transformer.y = 500;

    const background = Background();

    scene.addChild(background, tank, crate);

    Keymap({
        'w': () => tank.forward(),
        's': () => tank.backward(),
        'a': () => tank.turnLeft(),
        'd': () => tank.turnRight(),
        'space': () => tank.fire(),
    });

    let lastArea = undefined;
    tank.area = [0, 0];

    app.on('Update', () => {
        background.children.forEach((child) => {
            if (hit(tank, child) && !equals(tank.area, child.name)) {
                tank.area = child.name;

                console.log(child.name);
                // background.emit('Spawn', child.name);
            }
        });
    });
}

function hit(tarA, tarB) {
    [tarA, tarB] = [tarA, tarB].map(toDetail);

    const vx = tarA.centerX - tarB.centerX;
    const vy = tarA.centerY - tarB.centerY;

    const combinedHalfWidths = tarA.halfWidth + tarB.halfWidth;
    const combinedHalfHeights = tarA.halfHeight + tarB.halfHeight;

    return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;

    function toDetail(target) {
        const halfWidth = target.width / 2;
        const halfHeight = target.height / 2;
        const centerX = target.x + halfWidth;
        const centerY = target.y + halfHeight;

        return {
            halfWidth, halfHeight,
            centerX, centerY,
        };
    }
}


