import {log, table} from '@kayac/utils';

import {NormalGame} from './flow';

// const BET_TO_BIGWIN = 10;
//
// function isBigWin(scores) {
//     return divide(scores, app.user.currentBet) > BET_TO_BIGWIN;
// }

export function logic({slot, freeGame}) {
    app.on('GameResult', onGameResult);

    async function onGameResult(result) {
        log('onGameResult =============');
        table(result);

        const {
            normalGame,
        } = result;

        if (normalGame.hasLink) {
            log('onNormalGame =============');
            table(normalGame);
        }

        const scores =
            await NormalGame({
                result: normalGame,
                reels: slot.reels,
            });

        log('Round Complete...');

        app.emit('Idle', {symbols: slot.current});
    }
}

