import anime from 'animejs';
import {wait} from '@kayac/utils';

export async function spin({reels, symbols, func}) {
    if (!reels.length) reels = [reels];

    await start(reels);
}

async function start(reels) {
    app.emit('SpinStart');

    for (const reel of reels) {
        anime
            .timeline({
                targets: reel,
                easing: 'easeOutQuad',
            })
            .add({
                pos: '-=' + 0.25,
                duration: 500,
            })
            .add({
                pos: '+=' + 150,
                duration: 15000,
            });

        await wait(250);
    }
}


