import {randomInt, nextFrame} from '@kayac/utils';

const {assign} = Object;

export function shake({targets, duration = 0, amplitude = 0}) {
    if (!targets.length) targets = [targets];

    const range = [-1 * amplitude, amplitude];

    const begin = new Date();

    const tasks = targets.map((target) => call(target));

    return Promise.all(tasks);

    async function call(target, pos) {
        pos = pos || {x: target.x, y: target.y};

        assign(target, {
            x: pos.x + randomInt(...range),
            y: pos.y + randomInt(...range),
        });

        await nextFrame();

        return isTimeout() ?
            assign(target, pos) : call(target, pos);
    }

    function isTimeout() {
        const now = new Date();
        return (now - begin) > duration;
    }
}
