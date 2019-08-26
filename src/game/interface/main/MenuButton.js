import {Button} from '../components';
import {twink} from '../../effect';

export function MenuButton({normal, hover, onClick}) {
    const menuButton = Button(normal);

    menuButton
        .on('pointerdown', onPointerDown)
        .on('pointerup', onPointerUp);

    return menuButton;

    async function onPointerUp() {
        menuButton.interactive = false;

        await twink({targets: hover, duration: 120, interval: 50, alpha: 0.5});

        await onClick();

        menuButton.interactive = true;
    }

    function onPointerDown() {
        hover.alpha = 0.5;
    }
}
