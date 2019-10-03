import {Scene} from './components/Scene';
import {Tank} from './components/Tank';

import {Keymap} from '../../core/Keymap';

import {degreeToRadian} from '@kayac/utils';
import {Crate} from './components/Crate';
import {SandArea} from './SandArea';

export function create() {
    const scene = Scene();

    const sandArea = SandArea();



    const tank = Tank();

    tank.position = {x: 500, y: 500};

    const crate = Crate();

    crate.position = {x: 1000, y: 500};

    scene.addChild(tank, crate);

    app.scenes['main'] = scene;

    Keymap({
        'w': () => tank.body.addForce({y: 5}),
        'a': () => tank.body.rotation -= degreeToRadian(2),
        's': () => tank.body.addForce({y: -5}),
        'd': () => tank.body.rotation += degreeToRadian(2),
        'space': () => tank.fire(),
    });
}
