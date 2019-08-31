import {addPackage} from 'pixi_fairygui';

import {Slot, PayLines, Title, Collect, FreeGame, Grid, BigWin} from './components';

import {symbolConfig} from './data';

import {logic} from './logic';
import {fadeIn, fadeOut} from '../../effect';
import {wait} from '@kayac/utils';
import {extras} from 'pixi.js';

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

    logic({
        slot,
        showFreeGame,
        closeFreeGame,
        showRandomWild,
        showBigWin,
    });

    app.emit('Idle', {symbols: slot.current});

    app.on('ShowResult', openMask);
    app.on('SpinStart', closeMask);

    return scene;

    async function openMask() {
        await fadeIn({targets: mask, alpha: 0.5}).finished;
    }

    async function closeMask() {
        await fadeOut({targets: mask}).finished;
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
}


function Multiple(it) {
    app.on('Multiple', show);

    async function show(anim) {
        it.visible = true;

        it.transition[anim].restart();

        await wait(1500);

        it.visible = false;
    }
}


