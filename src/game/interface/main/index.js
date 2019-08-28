import {MenuButton} from './MenuButton';
import {SpinButton} from './SpinButton';
import {Status} from './Status';
import {Button} from '../components';

export function Main(it) {
    const view = it.getChildByName('main');

    MenuButton({
        normal: view.getChildByName('menu@normal'),
        hover: view.getChildByName('menu@hover'),

        async onClick() {
            await it.menu.open();
        },
    });

    SpinButton(view.getChildByName('spin'));

    Status(view.getChildByName('status'));

    const option = Option(view.getChildByName('option'));

    const optionBtn = Button(view.getChildByName('btn@option'));

    optionBtn.on('click', async () => {
        view.transition['open_option'].play();
    });

    option.on('close', async () => {
        view.transition['close_option'].play();
    });

    view.transition['open_option'].pause();

    return it;
}

function Option(it) {
    Object.values(it.transition)
        .forEach((anim) => anim.pause());

    const backBtn = Button(it.getChildByName('icon@back'));

    backBtn.on('click', () => it.emit('close'));

    return it;
}
