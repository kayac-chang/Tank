import {log, table, divide} from '@kayac/utils';

import {FreeGame, NormalGame} from './flow';

const BET_TO_BIGWIN = 10;

function isBigWin(scores) {
    return divide(scores, app.user.currentBet) > BET_TO_BIGWIN;
}

export function logic(args) {
    const {
        slot,
        grid, payLine, levels, multiple,
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

        if (isBigWin(scores)) {
            await showBigWin(scores);
        }

        if (freeGame) {
            await showFreeGame();

            let totalScores = 0;
            let currentLevel = 0;

            for (const result of freeGame) {
                const {scores, level} = await FreeGame({
                    result: result,
                    reels: slot.reels,

                    grid,
                    payLine,
                });

                totalScores += scores;

                if (level) {
                    //
                    while (currentLevel < level) {
                        await levels[currentLevel].show();

                        currentLevel++;
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
                await showBigWin(totalScores);
            }

            await closeFreeGame();
        }

        log('Round Complete...');

        app.emit('Idle', {symbols: slot.current});
    }
}
