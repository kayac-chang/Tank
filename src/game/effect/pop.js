import anime from 'animejs';

const config = {
    x: [0.2, 1],
    y: [0.2, 1],
    duration: 1000,
};

export function popIn({targets, ...options}) {
    targets =
        (!targets.length) ?
            targets.scale : targets.map(({scale}) => scale);

    const param = {
        targets,

        ...(config),
        ...(options),
    };

    return anime(param);
}

export function scale({targets, ...options}) {
    targets =
        (!targets.length) ?
            targets.scale : targets.map(({scale}) => scale);

    const param = {
        targets,

        ...(config),
        ...(options),
    };

    return anime(param);
}
