import {Sprite, AnimatedSprite} from 'pixi.js';

import GameObject from '../../../core/GameObject';
import {Rectangle} from '../../../core/RigidBody';
import {degreeToRadian, waitByFrameTime} from '@kayac/utils';

const res = app.resource.get;

const {values, assign} = Object;

function Bullet() {
    const sprite = new Sprite(res('bullets').textures['bullet_1.png']);

    const body = Rectangle(sprite, {density: 10, frictionAir: 0.05});

    const it = GameObject({sprite, body});

    const explosion = new AnimatedSprite(values(res('explosion').textures));

    explosion.animationSpeed = 0.33;

    explosion.loop = false;

    explosion.alpha = 0;

    it.addChild(explosion);

    return assign(it, {bomb});

    function bomb() {
        sprite.alpha = 0;

        explosion.alpha = 1;

        explosion.gotoAndPlay(0);

        return new Promise((resolve) => {
            explosion.onComplete = () => {
                it.removeChild(explosion);

                resolve();
            };
        });
    }
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

    async function fire() {
        shot.alpha = 1;

        shot.gotoAndPlay(0);

        const bullet = Bullet();

        bullet.body.rotation = it.body.rotation + degreeToRadian(180);

        bullet.position = shot.getGlobalPosition();

        it.body.addForce({y: -8});
        bullet.body.addForce({y: -180});

        app.scenes['main'].addChild(bullet);

        await waitByFrameTime(360);

        await bullet.bomb();

        app.scenes['main'].removeChild(bullet);

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
