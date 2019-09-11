import anime from 'animejs';

const config = {
    duration: 1000,
    easing: 'easeOutExpo',
};

export function move({targets, ...options}) {
    const param = {
        targets,

        ...(config),
        ...(options),
    };
    return anime(param);
}
