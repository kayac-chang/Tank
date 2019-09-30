import {Scene} from './Scene';
import {Tank} from './components/Tank';

import {Keymap} from './Keymap';

export function create() {
    const scene = Scene();

    const tank = Tank();

    tank.position = {x: 500, y: 500};

    scene.addChild(tank);

    Keymap({
        'w': () => tank.body.addForce({y: 1}),
        'a': () => tank.body.rotation -= .1,
        's': () => tank.body.addForce({y: -1}),
        'd': () => tank.body.rotation += .1,
    });
}

export * from './data';
