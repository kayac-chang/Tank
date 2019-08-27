import anime from 'animejs';
import {wait, nextFrame} from '@kayac/utils';

import {State} from '../../components';

import {
    getSpinDuration,
} from '../../data';

export async function spin({reels, symbols, func}) {
    if (!reels.length) reels = [reels];

    await start(reels);

    await duration();

    await stop(reels, symbols);
}

async function start(reels) {
    app.emit('SpinStart');

    for (const reel of reels) {
        reel.state = State.Spin;

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

async function stop(reels, symbols) {
    app.emit('SpinStop');

    for (const reel of reels) {
        reel.state = State.Stop;

        anime.remove(reel);

        const [offSet, ...display] =
            reel.symbols
                .concat()
                .sort(byPos);

        setDisplay(display, symbols[reel.index]);

        reel.pos -= offSet.pos;

        await anime({
            targets: reel,
            pos: '+=' + symbols.length,
            easing: 'easeOutBack',
            duration: 360,

            begin() {
                app.emit('ReelStop', reel);
            },
        })
            .finished;

        reel.state = State.Idle;
    }

    app.emit('SpinEnd');

    function byPos(a, b) {
        return a.pos - b.pos;
    }

    function setDisplay(display, result) {
        result.forEach((icon, index) => display[index].icon = icon);
    }
}
