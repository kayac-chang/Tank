import {Normal, ReSpin} from './Board';
import {nextFrame, wait} from '../../../../general';
import {Alien} from './Alien';
import {shake} from '../effect';
import {BigWin} from './BigWin';

export function Background(view) {
    const normalBoard =
        Normal(select('board@normal'));

    const reSpinBoard =
        ReSpin(select('board@respin'));

    const boardEffect = BoardEffect();

    const bigwin =
        BigWin(select('bigWin'));

    const jackpot =
        BigWin(select('jackpot'));

    const [greenAlien, redAlien] =
        ['green', 'red']
            .map((name) => Alien(select(`alien@${name}`)));

    const electron = view.getChildByName('effect@electron');

    let shaking = false;
    let charging = false;

    return init();

    function init() {
        boardEffect.visible = false;

        app.once('Idle', () => nextFrame().then(onIdle));

        return {
            bigwin,
            jackpot,

            boardEffect,

            normalBoard,
            reSpinBoard,

            greenAlien,
            redAlien,

            showAlien,
            hideAlien,

            startAttraction,
            stopAttraction,
        };

        async function onIdle() {
            await showAlien();

            await wait(500);

            normalBoard.show();

            await hideAlien();
        }
    }

    function BoardEffect() {
        const background = select('board@effect');

        return {
            bigwin: TextEffect('BigWin'),
            jackpot: TextEffect('JackPot'),
            respin: TextEffect('ReSpin'),

            get visible() {
                return background.visible;
            },
            set visible(flag) {
                background.visible = flag;
            },
        };
    }

    function TextEffect(name) {
        const Show = view.transition['Show' + name];
        const Hide = view.transition['Hide' + name];

        Show.pause();
        Hide.pause();

        return {show};

        async function show() {
            if (normalBoard.alpha !== 0) await normalBoard.hide();

            boardEffect.visible = false;

            Show.restart();
            app.sound.play('Electron');

            await Show.finished;

            hide();
        }

        async function hide() {
            Hide.restart();

            await Hide.finished;
            app.sound.stop('Electron');

            boardEffect.visible = false;
        }
    }

    function showAlien() {
        const ShowAlien = view.transition['ShowAlien'];

        ShowAlien.restart();
        app.sound.play('Alien_Fly');

        return ShowAlien.finished;
    }

    function hideAlien() {
        const HideAlien = view.transition['HideAlien'];

        HideAlien.restart();
        app.sound.play('Alien_Fly');

        return HideAlien.finished;
    }

    function startAttraction(amplitude = 3) {
        if (shaking || charging) stopAttraction();

        startShaking(amplitude);
        startCharging(amplitude);
    }

    function stopAttraction() {
        shaking = false;
        charging = false;
        electron.visible = false;

        app.sound.stop('Electron');
    }

    async function startShaking(amplitude = 3) {
        shaking = true;

        const targets = [greenAlien, redAlien];

        while (shaking) await shake({targets, amplitude});
    }

    async function startCharging(amplitude = 3) {
        electron.visible = true;
        charging = true;

        app.sound.play('Attraction');

        while (charging) {
            app.sound.play('Electron');
            shake({targets: electron, amplitude});
            await wait(4000);
        }
    }

    function select(name) {
        return view.getChildByName(name);
    }
}
