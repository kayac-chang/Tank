import {spin} from '../anim/spin';
import {wait} from '@kayac/utils';

export async function NormalGame({result, reels}) {
    const {hasLink, symbols, scores} = result;

    await spin({reels, symbols});

    if (hasLink) {
        app.emit('ShowResult', result);

        await wait(2000);
    }

    return scores;
}
