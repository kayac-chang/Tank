import {Sprite, AnimatedSprite} from 'pixi.js';

import GameObject from '../../../core/GameObject';
import {Rectangle} from '../../../core/physic';

import {degreeToRadian} from '@kayac/utils';
import {Body, Vector} from 'matter-js';

const res = app.resource.get;

const {assign, values} = Object;

function turn(it, degree) {
    return Body.rotate(it.rigidBody, degreeToRadian(degree));
}

function bomb(it, {x, y}) {
    const bomb = new AnimatedSprite(values(res('explosion').textures));

    bomb.position.set(x, y);

    bomb.animationSpeed = 0.33;

    bomb.loop = false;

    bomb.gotoAndPlay(0);

    it.addChild(bomb);

    return new Promise((resolve) => {
        bomb.onComplete = () => {
            it.removeChild(bomb);

            resolve();
        };
    });
}

function Bullet() {
    const it = GameObject();

    const texture = res('bullets').textures['bullet_1.png'];

    texture.rotate = 4;

    it.sprite = new Sprite(texture);

    it.rigidBody = Rectangle(it, {density: 0.05, frictionAir: 0.05});

    it.on('CollisionStart', clear);

    return it;

    function clear() {
        bomb(app.scenes['main'], it.transformer);

        it.destroy();
    }
}

function move(it, {x = 0, y = 0}) {
    const vec = Vector.create(x, y);

    const force = Vector.rotate(vec, it.rigidBody.angle);

    return Body.applyForce(
        it.rigidBody,
        it.rigidBody.position,
        force
    );
}

function Arms(it) {
    const light = new AnimatedSprite(values(res('shot').textures));

    light.animationSpeed = 0.33;

    light.loop = false;

    light.alpha = 0;

    light.onComplete = () => light.alpha = 0;

    light.position.y = it.height / 2;

    it.addChild(light);

    return assign(it, {fire});

    async function fire() {
        light.alpha = 1;

        light.gotoAndPlay(0);

        const bullet = Bullet();

        const pos =
            app.scenes['main']
                .toLocal(light.getGlobalPosition());

        assign(bullet.transformer, {x: pos.x, y: pos.y});

        Body.setAngle(bullet.rigidBody, it.rotation);

        move(bullet, {y: 1});

        app.scenes['main'].addChild(bullet);
    }
}

export function Tank() {
    const it = GameObject();

    it.name = 'Tank';

    it.sprite = new Sprite(res('tanks').textures['tank_blue.png']);

    it.rigidBody = Rectangle(it, {density: 0.1, frictionAir: 0.05});

    Arms(it);

    return assign(it, {
        forward, backward, turnLeft, turnRight,
    });

    function forward() {
        move(it, {y: 1});
    }

    function backward() {
        move(it, {y: -1});
    }

    function turnLeft() {
        turn(it, -5);
    }

    function turnRight() {
        turn(it, 5);
    }
}
