import {wait} from '@kayac/utils';
import {pauseAll} from './index';

export function FreeGame(it) {
    pauseAll(it);

    close();

    return {show, close};

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
