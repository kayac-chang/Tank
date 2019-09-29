import {ObservablePoint} from 'pixi.js';

import {nextFrame} from '@kayac/utils';

const {sin, cos} = Math;

const notZero = (num) => num !== 0;

export function RigidBody(it) {
    it.vector = new ObservablePoint(onVectorChange, it);

    return it;
}

async function onVectorChange() {
    while ([this.vector.x, this.vector.y].some(notZero)) {
        await update(this);
    }
}

async function update(it) {
    await nextFrame();

    it.position.x += getDisX(it);
    it.position.y += getDisY(it);
}

function getDisX(it) {
    return sin(it.rotation) * it.vector.x * -1;
}

function getDisY(it) {
    return cos(it.rotation) * it.vector.y;
}
