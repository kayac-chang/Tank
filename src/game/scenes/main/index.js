import {Scene} from './Scene';
import {Tank} from './components/Tank';

import {Keymap} from './Keymap';

import {degreeToRadian} from '@kayac/utils';

export function create() {
    const scene = Scene();

    const tank = Tank();

    tank.position = {x: 500, y: 500};

    scene.addChild(tank);

    Keymap({
        'w': () => tank.body.addForce({y: 2}),
        'a': () => tank.body.rotation -= degreeToRadian(2),
        's': () => tank.body.addForce({y: -2}),
        'd': () => tank.body.rotation += degreeToRadian(2),
    });
}

export * from './data';
