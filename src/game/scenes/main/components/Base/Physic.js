import {nextFrame} from '@kayac/utils';

export const targets = [];

// Axis Aligned Bounding Box
function byAABB(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

export function Physic() {
    loop();
}

async function loop() {
    await nextFrame();

    update();

    loop();
}

function update() {
    if (targets.length < 2) return;

    compare(predicate, targets)
        .forEach(([a, b]) => {
            a.emit('Collision', b);
            b.emit('Collision', a);
        });

    function predicate(a, b) {
        return byAABB(...[a, b].map(toBounds));
    }
}

function toBounds(it) {
    return it.getBounds();
}

function compare(predicate, targets) {
    const result = [];

    for (let i = 0; i < targets.length; i++) {
        //
        for (let j = i + 1; j < targets.length; j++) {
            //
            const pair = [targets[i], targets[j]];

            if (predicate(...pair)) result.push(pair);
        }
    }

    return result;
}

