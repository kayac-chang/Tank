import EventEmitter from 'eventemitter3';
import {Button} from '../../components';
import {fadeIn, scaleUp} from '../../../effect';

export function DropDown({label, btn, list, items}) {
    const it = new EventEmitter();

    btn = Button(btn);

    list = List(list);

    btn.on('pointerup', onTrigger);

    return Object.assign(it, {close, update});

    function List(it) {
        it.children
            .forEach((it) => {
                const {name} = it;

                if (name.includes('item')) Item(it);

                else if (name.includes('btn')) {
                    it = Button(it);

                    it.on('pointerup', onSelect);
                }
            });

        return it;

        function Item(it) {
            const index = it.name.split('@')[1];

            it.text = items[index];
        }
    }

    function update(index) {
        label.text = items[index];
    }

    function onSelect() {
        const index = this.name.split('@')[1];

        update(index);

        it.emit('select', index);

        close();
    }

    function hasOpened() {
        return list.visible;
    }

    function open() {
        list.visible = true;

        btn.alpha = 0.5;
        list.alpha = 0;

        const config = {targets: list, duration: 360};
        scaleUp(config);
        fadeIn(config);
    }

    function close() {
        list.visible = false;

        btn.alpha = 1;
    }

    function onTrigger() {
        return hasOpened() ? close() : open();
    }
}
