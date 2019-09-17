import EventEmitter from 'eventemitter3';
import {observe} from '../../observe';
import {Button} from '../../components';

export function FormButton({btn, label}) {
    let it = new EventEmitter();

    it = observe({
        key: 'enable', value: true, onChange,
    }, it);

    btn = Button(btn);

    btn.on('pointerup', onClick);

    return it;

    function onClick() {
        if (!it.enable) return;

        it.emit('click');
    }

    function onChange(enable) {
        btn.interactive = enable;

        const alpha = enable ? 1 : 0.5;

        btn.alpha = alpha;
        label.alpha = alpha;
    }
}
