import {addPackage} from 'pixi_fairygui';

export function create() {
    const create = addPackage(app, 'main');
    const scene = create('MainScene');

    return scene;
}

