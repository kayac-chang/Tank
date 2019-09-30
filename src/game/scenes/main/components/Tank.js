import {Sprite, AnimatedSprite} from 'pixi.js';

import GameObject from '../../../core/GameObject';
import {Rectangle} from '../../../core/RigidBody';
import {degreeToRadian, waitByFrameTime} from '@kayac/utils';

const res = app.resource.get;

const {values, assign} = Object;

function Bullet() {
    const sprite = new Sprite(res('bullets').textures['bullet_1.png']);

    const body = Rectangle(sprite, {density: 10, frictionAir: 0.05});

    return GameObject({sprite, body});
}

function Arms(it) {
    const shot = new AnimatedSprite(values(res('shot').textures));

    shot.position.y = it.height / 2;

    shot.animationSpeed = 0.33;

    shot.loop = false;

    shot.onComplete = hide;

    hide();

    it.addChild(shot);

    return assign(it, {fire});

    function fire() {
        shot.alpha = 1;

        shot.gotoAndPlay(0);

        const bullet = Bullet();

        bullet.body.rotation = it.body.rotation + degreeToRadian(180);

        bullet.position = shot.getGlobalPosition();

        it.body.addForce({y: -8});
        bullet.body.addForce({y: -180});

        return bullet;
    }

    function hide() {
        shot.alpha = 0;
    }
}

export function Tank() {
    const sprite = new Sprite(res('tanks').textures['tank_blue.png']);

    const body = Rectangle(sprite, {density: 5, frictionAir: 0.05});

    const it = GameObject({sprite, body});

    Arms(it);

    return it;
}
