import {randomInt} from '../../../../../general';
import anime from 'animejs';
import {shake} from '../../../../effect';
import {NormalGame} from './normal';

export async function ReSpinGame({results, reels, effects, background}) {
    const events = setEvents({background, reels});

    await onReSpinStart(background);

    let total = 0;

    for (const result of results) {
        total +=
            await NormalGame({
                result,
                reels,
                effects,
                func: reSpinStopAnimation(result),
                background,
            });

        app.user.lastWin = total;
    }

    await onReSpinEnd(background, total);

    events.off();

    return total;
}

function setEvents({background, reels}) {
    const {
        greenAlien,
        redAlien,

        startAttraction,
        stopAttraction,
    } = background;

    app.on('SpinStart', onSpinStart);
    app.on('ShowResult', onShowResult);
    app.on('Attraction', onAttraction);
    app.on('SpinEnd', stopAttraction);

    return {off};

    function off() {
        app.off('SpinStart', onSpinStart);
        app.off('ShowResult', onShowResult);
        app.off('Attraction', onAttraction);
        app.off('SpinEnd', stopAttraction);
    }

    function onSpinStart() {
        greenAlien.happy();
        redAlien.happy();

        startAttraction();
    }

    function onShowResult() {
        greenAlien.happy();
        redAlien.happy();
    }

    function onAttraction() {
        greenAlien.shy();
        redAlien.shy();

        startAttraction(24);

        shake({
            targets: reels.symbols,
            duration: 2000,
            amplitude: 12,
        });
    }
}

async function onReSpinStart(background) {
    app.emit('RespinStart');
    const {
        boardEffect,
        reSpinBoard,

        greenAlien,
        redAlien,

        showAlien,
    } = background;

    await boardEffect.respin.show();

    await Promise.all([
        reSpinBoard.show(),
        showAlien(),
    ]);

    await Promise.all([
        greenAlien.showMagnet(),
        redAlien.showMagnet(),
    ]);
}

async function onReSpinEnd(background, total) {
    const {
        normalBoard,
        reSpinBoard,

        greenAlien,
        redAlien,

        hideAlien,
    } = background;

    const func = (total > 0) ? 'happy' : 'sad';

    greenAlien[func]();
    redAlien[func]();

    await Promise.all([
        greenAlien.hideMagnet(),
        redAlien.hideMagnet(),
    ]);

    await Promise.all([
        hideAlien(),
        reSpinBoard.hide(),
    ]);

    normalBoard.show();
}

function reSpinStopAnimation({hasLink}) {
    const number = randomInt(100);

    const flag = hasLink ? 35 : 20;

    if (number >= flag) return;

    const sign = randomInt(1);
    const firstPos = sign ? 1 : 3;
    const lastPos = sign ? '+=' : '-=';

    return (reel) => anime
        .timeline({targets: reel})
        .add({
            pos: '+=' + firstPos,
            easing: 'easeOutBack',
            duration: 750,

            begin() {
                app.emit('ReelStop', reel);
            },
        })
        .add({
            pos: lastPos + 1,
            easing: 'easeInOutElastic(3, .5)',
            duration: 2000,
            delay: 750,

            begin() {
                app.emit('Attraction', reel);
            },
        })
        .finished;
}
