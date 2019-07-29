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
    const test = Math.round(symbol.pos - pos);

    const control = reel.symbols.length - 1;

    return test > control;
}

function changeTexture(reel, symbol) {
    const {value} = reel.strip.next();

    symbol.texture = value;
}

function updatePos(symbol, pos) {
    symbol.pos = pos;
}
