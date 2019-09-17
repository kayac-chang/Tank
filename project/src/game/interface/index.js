export * from './data';

import {addPackage} from 'pixi_fairygui';

import {Main} from './main';
import {Menu} from './menu';

const {assign} = Object;

export function create() {
    const create = addPackage(app, 'assets');
    const it = create('UserInterface');

    const main = Main(it.getChildByName('main'));
    const menu = Menu(it.getChildByName('menu'));

    main.menuButton.on('pointerup', () => openMenu());

    main.on('OpenExchange', () => openMenu('exchange'));

    menu.on('Closed', onMenuClose);

    app.control = it;

    it.alpha = 0;

    return assign(it, {main, menu});

    async function openMenu(page) {
        main.menuButton.interactive = false;

        await menu.open(page);

        main.whenClickOutsideClose(menu);
    }

    function onMenuClose() {
        main.menuButton.interactive = true;

        main.getChildByName('menu@normal').alpha = 1;
    }
}


