import {Scene} from './Scene';
import {Tank} from './components/Tank';

import {Keymap} from '../../core/Keymap';

import {degreeToRadian, waitByFrameTime} from '@kayac/utils';

export function create() {
    const scene = Scene();

    const tank = Tank();

    tank.position = {x: 500, y: 500};

    scene.addChild(tank);

    Keymap({
        'w': () => tank.body.addForce({y: 5}),
        'a': () => tank.body.rotation -= degreeToRadian(2),
        's': () => tank.body.addForce({y: -5}),
        'd': () => tank.body.rotation += degreeToRadian(2),
        'space': async () => {
            const bullet = tank.fire();

            scene.addChild(bullet);

            await waitByFrameTime(360);

            scene.removeChild(bullet);
        },
    });
}

export * from './data';
