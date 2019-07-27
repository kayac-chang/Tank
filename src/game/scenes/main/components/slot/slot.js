function update(reel) {
    reel.symbols
        .forEach((symbol) => {
            const pos = getPos(reel, symbol);

            if (isSwapped(reel, symbol, pos)) changeTexture(reel, symbol);

            updatePos(reel, symbol, pos);
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
    symbol.texture = reel.strip.next();
}

function updatePos(reel, symbol, pos) {
    symbol.y = reel.offset + (pos * symbol.stepSize);

    symbol.pos = pos;
}

