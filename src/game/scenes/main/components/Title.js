import {waitByFrameTime} from '@kayac/utils';
import {pauseAll} from './index';

export function Title(it) {
    pauseAll(it);

    return {hide, show};

    async function hide() {
        const anim = it.transition['hide'];

        anim.restart();

        await waitByFrameTime(800);

        app.sound.play('Show_Count_Bar');

        await waitByFrameTime(950);

        it.alpha = 0;
    }

    async function show() {
        it.alpha = 1;

        const anim = it.transition['show'];

        anim.restart();

        await waitByFrameTime(1000);
    }
}
