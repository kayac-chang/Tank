import {BitmapText} from 'pixi.js/lib/extras';

export function Text({x, y}, config) {
    let {text, ...options} = config;

    text = text || '';

    const it = new BitmapText(text, options);

    it.position.set(x, y);

    it.anchor.set(.5);

    return it;
}
