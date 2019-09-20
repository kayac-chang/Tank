import anime from 'animejs';
import {waitByFrameTime, nextFrame} from '@kayac/utils';

import {State} from '../../components';

import {
    getSpinDuration,
    getSpinStopInterval,
} from '../../data';

export async function spin({reels, symbols}) {
    if (!reels.length) reels = [reels];

    let skip = false;

    app.once('QuickStop', immediate);

    await start(reels);

    await duration();

    await stop(reels, symbols);

    app.off('QuickStop', immediate);

    function immediate() {
        return skip = true;
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

            await waitByFrameTime(120);
        }
    }

    async function duration() {
        app.emit('SpinDuration');

        let duration = getSpinDuration();

        while (duration > 0) {
            if (skip) return;

            const t0 = performance.now();

            await nextFrame();

            const t1 = performance.now();

            duration -= (t1 - t0);
        }
    }

    async function stop(reels, symbols) {
        app.emit('SpinStop');

        let scatterCount = 0;

        for (const reel of reels) {
            if (isMaybeBonus(reel)) await maybeBonus(reel.index);

            reel.anim.pause();

            const [offSet, ...display] =
                reel.symbols
                    .sort(byPos);

            const _symbols = symbols[reel.index];

            setDisplay(display, _symbols);

            if (
                [0, 2].includes(reel.index) && matchScatter(_symbols)
            ) scatterCount += 1;

            reel.pos -= offSet.pos;

            let duration = getSpinStopInterval();

            if (skip && !isMaybeBonus(reel)) duration = 0;

            reel.anim =
                anime({
                    targets: reel,
                    pos: '+=' + symbols.length,
                    easing: 'easeOutBack',
                    duration,
                });

            await reel.anim.finished;

            app.sound.play('Stop');

            app.emit('ReelStop', reel);

            reel.state = State.Stop;

            reel.anim = undefined;
        }

        app.emit('SpinEnd');

        function isMaybeBonus(reel) {
            return reel.index === 4 && scatterCount >= 2;
        }

        async function maybeBonus(reelIndex) {
            app.emit('MaybeBonus', reelIndex);

            await waitByFrameTime(1000);
        }
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
