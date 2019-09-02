import {addPackage} from 'pixi_fairygui';

import {
    Slot, PayLines, Title, Collect,
    FreeGame, Grid, BigWin, Multiple, Text,
} from './components';

import {symbolConfig} from './data';

import {logic} from './logic';
import {fadeIn, fadeOut} from '../../effect';
import {wait} from '@kayac/utils';

import anime from 'animejs';

export function create({normalTable, freeTable}) {
    const create = addPackage(app, 'main');
    const scene = create('MainScene');

    const slot = Slot({
        view: scene,
        reelStrips: normalTable,
        textures: symbolConfig,
    });

    const title = Title(scene.getChildByName('title'));

    const collect = Collect(scene.getChildByName('collect'));

    const mask = scene.getChildByName('black_mask');

    PayLines(scene.getChildByName('line'));

    const freeGame = FreeGame(scene.getChildByName('freegame'));

    Grid(scene.getChildByName('grid'));

    Multiple(scene.getChildByName('multiple'));

    const wild = scene.getChildByName('wild');

    const bigWin = BigWin(scene.getChildByName('bigwin'));

    const halo = scene.getChildByName('halo');

    const scores = Text(scene.getChildByName('scores'), {font: '80px number'});


    scene.addChild(scores);

    logic({
        slot,
        showFreeGame,
        closeFreeGame,
        showRandomWild,
        showBigWin,
    });

    app.on('ShowResult', onShowResult);
    app.on('SpinStart', closeMask);
    app.on('Idle', onIdle);

    app.emit('Idle', {symbols: slot.current});

    return scene;

    async function onShowResult({scores}) {
        fadeIn({targets: mask, alpha: 0.5});

        showScores(scores);
    }

    function closeMask() {
        fadeOut({targets: mask});
        fadeIn({targets: halo});
    }

    function onIdle() {
        fadeOut({targets: halo});
    }

    async function showFreeGame() {
        await freeGame.show();

        await title.hide();

        await collect.show();
    }

    async function closeFreeGame() {
        await freeGame.close();

        await collect.hide();

        await title.show();
    }

    async function showRandomWild(positions) {
        wild.visible = true;

        wild.transition['anim'].restart();

        await wait(2250);

        wild.visible = false;

        app.emit('RandomWild', positions);

        await wait(2250);
    }

    async function showBigWin(score) {
        await bigWin.show(score);
    }

    async function showScores(score) {
        let value = 0;

        const proxy = {
            get value() {
                return value;
            },
            set value(newValue) {
                value = newValue;
                scores.text = newValue;
            },
        };

        fadeIn({targets: scores});

        await anime({
            targets: proxy,
            value: score,
            easing: 'linear',
            round: 1,
        }).finished;

        fadeOut({targets: scores});
    }
}
