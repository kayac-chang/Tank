import anime from 'animejs';

function pre(targets) {
    if (!Array.isArray(targets)) targets = [targets];

    return targets.map(({scale}) => scale);
}

export function scaleUp({targets, ...options}) {
    targets = pre(targets);

    const config = {
        x: [0.2, 1],
        y: [0.2, 1],
        duration: 1000,
    };

    return anime({targets, ...config, ...options});
}

export function scaleDown({targets, ...options}) {
    targets = pre(targets);

    const config = {
        x: [1, 0],
        y: [1, 0],
        duration: 1000,
    };

    return anime({targets, ...config, ...options});
}
