import {fadeIn, fadeOut} from '../../effect';
import {isFunction, isString} from '@kayac/utils';

export function Page(it) {
    const background = it.getChildByName('background');

    background.on('pointerup', onClick);

    const fade = {
        targets: it,
        duration: 320,
        easing: 'easeOutQuad',
    };

    function onClick() {
        it.emit('click');
    }

    async function open() {
        if (it.visible) return;

        it.visible = true;
        background.interactive = true;

        await fadeIn(fade).finished;
    }

    async function close() {
        await fadeOut(fade).finished;

        it.visible = false;
        background.interactive = false;
    }

    return Object.assign(it, {open, close, select});

    function select(arg) {
        if (isString(arg)) return it.getChildByName(arg);

        else if (isFunction(arg)) return it.children.filter(arg);
    }
}
