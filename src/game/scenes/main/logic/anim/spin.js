import anime from 'animejs';
import {wait, nextFrame} from '@kayac/utils';

import {State} from '../../components';

import {
    getSpinDuration,
} from '../../data';

export async function spin({reels, symbols}) {
    if (!reels.length) reels = [reels];

    await start(reels);

    await duration();

    await stop(reels, symbols);
}

async function start(reels) {
    app.emit('SpinStart');

    for (const reel of reels) {
        reel.state = State.Spin;

        reel.anim =
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
                    pos: '+=' + 230,
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

    let isMaybeBonus = false;

    for (const reel of reels) {
        if (isMaybeBonus) await maybeBonus(reel.index);

        reel.anim.pause();

        const [offSet, ...display] =
            reel.symbols
                .sort(byPos);

        const _symbols = symbols[reel.index];

        setDisplay(display, _symbols);

        isMaybeBonus = isMaybeBonus || matchScatter(_symbols);

        reel.pos -= offSet.pos;

        reel.anim =
            anime({
                targets: reel,
                pos: '+=' + symbols.length,
                easing: 'easeOutBack',
                duration: 360,

                complete() {
                    app.emit('ReelStop', reel);
                },
            });

        await reel.anim.finished;

        reel.state = State.Stop;
        reel.anim = undefined;
    }

    app.emit('SpinEnd');

    async function maybeBonus(reelIndex) {
        app.emit('MaybeBonus', reelIndex);

        await wait(500);
    }
}

function byPos(a, b) {
    return a.pos - b.pos;
}

function setDisplay(display, result) {
    result.forEach((icon, index) => display[index].icon = icon);
}

function matchScatter(symbols) {
    const scatter = 1;

    return symbols.includes(scatter);
}
