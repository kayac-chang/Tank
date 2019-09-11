import anime from 'animejs';
import {currencyFormat} from '@kayac/utils';

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
