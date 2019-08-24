import {Button} from '../../components';

export function NumberPad(it) {
    const buttons =
        it.children
            .filter(({name}) => name.includes('button'))
            .map(Button);

    buttons
        .forEach((btn) => btn.on('pointerdown', click));

    return it;

    function click() {
        const key = this.name.split('@')[1];

        it.emit('click', key);
    }
}
