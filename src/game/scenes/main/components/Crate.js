import {Sprite} from 'pixi.js';
import {Rectangle} from '../../../core/RigidBody';
import GameObject from '../../../core/GameObject';

const res = app.resource.get;

export function Crate() {
    const sprite = new Sprite(res('crates').textures['crateMetal.png']);

    const body = Rectangle(sprite, {density: 5, frictionAir: 0.05});

    return GameObject({sprite, body});
}
