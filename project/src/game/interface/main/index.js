import {SpinButton} from './SpinButton';
import {Status} from './Status';
import {Option} from './Option';
import {Button} from '../components';
import {twink} from '../../effect';

const {assign} = Object;

export function Main(it) {
    const menuButton = Button(it.getChildByName('menu'));

    menuButton.on('pointerdown', onPointerDown);

    const optionButton = Button(it.getChildByName('option'));

    optionButton.on('click', openOption);

    const option = Option(it.getChildByName('optionMenu'), it);

    option.on('OpenExchange', () => it.emit('OpenExchange'));

    SpinButton(it.getChildByName('spin'));

    Status(it.getChildByName('status'));

    return assign(it, {menuButton, whenClickOutsideClose});

    async function onPointerDown() {
        await twink({targets: menuButton, duration: 120, interval: 50, alpha: 0.5});

        it.getChildByName('menu@normal').alpha = 0;
    }

    function whenClickOutsideClose(target) {
        const block = it.getChildByName('block');

        block.interactive = true;

        block.once('click', async () => {
            if (target.isOpen) await target.close();

            block.interactive = false;
        });
    }

    async function openOption() {
        await option.open();

        whenClickOutsideClose(option);
    }
}


