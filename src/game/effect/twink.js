import {fadeIn, fadeOut} from './fade';
import {divide} from '@kayac/utils';

export async function twink({targets, duration = 0, interval = 500, alpha = 1}) {
    if (!targets.length) targets = [targets];

    const begin = performance.now();

    const config = {
        targets,
        duration: divide(interval, 2),
    };

    const tasks = targets.map((target) => call(target));

    return Promise.all(tasks);

    async function call(target, pos) {
        await fadeIn({...config, alpha}).finished;

        await fadeOut(config).finished;

        return isTimeout() || call(target, pos);
    }

    function isTimeout() {
        const now = performance.now();
        return (now - begin) > duration;
    }
}
