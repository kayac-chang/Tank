
import {MenuButton} from './MenuButton';
import {SpinButton} from './SpinButton';
import {Status} from './Status';

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

    return it;
}
