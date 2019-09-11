import {addPackage} from 'pixi_fairygui';

import {
    Slot, PayLines, Title, Collect,
    FreeGame, Grid, BigWin, Multiple,
} from './components';

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

    const payLine = PayLines(scene.getChildByName('line'));

    const freeGame = FreeGame(scene.getChildByName('freegame'));

    const grid = Grid(scene.getChildByName('grid'));

    const multiple = Multiple(scene.getChildByName('multiple'));

    const wild = scene.getChildByName('wild');

    const bigWin = BigWin(scene.getChildByName('bigwin'));

    const halo = scene.getChildByName('halo');

    logic({
        slot,

        grid,
        payLine,
        multiple,
        levels: collect.levels,

        showFreeGame,
        closeFreeGame,
        showRandomWild,
        showBigWin,
    });

    app.on('SpinStart', onSpinStart);
    app.on('SpinEnd', onSpinEnd);

    app.on('MaybeBonus', showMaybeBonus);

    app.once('Idle', firstIdle);

    return scene;

    async function firstIdle() {
        const loadScene =
            app.stage.getChildByName('LoadScene');

        await fadeOut({targets: loadScene, duration: 3000}).finished;

        app.stage.removeChild(loadScene);

        const featurePage = scene.getChildByName('feature');

        featurePage.interactive = true;

        featurePage.once('click', firstClick);

        async function firstClick() {
            featurePage.interactive = false;

            app.sound.play('Show_Count_Bar');

            await fadeOut({targets: featurePage}).finished;

            scene.removeChild(featurePage);

            app.control.visible = true;

            wild.visible = true;
            wild.transition['anim'].restart();

            app.control.main.transition['close_option'].restart();

            const bgm = app.sound.play('Normal_BGM');

            bgm.fade(0, 1, 1000);

            await fadeIn({targets: app.control, alpha: [0, 1]}).finished;

            wild.visible = false;
        }
    }

    function onSpinStart() {
        fadeIn({targets: halo});
    }

    function onSpinEnd() {
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

    async function showRandomWild({randomWild}) {
        wild.visible = true;

        app.sound.play('Show_Logo');

        wild.transition['anim'].restart();

        await wait(2250);

        wild.visible = false;

        randomWild.forEach((row, rowIndex) => {
            if (!row) return;

            const wild = 0;

            row.forEach(async (colIndex) => {
                const symbol =
                    slot.reels[rowIndex].displaySymbols[colIndex];

                const {trans} = grid[rowIndex][colIndex];

                trans.visible = true;

                trans.transition['anim'].restart();
                app.sound.play('Replace');

                await wait(1000);

                symbol.icon = wild;

                await wait(1000);

                trans.visible = false;
            });
        });

        await wait(2000);
    }

    async function showBigWin(score) {
        await bigWin.show(score);
    }

    async function showMaybeBonus(reelIndex) {
        const targets =
            scene.getChildByName(`maybeBonus@${reelIndex}`);

        if (!targets) return;

        targets.anim.gotoAndPlay(0);

        const duration = 250;

        app.sound.play('MaybeBonus');

        await fadeIn({targets, duration}).finished;

        await wait(750);

        fadeOut({targets, duration});
    }
}