import {Sprite} from 'pixi.js';
import {Speed} from '../Base/Speed';

const res = app.resource.get;

const REVERSE = 8;

export function Bullet() {
    const texture = res('bullets').textures['bullet_1.png'];

    texture.rotate = REVERSE;

    return function spawn({position, angle}) {
        const it = Speed({maxSpeed: 2}, new Sprite(texture));

        app.stage.addChild(it);

        return it;
    };
}
