import {Container, Sprite} from 'pixi.js';

import {Speed} from '../Base/Speed';

import {Arms} from './Arms';
import {Collision} from '../Base/Collision';

const res = app.resource.get;

export function Tank() {
    const it = new Container();

    it.name = 'Tank';

    const body = new Sprite(
        res('tanks').textures[`tank_blue.png`]
    );

    it.addChild(body);

    Speed({maxSpeed: 2}, it);

    Arms(it);

    Collision(it);

    return it;
}
