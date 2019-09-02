import {wait} from '@kayac/utils';

export function Multiple(it) {
    app.on('Multiple', show);

    async function show(anim) {
        it.visible = true;

        it.transition[anim].restart();

        await wait(1500);

        it.visible = false;
    }
}
