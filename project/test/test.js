const maxLength = 246;

const displaySymbol = ['DisplaySymbol', 'DisplaySymbol', 'DisplaySymbol'];
const stopPerSymbol = 2;

const displayCycle = displaySymbol.length * stopPerSymbol;

function update(newPos) {
    const axis = newPos % maxLength;
    console.log(`Axis: ${axis}`);

    const changeIndex = updateDisplayPos(axis);

    const reelPos = updateReelPos(axis);

    updateIcon(changeIndex, reelPos);
}


function updateDisplayPos(axis) {
    let changeSymbolIndex = undefined;

    displaySymbol.forEach(function(symbol, index) {
        const initialPos = index * stopPerSymbol;
        const displayPos = (axis + initialPos) % displayCycle;
        console.log(`DisplayPos ${index}: ${displayPos}`);

        if (Math.abs(displayPos) < 0.01) {
            changeSymbolIndex = index;
        }
    });

    return changeSymbolIndex;
}

function updateReelPos(axis) {
    const reelPos =
        (maxLength - Math.floor(axis)) % maxLength;
    console.log(`ReelPos: ${reelPos}`);

    return reelPos;
}

function updateIcon(changeIndex, reelPos) {
    if (changeIndex !== undefined) {
        console.log(`************** Change Icon ***************`);

        console.log(
            `Change Symbol: ${displaySymbol[changeIndex]} ${changeIndex}`,
        );
        console.log(`Reel Pos: ${reelPos}`);

        console.log(`******************************************`);
    }
}

for (let i = 0; i < maxLength + 1; i += 0.01) {
    update(i);
    console.log(`============`);
}
