import {extras} from 'pixi.js';
import {wait} from '@kayac/utils';
import anime from 'animejs';
import {fadeOut} from '../../../effect';

export function BigWin(it) {
    const scores = new extras.BitmapText('', {font: 'number'});

    const {x, y} = it.getChildByName('scores');

    scores.position.set(x, y);
    scores.anchor.set(.5);

    it.addChild(scores);

    return {show};

    async function show(score) {
        it.visible = true;

        it.transition['anim'].restart();

        await wait(1250);

        let number = 0;
        const proxy = {

            get number() {
                return number;
            },

            set number(value) {
                number = value;

                scores.text = String(number);
            },
        };

        scores.alpha = 1;

        await anime({
            targets: proxy,
            easing: 'linear',
            round: 1,

            number: [0, score],

            duration: 1500,
            //
        }).finished;

        await wait(2000);

        it.transition['close'].restart();

        fadeOut({targets: scores});

        await wait(1500);
    }
}
