import {Sprite} from 'pixi.js';
import {Rectangle} from '../../../core/physic/RigidBody';
import GameObject from '../../../core/GameObject';

const res = app.resource.get;

export function Wall() {
    const it = GameObject();

    it.sprite = new Sprite(res('crates').textures['crateMetal.png']);

    it.rigidBody = Rectangle(it, {isStatic: true});

    return it;
}

export function Hay() {
    const it = GameObject();

    it.sprite = new Sprite(res('crates').textures['crateWood.png']);

    it.rigidBody = Rectangle(it, {density: 0.1, frictionAir: 0.05});

    let health = 100;

    it.on('CollisionStart', (object) => {
        const damage = object.damage || 0;

        health -= damage;

        if (health <= 0) it.destroy();
    });

    return it;
}
