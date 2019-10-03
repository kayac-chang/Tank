import {Sprite} from 'pixi.js';
import {Rectangle} from '../../../core/physic/RigidBody';
import GameObject from '../../../core/GameObject';

const res = app.resource.get;

export function Crate() {
    const it = GameObject();

    it.sprite = new Sprite(res('crates').textures['crateMetal.png']);

    it.rigidBody = Rectangle(it, {density: 0.1, frictionAir: 0.05});

    let health = 3;

    it.on('CollisionActive', () => {
        health -= 1;

        if (!health) it.destroy();
    });

    return it;
}
