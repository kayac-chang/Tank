import {extras} from 'pixi.js';
import {waitByFrameTime} from '@kayac/utils';
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
        it.interactive = true;

        let anim = undefined;

        const bgm = app.sound.stop('Normal_BGM');

        const sound = app.sound.play('BigWin');

        await transIn();

        await transOut();

        it.interactive = false;

        async function transIn() {
            let skip = false;

            it.once('pointerup', immediate);

            init();

            await waitByFrameTime(1250, isSkip);

            if (!skip) showScores(score, 1500);

            await waitByFrameTime(1500, isSkip);

            it.off('pointerup', immediate);

            function init() {
                if (skip) return;

                sound.fade(0, 1, 750);

                it.alpha = 1;

                it.transition['anim'].restart();

                anim = it.transition['anim'];
            }

            function showScores(score, duration) {
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

                anim = anime({
                    targets: proxy,
                    easing: 'linear',
                    round: 1,

                    number: [0, score],

                    duration,
                    //
                });
            }

            function immediate() {
                skip = true;

                it.alpha = 1;

                if (anim) anim.pause();

                it.transition['idle'].restart();

                anim = it.transition['idle'];

                showScores(score, 1);

                it.off('pointerup', immediate);
            }

            function isSkip() {
                return skip === true;
            }
        }

        async function transOut() {
            let skip = false;

            it.once('pointerup', immediate);

            await waitByFrameTime(2000, isSkip);

            close();

            await waitByFrameTime(1500, isSkip);

            reset();

            function close() {
                if (skip) return;

                it.transition['close'].restart();

                anim = it.transition['close'];

                fadeOut({targets: scores});

                sound.fade(1, 0, 1500);

                bgm.play();

                bgm.fade(0, 1, 1500);
            }

            function reset() {
                it.alpha = 0;

                scores.alpha = 0;

                it.off('pointerup', immediate);
            }

            function immediate() {
                skip = true;

                if (anim) anim.pause();

                sound.stop();

                bgm.play();

                bgm.fade(0, 1, 1500);

                reset();
            }

            function isSkip() {
                return skip === true;
            }
        }
    }
}
