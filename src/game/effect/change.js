import anime from 'animejs';
import {currencyFormat, hex2string, rgb2hex, string2RGBA} from '@kayac/utils';

const config = {
    duration: 3000,
    easing: 'easeInOutQuart',
};

export function currencyChange({range, targets, ...options}) {
    if (!targets.length) targets = [targets];

    const proxy = {
        number: 0,
    };

    const param = {
        targets: proxy,
        number: range,

        ...(config),
        ...(options),

        update,
    };

    return anime(param);

    function update() {
        if (!targets.length) {
            return assign(targets);
        }

        targets.forEach(assign);
    }

    function assign(target) {
        target.text = currencyFormat(proxy.number);
    }
}


export function changeColor({targets, color, ...options}) {
    //
    if (!targets.length) targets = [targets];

    const proxy = {
        background: hex2string(targets[0].tint),
    };

    return anime({
        targets: proxy,

        background: color,

        easing: 'easeInOutQuad',

        update() {
            const {r, g, b} = string2RGBA(proxy.background);

            targets.forEach((it) => it.tint = rgb2hex([r, g, b]));
        },

        ...(options),
    });
}


