import {Sprite} from 'pixi.js';

const res = app.resource.get;

export function Bullet() {
    const texture = res('bullets').textures['bullet_1.png'];

    return () => new Sprite(texture);
}
