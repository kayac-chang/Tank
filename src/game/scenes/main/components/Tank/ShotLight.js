import {AnimatedSprite} from 'pixi.js';

const {values} = Object;

const res = app.resource.get;

export function ShotLight() {
    const it = new AnimatedSprite(values(res('shot').textures));

    it.animationSpeed = 0.33;

    it.loop = false;

    it.onComplete = () => it.alpha = 0;

    it.onComplete();

    return it;
}
