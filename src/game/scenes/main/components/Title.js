import {wait} from '@kayac/utils';
import {pauseAll} from './index';

export function Title(it) {
    pauseAll(it);

    show();

    return {hide, show};

    async function hide() {
        const anim = it.transition['hide'];

        anim.restart();

        await wait(1750);

        it.visible = false;
    }

    async function show() {
        it.visible = true;

        const anim = it.transition['show'];

        anim.restart();

        await wait(1000);
    }
}
