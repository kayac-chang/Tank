import {log, table, divide, waitByFrameTime} from '@kayac/utils';

import {FreeGame, NormalGame} from './flow';

const BET_TO_BIGWIN = 10;

function isBigWin(scores) {
    return divide(scores, app.user.currentBet) > BET_TO_BIGWIN;
}

export function logic(args) {
    const {
        slot,
        grid, payLine, levels, multiple, counter,
        showFreeGame, closeFreeGame, showRandomWild, showBigWin,
    } = args;

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

                grid,
                payLine,
                showRandomWild,
            });

        if (isBigWin(scores)) await showBigWin(scores);

        clear(scores);

        if (scores > 0) await waitByFrameTime(60);

        if (freeGame) {
            await showFreeGame();

            counter.show();

            let totalScores = 0;
            let currentLevel = 0;

            for (const result of freeGame) {
                counter.value -= 1;

                const {scores, level} = await FreeGame({
                    result: result,
                    reels: slot.reels,

                    grid,
                    payLine,
                });

                totalScores += scores;

                const diff = level - currentLevel;
                if (diff > 0) {
                    //
                    for (let i = diff; i > 0; i -= 1) {
                        await levels[currentLevel].show();

                        currentLevel += 1;
                    }

                    const match = {
                        '8': 'x2',
                        '10': 'x3',
                        '12': 'x5',
                        '14': 'x8',
                    }[currentLevel];

                    if (match) multiple.show(match);
                }
            }

            if (isBigWin(totalScores)) {
                await waitByFrameTime(600);

                await showBigWin(totalScores);
            }

            clear(totalScores);

            counter.hide();

            await closeFreeGame();
        }

        log('Round Complete...');

        app.emit('Idle');
    }

    function clear(scores) {
        app.user.lastWin = scores;
        app.user.cash += scores;
    }
}
