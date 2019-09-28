import {wait} from '@kayac/utils';
import {pauseAll} from './index';

const {assign, defineProperties} = Object;

export function FreeGame(it) {
    const frames =
        it.children
            .filter(({name}) => name.includes('outer'))
            .flatMap(({children}) => children);

    pauseAll(it);

    close();

    let tint = '#176BFF';

    defineProperties(it, {
        tint: {
            get() {
                return tint;
            },
            set(value) {
                tint = value;

                frames.forEach((it) => it.tint = value);
            },
        },
    });

    return assign(it, {show, close});

    async function show() {
        it.alpha = 1;

        const anim = it.transition['open'];

        anim.restart();

        app.sound.play('Show_Free_Game');

        await wait(3000);
    }

    async function close() {
        const anim = it.transition['close'];

        anim.restart();

        await wait(750);

        it.alpha = 0;
    }
}
