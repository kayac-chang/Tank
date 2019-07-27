import {addPackage} from 'pixi_fairygui';

import {SlotMachine} from './components';
import {spin} from "./logic/anim";

const table = [
    [5, 0, 9, 8, 5, 6, 8, 5, 7, 0, 5, 6, 8, 5, 9, 8, 5, 0, 6, 5, 9, 8, 6, 9, 7, 5, 8, 9, 7, 8, 9, 6, 5, 8, 9, 7, 9, 0, 9, 6, 7, 9, 8],
    [5, 0, 9, 8, 5, 6, 8, 5, 7, 0, 5, 6, 8, 5, 9, 8, 5, 0, 6, 5, 9, 8, 6, 9, 7, 5, 8, 9, 7, 8, 9, 6, 5, 8, 9, 7, 9, 0, 9, 6, 7, 9, 8],
    [5, 0, 9, 8, 5, 6, 8, 5, 7, 0, 5, 6, 8, 5, 9, 8, 5, 0, 6, 5, 9, 8, 6, 9, 7, 5, 8, 9, 7, 8, 9, 6, 5, 8, 9, 7, 9, 0, 9, 6, 7, 9, 8],
    [5, 0, 9, 8, 5, 6, 8, 5, 7, 0, 5, 6, 8, 5, 9, 8, 5, 0, 6, 5, 9, 8, 6, 9, 7, 5, 8, 9, 7, 8, 9, 6, 5, 8, 9, 7, 9, 0, 9, 6, 7, 9, 8],
    [5, 0, 9, 8, 5, 6, 8, 5, 7, 0, 5, 6, 8, 5, 9, 8, 5, 0, 6, 5, 9, 8, 6, 9, 7, 5, 8, 9, 7, 8, 9, 6, 5, 8, 9, 7, 9, 0, 9, 6, 7, 9, 8],
];

export function create() {
    const create = addPackage(app, 'main');
    const scene = create('MainScene');

    global.slot = SlotMachine({view: scene, table});

    global.spin = () => spin({reels: slot.reels});

    return scene;
}

