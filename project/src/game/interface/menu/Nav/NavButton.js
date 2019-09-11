import {fadeIn, fadeOut} from '../../../effect';

import {Button} from '../../components';

export function NavButton(it) {
    it = Button(it);

    const config = {
        targets: it,
        duration: 320,
        easing: 'easeOutQuad',
    };

    const alpha = it.alpha;

    it.alpha = 0;
    it.interactive = false;

    return Object.assign(it, {open, close});

    async function open() {
        await fadeIn({
            ...(config),

            alpha,
        }).finished;

        it.interactive = true;
    }

    async function close() {
        it.interactive = false;

        await fadeOut(config).finished;
    }
}
