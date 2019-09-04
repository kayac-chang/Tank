import {wait} from '@kayac/utils';

export async function show({result, reels, grid, payLine}) {
    app.emit('ShowResult', result);

    const {results} = result;

    const lines = [];

    const effects = [];

    const hideSymbols = [];

    const normal = results.filter(({line}) => line !== -1);

    if (normal.length > 0) {
        normal.forEach(showOne);

        await wait(2000);

        close();
    }

    const scatters = results.filter(({line}) => line === -1);

    if (scatters.length > 0) {
        scatters.forEach(showOne);

        await wait(2000);

        close();
    }

    app.once('Idle', onIdle);

    app.once('SpinStart', close);

    function* getResultGen() {
        while (true) {
            for (const result of results) {
                yield result;
            }
        }
    }

    async function onIdle() {
        const results = getResultGen();

        let looping = undefined;

        (
            function loop() {
                close();

                showOne(results.next().value);

                looping = setTimeout(() => requestAnimationFrame(loop), 1750);
            }
        )();

        app.once('SpinStart', () => clearTimeout(looping));
    }

    function showOne(result) {
        const {line, positions, symbols} = result;

        positions.forEach((col, row) => {
            //
            if (col === undefined) return;

            const effect =
                grid[row][col]['effect']
                    .getChildByName(String(symbols[row]));

            effect.alpha = 1;

            effect.transition['anim'].restart();

            effects.push(effect);

            const symbol = reels[row].displaySymbols[col];

            symbol.visible = false;

            hideSymbols.push(symbol);
            //
        });

        if (line !== -1) lines.push(payLine.show(result));
    }

    function close() {
        app.off('Idle', onIdle);

        lines.forEach((close) => close());

        hideSymbols.forEach((symbol) => symbol.visible = true);

        effects.forEach((effect) => {
            effect.alpha = 0;

            effect.transition['anim'].pause();
        });
    }
}
