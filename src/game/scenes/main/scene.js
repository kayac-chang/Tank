import {addPackage} from 'pixi_fairygui';

import {Slot, PayLines, Title, Collect, FreeGame, Grid} from './components';

import {symbolConfig} from './data';

import {logic} from './logic';
import {fadeIn, fadeOut} from '../../effect';
import {wait} from "@kayac/utils";


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

    const grid = Grid(scene.getChildByName('grid'));

    const multiple = Multiple(scene.getChildByName('multiple'));

    logic({slot, freeGame});

    window.showFreeGame = showFreeGame;
    window.showMultiple = showMultiple;

    return scene;

    async function showFreeGame() {
        await fadeIn({targets: mask, alpha: 0.5}).finished;

        await freeGame.show();

        await title.hide();

        await collect.show();

        await grid.show('energy', [0, 1]);

        await Promise.all([
            collect.show('light'),
            collect.next().show(),
        ]);

        await fadeOut({targets: mask}).finished;
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


