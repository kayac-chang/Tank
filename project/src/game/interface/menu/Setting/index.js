import {Page} from '../Page';
import {Button} from '../../components';
import anime from 'animejs';
import {pressHold} from '@kayac/utils';

export function Setting(it) {
    it = Page(it);

    Volume({
        label: child('label@volume'),
        output: child('level@volume'),
        prev: child('prev@volume'),
        next: child('next@volume'),
    });

    Speed({
        label: child('label@speed'),
        output: child('level@speed'),
        prev: child('prev@speed'),
        next: child('next@speed'),
    });

    Bet({
        label: child('label@bet'),
        output: child('level@bet'),
        prev: child('prev@bet'),
        next: child('next@bet'),
    });

    Auto({
        label: child('label@auto'),
        output: child('level@auto'),
        prev: child('prev@auto'),
        next: child('next@auto'),
    });

    Cond({
        key: 'on_single_win_of_at_least',

        label: child('label@cond1'),
        output: child('level@cond1'),
        prev: child('prev@cond1'),
        next: child('next@cond1'),
    });

    Cond({
        key: 'if_cash_increases_by',

        label: child('label@cond2'),
        output: child('level@cond2'),
        prev: child('prev@cond2'),
        next: child('next@cond2'),
    });

    Cond({
        key: 'if_cash_decreases_by',

        label: child('label@cond3'),
        output: child('level@cond3'),
        prev: child('prev@cond3'),
        next: child('next@cond3'),
    });

    Toggle({
        label: child('label@effects'),
        output: child('ball@effects'),
        btn: child('frame@effects'),

        value: app.sound.effects,

        onChange(value) {
            app.sound.effects = value;
        },
    });

    Toggle({
        label: child('label@ambience'),
        output: child('ball@ambience'),
        btn: child('frame@ambience'),

        value: app.sound.ambience,

        onChange(value) {
            app.sound.ambience = value;
        },
    });

    Toggle({
        label: child('label@cond0'),
        output: child('ball@cond0'),
        btn: child('frame@cond0'),

        value: app.user.autoStopCondition['on_any_win'],

        onChange(value) {
            app.user.autoStopCondition['on_any_win'] = value;
        },
    });

    Label();

    return it;

    function Label() {
        it.select('title').text = app.translate(`common:setting.title`);
        it.select('label@audio').text = app.translate(`common:setting.audio`);
        it.select('label@volume').text = app.translate(`common:setting.volume`);
        it.select('label@effects').text = app.translate(`common:setting.effects`);
        it.select('label@ambience').text = app.translate(`common:setting.ambience`);

        it.select('label@spin').text = app.translate(`common:setting.spin`);
        it.select('label@speed').text = app.translate(`common:setting.speed`);
        it.select('label@bet').text = app.translate(`common:setting.bet`);
        it.select('label@auto').text = app.translate(`common:setting.auto`);

        it.select('label@stop').text = app.translate(`common:setting.stop`);
        it.select('label@cond0').text = app.translate(`common:setting.cond0`);
        it.select('label@cond1').text = app.translate(`common:setting.cond1`);
        it.select('label@cond2').text = app.translate(`common:setting.cond2`);
        it.select('label@cond3').text = app.translate(`common:setting.cond3`);
    }

    function child(name) {
        return it.select(name);
    }
}

function Volume({label, output, prev, next}) {
    //
    const it = Control({
        prev, next,

        value: app.sound.volume() * 10,

        onChange(value) {
            app.sound.volume(value / 10);

            return update(value);
        },
    });

    app.on('SoundChange', change);

    return it;

    function change(value) {
        value *= 10;

        it.value = value;

        return update(value);
    }

    function update(value) {
        output.text = value;

        next.enable = (value < 10);
        prev.enable = (value > 0);

        return !(next.enable && prev.enable);
    }
}

function Speed({label, output, prev, next}) {
    const options = app.user.speedOptions;

    const it = Control({
        prev, next,

        value: app.user.speed,

        onChange(value) {
            app.user.speed = value;

            return update(value);
        },
    });

    app.on('UserSpeedChange', change);

    return it;

    function change(value) {
        it.value = value;

        update(value);
    }

    function update(value) {
        output.text = options[value];

        next.enable = (value < options.length - 1);
        prev.enable = (value > 0);

        return !(next.enable && prev.enable);
    }
}

function Bet({label, output, prev, next}) {
    const options = app.user.betOptions;

    const it = Control({
        prev, next,

        value: app.user.bet,

        onChange(value) {
            app.user.bet = value;

            return update(value);
        },
    });

    app.on('UserBetChange', change);

    return it;

    function change(value) {
        it.value = value;

        update(value);
    }

    function update(value) {
        output.text = options[value];

        prev.enable = (value > 0);
        next.enable = (value < options.length - 1);

        return !(next.enable && prev.enable);
    }
}

function Auto({label, output, prev, next}) {
    const options = app.user.autoOptions;

    const it = Control({
        prev, next,

        value: app.user.auto,

        onChange(value) {
            app.user.auto = value;

            return update(value);
        },
    });

    app.on('UserAutoChange', change);

    return it;

    function change(value) {
        it.value = value;

        update(value);
    }

    function update(value) {
        output.text = options[value];

        prev.enable = (value > 0);
        next.enable = (value < options.length - 1);

        return !(next.enable && prev.enable);
    }
}

function Cond({label, output, prev, next, key}) {
    const condition = app.user.autoStopCondition;

    return Control({
        prev, next,

        value: condition[key],

        onChange,
    });

    function onChange(value) {
        output.text = value;

        condition[key] = value;

        prev.enable = (value > 0);

        return !prev.enable;
    }
}

function Control({prev, next, value, onChange}) {
    prev = Button(prev);
    prev.on('pointerdown', pressHold(onPrev, prev));


    next = Button(next);
    next.on('pointerdown', pressHold(onNext, next));

    onChange(value);

    return {
        get value() {
            return value;
        },
        set value(newValue) {
            value = newValue;
        },
    };

    function onPrev() {
        value -= 1;

        return onChange(value);
    }

    function onNext() {
        value += 1;

        return onChange(value);
    }
}

function Toggle({label, output, btn, value, onChange}) {
    //
    btn = Button(btn);
    btn.on('click', trigger);

    const distance = output.width;

    let skip = false;

    if (!value) {
        output.x -= distance;

        output.alpha -= 0.7;
    }

    async function update() {
        skip = true;

        onChange(value);

        const vector = value ? '+=' : '-=';

        await anime({
            targets: output,
            x: vector + distance,

            alpha: vector + 0.7,

            easing: 'easeOutCirc',

            duration: 260,
        }).finished;

        skip = false;
    }

    async function trigger() {
        if (skip) return;

        value = !value;

        await update();
    }
}
