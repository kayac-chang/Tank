import {Page} from '../Page';
import {Button} from '../../components';

import {currencyFormat} from '@kayac/utils';

import {observe} from '../../observe';

import {FormButton} from './FormButton';
import {DropDown} from './DropDown';
import {NumberPad} from './NumberPad';

const {trunc} = Math;

export function Exchange(it) {
    const key = process.env.KEY;

    it = Page(it);

    const _open = it.open;

    const amount = Amount(it.getChildByName('output@amount'));

    const cash = it.getChildByName('output@cash');

    const pad = NumberPad(it.getChildByName('number_pad'));

    const currencies = [...app.service.currencies.values()];

    const dropdown = DropDown({
        label: it.getChildByName('output@currency'),
        btn: it.getChildByName('frame@currency'),
        list: it.getChildByName('list@currency'),
        items: currencies.map(({name}) => name),
    });

    let currency = currencies[0];

    const cancelBtn = Button(it.getChildByName('button@cancel'));
    const refreshBtn = Button(it.getChildByName('button@refresh'));

    const confirmBtn = FormButton({
        btn: it.getChildByName('button@confirm'),
        label: it.getChildByName('label@confirm'),
    });

    const balances =
        it.children
            .filter(({name}) => name.includes('balance'));

    init();

    return it;

    function init() {
        it.on('click', () => dropdown.close());

        amount.on('change', onAmountChange);

        pad.on('click', onNumberPadClick);

        cancelBtn.on('click', clear);
        refreshBtn.on('click', refresh);

        confirmBtn.on('click', confirm);

        dropdown.on('select', onSelect);

        it.open = open;

        clear();
    }

    function onSelect(index) {
        currency = currencies[index];

        clear();
    }

    async function open() {
        if (app.user.hasExchanged) {
            // const {value} =
            //     await app.alert
            //         .request({title: ('common:message.checkout')});
            //
            // if (!value) return;

            const data =
                await app.service.checkout({key});

            // app.alert.checkoutList(data);

            app.user.hasExchanged = false;
        }

        await refresh();

        await _open();
    }

    async function confirm() {
        // app.alert.loading({title: ('common:message.wait')});

        await app.service.exchange({
            key,
            currency: currency.type,
            amount: amount.value,
        });

        clear();

        // app.alert.close();

        const {cash} = app.user;
        // app.alert.success({
        //     title: ('common:message.receive'),
        // });

        app.user.hasExchanged = true;

        it.emit('close');
    }

    async function refresh() {
        await app.service.refresh({key});

        const {accountBalance} = app.service;

        balances.forEach((it) => {
            const currency = it.name.split('@')[1];
            it.text = currencyFormat(accountBalance[currency]);
        });

        clear();
    }

    function clear() {
        amount.clear();
    }

    function onNumberPadClick(value) {
        (value === 'delete') ?
            amount.pop() : amount.push(value);
    }

    function onAmountChange(value) {
        cash.text = currencyFormat(currency.rate * value);

        confirmBtn.enable = (value > 0);
    }
}

function Amount(it) {
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
