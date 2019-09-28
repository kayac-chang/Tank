import anime from 'animejs';

const config = {
    duration: 1000,
};

export function fadeIn({targets, ...options}) {
    const param = {
        targets,

        easing: 'easeOutQuart',
        alpha: 1,

        ...(config),
        ...(options),
    };

    return anime(param);
}

export function fadeOut({targets, ...options}) {
    const param = {
        targets,

        easing: 'easeInQuart',
        alpha: 0,

        ...(config),
        ...(options),
    };

    return anime(param);
}
