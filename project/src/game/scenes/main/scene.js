import {addPackage} from 'pixi_fairygui';

import {
    Slot, PayLines, Title, Collect,
    FreeGame, Grid, BigWin, Multiple,
} from './components';

import {symbolConfig} from './data';

import {logic} from './logic';
import {changeColor, fadeIn, fadeOut, twink} from '../../effect';
import {waitByFrameTime} from '@kayac/utils';

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

    const background =
        scene.children.filter(({name}) => name.includes('bottom'));

    const frames =
        scene.children.filter(({name}) => name.includes('frame'));

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
    app.on('Idle', onSpinEnd);

    app.on('MaybeBonus', showMaybeBonus);

    app.once('Idle', firstIdle);

    app.on('ShowResult', ({results}) => {
        const {symbols} =
            results
                .slice()
                .sort((a, b) => b.scores - a.scores)[0];

        const icon = findCommon(symbols);

        change(icon);
    });

    function findCommon(array) {
        const match = {};

        let max = 1;
        let result = array[0];

        array.forEach((item) => {
            if (!match[item]) match[item] = 1;

            match[item] += 1;

            if (match[item] > max) {
                max = match[item];
                result = item;
            }
        });

        return result;
    }

    return scene;

    function change(icon) {
        const id = {
            '0': 6,
            '2': 8,
            '3': 3,
            '4': 0,
            '5': 2,
            '6': 4,
            '7': 7,
            '8': 5,
            '9': 1,
        }[icon];

        if (!id) return;

        changeBackground();

        changeFrame();

        function changeFrame() {
            const to = [
                '#176bff',
                '#3717ff',
                '#5a00ff',
                '#d800ff',
                '#ff0066',
                '#ff7800',
                '#f9ff01',
                '#17ff37',
                '#17fff7',
            ][id];

            const targets = [
                ...frames, ...halo.children,
                payLine, collect, freeGame,
            ];

            changeColor({targets, color: to});

            app.emit('ChangeColor', to);
        }

        function changeBackground() {
            const target = background[id];
            const others = background.filter((it, index) => index !== id);

            Promise.all([
                fadeIn({targets: target}).finished,
                fadeOut({targets: others}).finished,
            ]);
        }
    }

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

            await twink({targets: featurePage, duration: 500, interval: 250});

            app.control.alpha = 1;
            app.control.main.transition['close_option'].restart();

            await title.show();

            wild.alpha = 1;
            wild.transition['anim'].restart();

            await waitByFrameTime(1500);

            const bgm = app.sound.play('Normal_BGM');

            bgm.fade(0, 1, 1000);

            wild.alpha = 0;

            scene.removeChild(featurePage);
        }
    }

    function onSpinStart() {
        fadeIn({targets: halo});

        app.once('ShowResult', onSpinEnd);
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
        wild.alpha = 1;

        app.sound.play('Show_Logo');

        wild.transition['anim'].restart();

        await waitByFrameTime(2250);

        wild.alpha = 0;

        randomWild.forEach((row, rowIndex) => {
            if (!row) return;

            const wild = 0;

            row.forEach(async (colIndex) => {
                const symbol =
                    slot.reels[rowIndex].displaySymbols[colIndex];

                const {trans} = grid[rowIndex][colIndex];

                trans.alpha = 1;

                trans.transition['anim'].restart();
                app.sound.play('Replace');

                await waitByFrameTime(1000);

                symbol.icon = wild;

                await waitByFrameTime(1000);

                trans.alpha = 0;
            });
        });

        await waitByFrameTime(2000);
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

        await waitByFrameTime(750);

        fadeOut({targets, duration});
    }
}
