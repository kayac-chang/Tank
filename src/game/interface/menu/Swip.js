import {Button} from '../components';

const {sign} = Math;

export function Swipe(it) {
    it = Button(it);

    it
        .on('pointerdown', onStart)
        .on('pointerup', onEnd);

    return it;
}

function onStart(event) {
    const it = this;

    const originPos = getPos(event);

    return it.getScrollVec = getScrollVec;

    function getScrollVec(event) {
        const newPos = getPos(event);

        return sign(newPos.x - originPos.x);
    }

    function getPos(event) {
        return event.data.getLocalPosition(it.parent);
    }
}

function onEnd(event) {
    const it = this;

    const sign = it.getScrollVec(event);

    if (sign === -1) it.emit('Swipe', 'next');
    else if (sign === 1) it.emit('Swipe', 'prev');
}
