import {wait} from '@kayac/utils';
import {pauseAll} from './index';

export function FreeGame(it) {
    pauseAll(it);

    return {show};

    async function show() {
        it.visible = true;

        const anim = it.transition['anim'];

        anim.restart();

        await wait(3000);
    }
}
