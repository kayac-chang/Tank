import anime from 'animejs';
import {wait, nextFrame} from '@kayac/utils';

import {
    getSpinDuration,
} from '../../data';

export async function spin({reels, symbols, func}) {
    if (!reels.length) reels = [reels];

    await start(reels);

    await duration();

    await stop(reels);
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
                duration: 250,
            })
            .add({
                pos: '+=' + 220,
                duration: 15000,
            });

        await wait(120);
    }
}

async function duration() {
    app.emit('SpinDuration');

    let duration = getSpinDuration();
    app.on('QuickStop', () => duration = 0);

    while (duration > 0) {
        const t0 = performance.now();

        await nextFrame();

        const t1 = performance.now();

        duration -= (t1 - t0);
    }
}

async function stop(reels) {
    app.emit('SpinStop');

    for (const reel of reels) {
        anime.remove(reel);

        const diff =
            reel.symbols
                .reduce((a, b) => a.pos < b.pos ? a : b)
                .pos;

        reel.pos -= diff;

        await anime({
            targets: reel,
            pos: '+=' + 2,
            easing: 'easeOutBack',
            duration: 360,

            begin() {
                app.emit('ReelStop', reel);
            },
        })
            .finished;
    }

    app.emit('SpinEnd');
}
