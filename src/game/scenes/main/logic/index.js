import {log, table, wait, divide} from '@kayac/utils';

import {NormalGame} from './flow';

const BET_TO_BIGWIN = 10;

function isBigWin(scores) {
    return divide(scores, app.user.currentBet) > BET_TO_BIGWIN;
}

export function logic({slot, showFreeGame, closeFreeGame, showRandomWild, showBigWin}) {
    app.on('GameResult', onGameResult);

    async function onGameResult(result) {
        log('onGameResult =============');
        table(result);

        const {
            normalGame,
            freeGame,
        } = result;

        if (normalGame.hasLink) {
            log('onNormalGame =============');
            table(normalGame);
        }

        const scores =
            await NormalGame({
                result: normalGame,
                reels: slot.reels,
                showRandomWild,
            });

        if (isBigWin(scores)) {
            await showBigWin(scores);
        }

        if (freeGame) {
            await showFreeGame();

            let hasMatch = [];

            let totalScores = 0;

            for (const result of freeGame) {
                const scores = await NormalGame({
                    result: result,
                    reels: slot.reels,
                });

                totalScores += scores;

                const {symbols} = result;

                const match = matchWild(symbols);

                if (match) {
                    const newMatch = [];

                    for (const {row, col} of match) {
                        const saved =
                            hasMatch.some((contain) =>
                                contain.row === row && contain.col === col);

                        if (!saved) newMatch.push({row, col});
                    }

                    if (newMatch.length > 0) {
                        const count = hasMatch.length + newMatch.length;

                        app.emit('Stick', {hasMatch, newMatch});

                        await wait(750);

                        app.emit('Energy', {hasMatch, newMatch});

                        const multiple = matchMultiple(count);

                        if (multiple) {
                            app.emit('Multiple', multiple);
                            await wait(1000);
                        }

                        await wait(1000);

                        app.emit('Count', {hasMatch, newMatch});

                        hasMatch = [...hasMatch, ...newMatch];
                    }
                }
            }

            if (isBigWin(totalScores)) {
                await showBigWin(totalScores);

                await wait(1000);
            }

            await closeFreeGame();
        }

        log('Round Complete...');

        app.emit('Idle', {symbols: slot.current});
    }
}

function matchMultiple(count) {
    return (
        (count === 8) ? 'x2' :
            (count === 10) ? 'x3' :
                (count === 12) ? 'x5' :
                    (count === 14) ? 'x8' :
                        undefined
    );
}

function matchWild(symbols) {
    const wild = 0;

    let list = undefined;

    symbols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col === wild) {
                if (!list) list = [];

                list.push({row: rowIndex, col: colIndex});
            }
        });
    });

    return list;
}

