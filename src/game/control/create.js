import {addPackage} from 'pixi_fairygui';

import {waitByFrameTime, timer} from '@kayac/utils';

function Button(it) {
    it.interactive = true;
    it.buttonMode = true;

    return it;
}

function pressHold(func, it) {
    //
    return function call() {
        let holding = true;

        it.once('pointerup', clear);
        it.once('pointerupoutside', clear);

        func();
        (
            async function execute(getDuration) {
                await waitByFrameTime(100);

                if (!holding) return;

                func();

                return execute(getDuration);
            }
        )(timer());

        function clear() {
            holding = false;

            it.off('pointerup', clear);
            it.off('pointerupoutside', clear);
        }
    };
}

export function create() {
    const it = addPackage(app, 'interface')('main');

    const direction = it.getChildByName('direction');

    const dirButtons =
        ['up', 'down', 'left', 'right']
            .map((name) => direction.getChildByName(name));

    const actionButtons =
        ['A', 'B', 'X', 'Y']
            .map((name) => it.getChildByName(name));


    [...dirButtons, ...actionButtons]
        .map((btn) => {
            btn = Button(btn);

            btn.on('pointerdown', pressHold(onClick, btn));

            function onClick() {
                app.emit('Control', btn.name);
            }
        });

    app.stage.addChild(it);
}
