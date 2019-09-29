import {AnimatedSprite} from 'pixi.js';

const res = app.resource.get;
const {values, assign} = Object;

export function Light() {
    const it = new AnimatedSprite(values(res('shot').textures));

    reset.call(it);

    return assign(it, {
        //
        animationSpeed: 0.33,
        loop: false,
        onComplete: reset.bind(it),
        //
        execute,
    });
}

function execute() {
    this.alpha = 1;
    this.gotoAndPlay(0);
}

function reset() {
    this.alpha = 0;
}
