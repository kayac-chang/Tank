import {addPackage} from 'pixi_fairygui';

import {Slot, PayLines, Title, Collect, FreeGame, Grid} from './components';

import {symbolConfig} from './data';

import {logic} from './logic';
import {fadeIn, fadeOut} from '../../effect';
import {wait} from '@kayac/utils';

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

    const multiple = Multiple(scene.getChildByName('multiple'));

    logic({slot, showFreeGame, closeFreeGame});

    app.emit('Idle', {symbols: slot.current});

    app.on('ShowResult', showResult);
    app.on('SpinStart', closeMask);

    window.showFreeGame = showFreeGame;
    window.closeFreeGame = closeFreeGame;

    return scene;

    async function showResult({scores}) {
        openMask();
    }

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

    async function showMultiple(anim) {
        fadeIn({targets: mask, alpha: 0.5}).finished;

        await multiple.show(anim);

        collect.show(anim);

        await fadeOut({targets: mask}).finished;
    }
}

function Multiple(it) {
    return {show};

    async function show(anim) {
        it.visible = true;
        it.transition[anim].restart();

        await wait(1500);

        it.visible = false;
    }
}


