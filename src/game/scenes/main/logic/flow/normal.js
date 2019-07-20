import {spin} from '../anim/spin';
import {show} from '../anim/show';

import {process} from './index';

function isJackPot({symbols}) {
    return [
        ['00', '1', '02'],
        ['00', '2', '02'],
        ['00', '3', '02'],
    ]
        .map((rule) => rule.join())
        .includes(symbols.join());
}

export async function NormalGame({result, reels, effects, func, background}) {
    const {jackpot, boardEffect} = background;

    result.symbols = process(result.symbols);

    const {hasLink, symbols, scores} = result;

    await spin({reels, symbols, func});

    if (hasLink) {
        await show(effects, result);

        if (isJackPot(result)) {
            await boardEffect.jackpot.show();

            await jackpot.play(scores);

            result.isJackpot = true;
        }
    }

    return scores;
}


