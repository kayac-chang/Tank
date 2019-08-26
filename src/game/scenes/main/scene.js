import {addPackage} from 'pixi_fairygui';

import {Slot} from './components';
import {spin} from './logic/anim';

import {symbolConfig} from './data';


export function create({normalTable, freeTable}) {
    const create = addPackage(app, 'main');
    const scene = create('MainScene');

    global.slot = Slot({
        view: scene,
        reelStrips: normalTable,
        textures: symbolConfig,
    });

    const title = scene.getChildByName('title');

    title.transition['hide'].pause();

    app.on('GameResult', (result) => {
        console.log(result);
    });

    return scene;
}

