import {State} from './Slot';

export function update(reel) {
    reel.symbols
        .forEach((symbol) => {
            const newPos = getPos(reel, symbol);

            if (isSwapped(reel, symbol, newPos)) changeTexture(reel, symbol);

            updatePos(symbol, newPos);
        });
}

function getPos(reel, symbol) {
    return (reel.pos + symbol.initPos) % reel.symbols.length;
}

function isSwapped(reel, symbol, pos) {
    if (reel.state === State.Stop) return;

    const test = Math.round(symbol.pos - pos);

    const control = reel.symbols.length - 1;

    return test > control;
}

function changeTexture(reel, symbol) {
    symbol.texture = reel.next();
}

function updatePos(symbol, pos) {
    symbol.pos = pos;
}
