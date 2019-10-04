import {Scene, Tank, Crate} from './components';

import {SandArea} from './SandArea';
import {Keymap} from '../../core/Keymap';

import {Container} from 'pixi.js';

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

                area.x = area.width * x;
                area.y = area.height * y;

                return area;
            });
            //
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
}


