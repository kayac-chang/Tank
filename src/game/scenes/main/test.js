import {Scene, Tank, Crate} from './components';

import {SandArea} from './SandArea';
import {Keymap} from '../../core/Keymap';

export function create() {
    const scene = Scene();

    app.scenes['main'] = scene;

    const area = SandArea();

    const tank = Tank();

    tank.transformer.x = 500;
    tank.transformer.y = 500;

    scene.follow(tank);

    const crate = Crate();

    crate.transformer.x = 1000;
    crate.transformer.y = 500;

    scene.addChild(area, tank, crate);

    Keymap({
        'w': () => tank.forward(),
        's': () => tank.backward(),
        'a': () => tank.turnLeft(),
        'd': () => tank.turnRight(),
        'space': () => tank.fire(),
    });
}


