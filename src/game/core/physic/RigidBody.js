import {Bodies} from 'matter-js';

export function Rectangle({x, y, width, height}, options) {
    return Bodies.rectangle(x, y, width, height, options);
}
