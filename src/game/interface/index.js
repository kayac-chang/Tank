export * from './data';

import {addPackage} from 'pixi_fairygui';
import {twink, move, fadeIn, fadeOut} from '../effect';

export function create() {
    const create = addPackage(app, 'assets');
    const it = create('UserInterface');

    it.main = Main(it);

    it.menu = Menu(it.getChildByName('menu'));

    return it;
}

function Button(view) {
    view.interactive = true;
    view.buttonMode = true;

    return view;
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

function Menu(it) {
    const background = Background(it.getChildByName('background'));

    background.alpha = 0;

    const exchange = Exchange(it.getChildByName('exchange'));

    const pages = [exchange];

    pages.forEach((page) => {
        page.visible = false;
        page.alpha = 0;
    });

    let currentPage = undefined;

    const nav = NavBar(it);

    function Background(it) {
        const fade = {
            targets: it,
            duration: 320,
            easing: 'easeOutQuad',
        };

        async function open() {
            if (it.interactive) return;

            it.interactive = true;

            await twink({targets: it, duration: 120, interval: 50, alpha: 0.5});

            await fadeIn(fade).finished;
        }

        async function close() {
            await fadeOut(fade).finished;

            it.interactive = false;
        }

        return Object.assign(it, {open, close});
    }

    function Exchange(it) {
        const fade = {
            targets: it,
            duration: 320,
            easing: 'easeOutQuad',
        };

        async function open() {
            if (it.visible) return;

            it.visible = true;

            await fadeIn(fade).finished;

            currentPage = it;
        }

        async function close() {
            await fadeOut(fade).finished;

            it.visible = false;

            currentPage = undefined;
        }

        return Object.assign(it, {open, close});
    }

    async function open(page) {
        it.visible = true;

        await nav.open();

        if (!page) return;

        await background.open();

        await it[page].open();
    }

    async function close() {
        await Promise.all([
            currentPage.close(),
            background.close(),
        ]);

        await nav.close();

        it.visible = false;
    }

    return Object.assign(it, {
        open, close, exchange,
    });
}

function NavBar(menu) {
    const it = menu.getChildByName('nav');

    const background = Background(it.getChildByName('background'));

    const buttons =
        it.children
            .filter(({name}) => ['back', 'exchange', 'setting', 'information', 'home'].includes(name))
            .map(NavButton);

    buttons.forEach((btn) => {
        btn.alpha = 0;
        btn.interactive = false;
    });

    const [
        backButton,
        exchangeButton,
        settingButton,
        infoButton,
        homeButton,
    ] = buttons;

    backButton.on('click', () => menu.close());

    exchangeButton.on('click', () => menu.open('exchange'));

    async function open() {
        await background.open();

        await Promise.all(
            buttons.map((btn) => btn.open())
        );
    }

    async function close() {
        await Promise.all(
            buttons.map((btn) => btn.close())
        );

        await background.close();
    }

    function Background(it) {
        const config = {
            targets: it,
            duration: 500,
            easing: 'easeInOutExpo',
        };

        async function moveTo(options) {
            await move({
                ...(config),
                ...(options),
            }).finished;
        }

        const width = it.width;

        async function open() {
            if (it.interactive) return;

            it.interactive = true;
            await moveTo({x: `-= ${width}`});
        }

        async function close() {
            if (!it.interactive) return;

            await moveTo({x: `+= ${width}`});
            it.interactive = false;
        }

        return Object.assign(it, {open, close});
    }

    return Object.assign(it, {open, close});
}

function NavButton(view) {
    const it = Button(view);

    const config = {
        targets: it,
        duration: 320,
        easing: 'easeOutQuad',
    };

    const alpha = it.alpha;

    async function open() {
        await fadeIn({
            ...(config),

            alpha,
        }).finished;

        it.interactive = true;
    }

    async function close() {
        await fadeOut(config);

        it.interactive = false;
    }

    return Object.assign(it, {open, close});
}


