import {fadeIn, fadeOut, twink} from '../../effect';

import {NavBar} from './NavBar';
import {Exchange} from './Exchange';

export function Menu(it) {
    const background = Background(it.getChildByName('background'));

    background.alpha = 0;

    const exchange = Exchange(it.getChildByName('exchange'));

    const pages = {
        exchange,
    };

    Object.values(pages)
        .forEach((page) => {
            page.visible = false;
            page.alpha = 0;

            page.on('close', close);
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

    async function open(page) {
        it.visible = true;

        await nav.open();

        if (!page) return;

        await background.open();

        await it[page].open();

        currentPage = it[page];
    }

    async function close() {
        await Promise.all([
            currentPage.close(),
            background.close(),
        ]);

        currentPage = undefined;

        await nav.close();

        it.visible = false;
    }

    return Object.assign(it, {
        open, close,

        ...(pages),
    });
}
