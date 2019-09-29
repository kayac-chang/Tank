import {Container, Sprite} from 'pixi.js';

import {Speed} from '../Base/Speed';

import {Arms} from './Arms';

const res = app.resource.get;

export function Tank() {
    const it = new Container();

    const body = new Sprite(
        res('tanks').textures[`tank_blue.png`]
    );

    it.addChild(body);

    Speed({maxSpeed: 2}, it);

    Arms(it);

    return it;
}
