import {fadeIn, fadeOut} from './fade';
import {divide} from '../../../../general';

export async function twink({targets, duration = 0, interval = 500}) {
    if (!targets.length) targets = [targets];

    const begin = new Date();

    const tasks = targets.map((target) => call(target));

    return Promise.all(tasks);

    async function call(target, pos) {
        await fadeIn({targets, duration: divide(interval, 2)}).finished;
        await fadeOut({targets, duration: divide(interval, 2)}).finished;

        return isTimeout() || call(target, pos);
    }

    function isTimeout() {
        const now = new Date();
        return (now - begin) > duration;
    }
}
