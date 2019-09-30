import {Vector as _} from 'matter-js';

const {assign} = Object;

function rotate(angle) {
    return Vector(_.rotate(this, angle));
}

function add(value) {
    return Vector(_.add(this, value));
}

export default function Vector({x = 0, y = 0}) {
    const it = _.create(x, y);

    return assign(it, {
        rotate, add,
    });
}
