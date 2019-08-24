import {Page} from './Page';
import {Button} from '../components';

import {currencyFormat} from '@kayac/utils';

import {fadeIn, popIn} from '../../effect';
import {observe} from './observe';

import EventEmitter from 'eventemitter3';

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

function FormButton({btn, label}) {
    let it = new EventEmitter();

    it = observe({
        key: 'enable', value: true, onChange,
    }, it);

    btn = Button(btn);

    btn.on('click', onClick);

    return it;

    function onClick() {
        if (!it.enable) return;

        it.emit('click');
    }

    function onChange(enable) {
        const alpha = enable ? 1 : 0.5;

        btn.alpha = alpha;
        label.alpha = alpha;
    }
}

function DropDown({label, btn, list, items}) {
    const it = new EventEmitter();

    btn = Button(btn);

    list = List(list);

    btn.on('click', onTrigger);

    return Object.assign(it, {close});

    function List(it) {
        it.children
            .forEach((it) => {
                const {name} = it;

                if (name.includes('item')) Item(it);

                else if (name.includes('btn')) {
                    it = Button(it);

                    it.on('click', onSelect);
                }
            });

        return it;

        function Item(it) {
            const index = it.name.split('@')[1];
            it.text = items[index];
        }
    }

    function onSelect() {
        const index = this.name.split('@')[1];

        label.text = items[index];

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
        popIn(config);
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

        it.emit('click', key);
    }
}
