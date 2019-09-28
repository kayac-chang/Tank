import {spin, show} from '../anim';

export async function NormalGame({result, reels, grid, payLine, showRandomWild}) {
    const {hasLink, symbols, scores, randomWild} = result;

    await spin({reels, symbols});

    if (randomWild) {
        await showRandomWild(result);
    }

    if (hasLink) {
        await show({result, reels, grid, payLine});
    }

    return scores;
}
