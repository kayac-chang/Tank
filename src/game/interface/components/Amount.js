import {observe} from '../observe';
import {currencyFormat} from '@kayac/utils';

const {trunc} = Math;

export function Amount(it) {
    it = observe({
        key: 'value', value: 0, onChange,
    }, it);

    return Object.assign(it, {push, pop, clear});

    function onChange(value) {
        it.text = currencyFormat(value);

        it.emit('change', value);
    }

    function clear() {
        it.value = 0;
    }

    function pop() {
        it.value = trunc(it.value / 10);
    }

    function push(value) {
        it.value = (it.value * 10) + Number(value);
    }
}
