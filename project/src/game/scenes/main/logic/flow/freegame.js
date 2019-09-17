import {show, spin, stick} from '../anim';

import {match} from '../utils';

export async function FreeGame({result, reels, grid, payLine}) {
    const {hasLink, symbols, scores} = result;

    await spin({reels, symbols});

    if (hasLink) {
        await show({result, reels, grid, payLine});
    }

    const match = matchWild(symbols);

    if (match.length > 0) {
        await stick({match, grid});
    }

    return {scores, level: match.length};
}

function matchWild(symbols) {
    const wild = 0;

    return match(wild, symbols);
}
