import {wait} from '../../../../general';
import {currencyChange, fadeIn, fadeOut, popIn} from '../effect';

import {extras} from 'pixi.js';

const {BitmapText} = extras;

const style = {font: '36px BigWin'};

function ScoreField() {
    return new BitmapText('0', style);
}

export function BigWin(view) {
    const field = ScoreField();

    field.anchor.set(.5);

    const {x, y} = view.getChildByName('pos@score');
    field.position.set(x, y);

    return {play};

    async function play(score) {
        view.removeChild(field);

        const {alpha} = app.control.main;

        fadeOut({targets: app.control.main});

        view.transition['anim'].restart();

        await wait(100);
        view.visible = true;

        await wait(1800);

        app.sound.mute(true, 'Normal_BGM');
        app.sound.play('Big_Win');

        mount();

        await show(score);

        await Promise.all([
            fadeIn({targets: app.control.main, alpha}).finished,
            clear(),
        ]);

        app.sound.mute(false, 'Normal_BGM');
    }

    function mount() {
        view.addChild(field);
        fadeIn({targets: field, duration: 800});
        popIn({targets: field, duration: 800});
    }

    async function show(score) {
        await currencyChange({targets: field, range: score})
            .finished;

        await wait(500);
    }

    async function clear() {
        await fadeOut({targets: view, easing: 'easeInQuart'})
            .finished;

        view.visible = false;
        view.alpha = 1;
    }
}
