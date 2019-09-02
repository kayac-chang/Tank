import {spin} from '../anim/spin';
import {wait} from '@kayac/utils';

export async function NormalGame({result, reels, showRandomWild}) {
    const {hasLink, symbols, scores, randomWild} = result;

    await spin({reels, symbols});

    if (randomWild) {
        await showRandomWild({reels, positions: randomWild});
    }

    if (hasLink) {
        app.emit('ShowResult', result);

        await wait(2000);
    }

    return scores;
}
