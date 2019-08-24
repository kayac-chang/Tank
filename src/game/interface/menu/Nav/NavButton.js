import {fadeIn, fadeOut} from '../../../effect';

import {Button} from '../../components';

export function NavButton(view) {
    const it = Button(view);

    const config = {
        targets: it,
        duration: 320,
        easing: 'easeOutQuad',
    };

    const alpha = it.alpha;

    async function open() {
        await fadeIn({
            ...(config),

            alpha,
        }).finished;

        it.interactive = true;
    }

    async function close() {
        await fadeOut(config);

        it.interactive = false;
    }

    return Object.assign(it, {open, close});
}
