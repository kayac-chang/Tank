export * from './data';

import {addPackage} from 'pixi_fairygui';

import {Main} from './main';
import {Menu} from './menu';

export function create() {
    const create = addPackage(app, 'assets');
    const it = create('UserInterface');

    it.main = Main(it);
    it.menu = Menu(it.getChildByName('menu'));

    return it;
}


