import {Page} from './Page';
import {Button} from '../components';

export function Exchange(it) {
    it = Page(it);

    const amount = Amount(it.getChildByName('output@amount'));

    const pad = NumberPad(it.getChildByName('number_pad'));

    pad.on('value', (value) => {
        if (value === 'delete') return amount.pop();
        amount.push(value);
    });

    return it;
}

function Amount(it) {
    it.text = 0;

    return Object.assign(it, {push, pop});

    function pop() {

    }

    function push(value) {
        it.text += value;
    }
}

function NumberPad(it) {
    const buttons =
        it.children
            .filter(({name}) => name.includes('button'))
            .map(Button);

    buttons
        .forEach((btn) => btn.on('pointerdown', click));

    return it;

    function click() {
        const key = this.name.split('@')[1];

        it.emit('value', key);
    }
}
