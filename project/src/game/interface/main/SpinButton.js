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

    let originCash = app.user.cash;

    let scores = 0;

    app.on('QuickStop', () => app.user.auto = 0);

    app.on('ChangeColor', (color) => {
        const frame = it.getChildByName('frame');
        const play = it.getChildByName('play');
        const stop = it.getChildByName('stop');

        changeColor({targets: [frame, play, stop], color});
    });

    app.on('Idle', onIdle);

    app.on('GameResult', ({totalWin}) => scores = totalWin);

    app.on('UserAutoChange', () => {
        originCash = app.user.cash;

        auto.count = app.user.autoOptions[app.user.auto];
    });

    return it;

    function onIdle() {
        state = State(it);

        state.next();

        if (check(scores)) auto.count = 0;

        if (auto.count > 0) {
            play();
        } else {
            app.user.auto = 0;
        }
    }

    async function play() {
        app.sound.play('spin');

        if (auto.count > 0) auto.count -= 1;

        await state.next();
    }

    function check(scores) {
        const condition = app.user.autoStopCondition;

        return [
            insufficientBalance,
            onAnyWin,
            onSingleWinOfAtLeast,
            ifCashIncreasesBy,
            ifCashDecreasesBy,
        ].some(isTrue);

        function isTrue(func) {
            return func() === true;
        }

        function onAnyWin() {
            if (condition['on_any_win']) return scores > 0;
        }

        function onSingleWinOfAtLeast() {
            const threshold = condition['on_single_win_of_at_least'];

            if (threshold) return scores > threshold;
        }

        function ifCashIncreasesBy() {
            const threshold = condition['if_cash_increases_by'];

            if (threshold) return (app.user.cash - originCash) >= threshold;
        }

        function ifCashDecreasesBy() {
            const threshold = condition['if_cash_decreases_by'];

            if (threshold) return (originCash - app.user.cash) >= threshold;
        }
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

    return defineProperties(it, {

        count: {
            get() {
                return count;
            },
            set(newCount) {
                count = newCount > 0 ? newCount : 0;

                update();
            },
        },

    });

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
