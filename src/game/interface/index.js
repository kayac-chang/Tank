export * from './data';

import {addPackage} from 'pixi_fairygui';
import {twink} from '../effect';
import {Button} from './components';

import {Menu} from './menu';

export function create() {
    const create = addPackage(app, 'assets');
    const it = create('UserInterface');

    it.main = Main(it);

    it.menu = Menu(it.getChildByName('menu'));

    return it;
}

function Main(it) {
    const view = it.getChildByName('main');

    MenuButton({
        normal: view.getChildByName('menu@normal'),
        hover: view.getChildByName('menu@hover'),

        onClick,
    });

    async function onClick() {
        await it.menu.open();
    }
}

function MenuButton({normal, hover, onClick}) {
    const menuButton = Button(normal);

    menuButton
        .on('pointerdown', onPointerDown)
        .on('pointerup', onPointerUp);

    async function onPointerUp() {
        menuButton.interactive = false;

        await twink({targets: hover, duration: 120, interval: 50, alpha: 0.5});

        await onClick();

        menuButton.interactive = true;
    }

    function onPointerDown() {
        hover.alpha = 0.5;
    }

    return menuButton;
}


