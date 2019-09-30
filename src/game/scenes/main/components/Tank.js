import GameObject from '../../../core/GameObject';

import {Sprite} from 'pixi.js';
import {Rectangle} from '../../../core/RigidBody';

const res = app.resource.get;

export function Tank() {
    const view = new Sprite(res('tanks').textures['tank_blue.png']);
    const body = Rectangle(view, {density: 1, frictionAir: 0.05});

    return GameObject({view, body});
}
