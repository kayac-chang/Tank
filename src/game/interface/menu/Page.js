import {fadeIn, fadeOut} from '../../effect';

export function Page(it) {
    const fade = {
        targets: it,
        duration: 320,
        easing: 'easeOutQuad',
    };

    async function open() {
        if (it.visible) return;

        it.visible = true;

        await fadeIn(fade).finished;
    }

    async function close() {
        await fadeOut(fade).finished;

        it.visible = false;
    }

    return Object.assign(it, {open, close});
}
