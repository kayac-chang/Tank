import {waitByFrameTime} from '@kayac/utils';

export async function show({result, reels, grid, payLine}) {
    app.emit('ShowResult', result);

    const {results} = result;

    const lines = [];

    const effects = [];

    const hideSymbols = [];

    const normal = results.filter(({line}) => line !== -1);

    if (normal.length > 0) {
        normal.forEach(showOne);

        app.sound.play('Symbol_Connect');

        await waitByFrameTime(2000);

        close();
    }

    const scatters = results.filter(({line}) => line === -1);

    if (scatters.length > 0) {
        scatters.forEach(showOne);

        app.sound.play('Scatter_Connect');

        await waitByFrameTime(2000);

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

        let skip = false;

        (
            async function loop() {
                close();

                showOne(results.next().value);

                await waitByFrameTime(1750);

                if (!skip) loop();
            }
        )();

        app.once('SpinStart', () => skip = true);
    }

    function showOne(result) {
        const {line, positions, symbols} = result;

        positions.forEach((col, row) => {
            //
            if (col === undefined) return;

            const id = symbols[row];

            const effect =
                grid[row][col]['effect']
                    .getChildByName(String(id));

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
            effect.transition['anim'].pause();

            effect.alpha = 0;
        });
    }
}
