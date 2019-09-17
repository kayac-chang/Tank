import {Button} from '../components';

import {changeColor, twink} from '../../effect';
import {throttleBy} from '@kayac/utils';

const {defineProperties} = Object;

import Text from 'pixi.js/lib/core/text/Text';

export function SpinButton(it) {
    it = Button(it);

    const auto = Auto(it);

    it.on('pointerup', throttleBy(play));

    let state = undefined;

    app.on('Idle', reset);

    app.on('QuickStop', () => app.user.auto = 0);

    app.on('ChangeColor', (color) => {
        const frame = it.getChildByName('frame');
        const play = it.getChildByName('play');
        const stop = it.getChildByName('stop');

        changeColor({targets: [frame, play, stop], color});
    });

    return it;

    function reset() {
        state = State(it);

        state.next();

        if (!auto.done) {
            auto.count -= 1;

            return play();
            //
        } else {
            app.user.auto = 0;
        }
    }

    async function play() {
        app.sound.play('spin');

        await state.next();
    }
}

function Auto(parent) {
    const {x, y} = parent.getChildByName('center');

    const style = {
        fontFamily: 'monospace',
        fontSize: 48,
        align: 'center',
        fontWeight: 'bold',
        fill: '#FFF',
    };

    const it = new Text('1234', style);

    it.position.set(x, y);

    it.anchor.set(.5, .5);

    parent.addChild(it);

    let count = 0;

    app.on('UserAutoChange', () => {
        it.count = getAuto();
    });

    return defineProperties(it, {

        done: {
            get() {
                return count === 0;
            },
        },

        count: {
            get() {
                return count;
            },
            set(newCount) {
                count = newCount;

                update();
            },
        },

    });

    function getAuto() {
        return app.user.autoOptions[app.user.auto];
    }

    function update() {
        if (count === 0) return it.text = '';

        it.text = count;
    }
}

async function* State(it) {
    const play = it.getChildByName('play');
    const stop = it.getChildByName('stop');

    yield onNormal();

    yield await onSpin();

    yield onStop();

    function onNormal() {
        play.visible = true;
        stop.visible = false;

        it.enable = !insufficientBalance();
    }

    async function onSpin() {
        play.visible = false;
        stop.visible = true;

        await Promise.all([
            send(),
            animation(it),
        ]);
    }

    function onStop() {
        it.enable = false;

        app.emit('QuickStop');
    }
}

async function animation(it) {
    //
    await twink({
        targets: it,
        duration: 300,
        interval: 120,
        alpha: 0.5,
    });

    it.alpha = 1;
}

async function send() {
    app.user.cash -= app.user.currentBet;
    app.user.lastWin = 0;

    const result = await app.service.sendOneRound({
        key: process.env.KEY,
        bet: app.user.bet,
    });

    return app.emit('GameResult', result);
}

function insufficientBalance() {
    return app.user.cash < app.user.currentBet;
}
