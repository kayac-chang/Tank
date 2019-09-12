import {wait} from '@kayac/utils';

const {assign} = Object;

export function Multiple(it) {
    //
    return assign(it, {show});

    async function show(anim) {
        it.alpha = 1;

        it.transition[anim].restart();

        await wait(1500);

        it.alpha = 0;
    }
}
