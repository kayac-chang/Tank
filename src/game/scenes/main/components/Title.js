import {wait} from '@kayac/utils';
import {pauseAll} from './index';

export function Title(it) {
    pauseAll(it);

    return {hide};

    async function hide() {
        const anim = it.transition['hide'];

        anim.restart();

        await wait(1750);

        it.visible = false;
    }
}
