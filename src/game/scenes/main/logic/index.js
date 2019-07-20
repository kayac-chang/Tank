import {log, table, divide, isProduction} from '../../../../general';

import {NormalGame, ReSpinGame} from './flow';

const BET_TO_BIGWIN = 10;

function isBigWin(scores) {
    return divide(scores, app.user.currentBet) > BET_TO_BIGWIN;
}

export function logic({slot, effects, background}) {
    app.on('GameResult', onGameResult);

    const {
        bigwin, boardEffect, normalBoard,
    } = background;

    if (!isProduction()) {
        global.test = function() {
            app.service
                .sendOneTest({bet: 1})
                .then((result) => app.emit('GameResult', result));
        };
    }

    async function onGameResult(result) {
        log('onGameResult =============');
        table(result);

        const {
            normalGame,

            hasReSpin,
            reSpinGame,

            jackPot,
        } = result;

        if (normalGame.hasLink) {
            log('onNormalGame =============');
            table(normalGame);
        }

        const scores =
            await NormalGame({
                result: normalGame,
                reels: slot.reels,
                effects,
                background,
            });

        app.user.lastWin = scores;

        if (!result.isJackpot && isBigWin(scores)) await playBigWin(scores);

        app.user.cash += scores;

        if (hasReSpin) {
            log('onReSpinGame =============');
            table({
                round: reSpinGame.length,
                totalScores:
                    reSpinGame.reduce((sum, {scores}) => sum + scores, 0),
            });
            reSpinGame.forEach(table);

            const scores =
                await ReSpinGame({
                    results: reSpinGame,
                    reels: slot.reels[1],
                    effects,
                    background,
                });

            if (isBigWin(scores)) await playBigWin(scores);

            app.user.cash += scores;
        }

        app.user.jackPot = jackPot;

        log('Round Complete...');
        app.emit('Idle');
    }

    async function playBigWin(scores) {
        await boardEffect.bigwin.show();

        await bigwin.play(scores);

        if (normalBoard.alpha !== 1) await normalBoard.show();
    }
}

