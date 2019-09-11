import {Page} from '../Page';
import {Button, Amount} from '../../components';

import {currencyFormat} from '@kayac/utils';

import {FormButton} from './FormButton';
import {DropDown} from './DropDown';
import {NumberPad} from './NumberPad';

const {trunc} = Math;

export function Exchange(it) {
    const key = process.env.KEY;

    it = Page(it);

    const amount = Amount(it.select('output@amount'));

    const cash = it.select('output@cash');

    const pad = NumberPad(it.select('number_pad'));

    const currencies = [...app.service.currencies.values()];

    let currency = currencies[0];

    const dropdown = DropDown({
        label: it.select('output@currency'),
        btn: it.select('frame@currency'),
        list: it.select('list@currency'),
        items: currencies.map(({name}) => app.translate(`common:currency.${name}`)),
    });

    dropdown.update(0);

    const cancelBtn = Button(it.select('button@cancel'));

    const refreshBtn = Button(it.select('button@refresh'));

    const confirmBtn = FormButton({
        btn: it.select('button@confirm'),
        label: it.select('label@confirm'),
    });

    const balances =
        it.select(({name}) => name.includes('balance'));

    const helper = it.select('help@amount');

    const _open = it.open;

    it.open = open;

    init();

    return it;

    function Label() {
        it.select('title').text = app.translate(`common:exchange.title`);
        it.select('label@amount').text = app.translate(`common:exchange.amount`);
        it.select('label@cash').text = app.translate(`common:exchange.cash`);
        it.select('label@currency').text = app.translate(`common:exchange.currency`);
        it.select('label@cancel').text = app.translate(`common:button.cancel`);
        it.select('label@refresh').text = app.translate(`common:button.refresh`);
        it.select('label@confirm').text = app.translate(`common:button.confirm`);
    }

    function init() {
        Label();

        it.on('click', () => dropdown.close());

        amount.on('change', onAmountChange);

        pad.on('click', onNumberPadClick);

        cancelBtn.on('click', clear);
        refreshBtn.on('click', refresh);

        confirmBtn.on('click', confirm);

        dropdown.on('select', onSelect);

        clear();
    }

    async function open() {
        if (app.user.hasExchanged) {
            const {value} =
                await app.alert
                    .request({title: app.translate('common:message.checkout')});

            if (!value) return it.emit('close');

            const data =
                await app.service.checkout({key});

            app.alert.checkoutList(data);

            app.user.hasExchanged = false;
        }

        await refresh();

        await _open();
    }

    async function confirm() {
        app.alert.loading({title: app.translate('common:message.wait')});

        await app.service.exchange({
            key,
            currency: currency.type,
            amount: amount.value,
        });

        clear();

        app.alert.close();

        const {cash} = app.user;
        app.alert.success({
            title: app.translate('common:message.receive', {cash}),
        });

        app.user.hasExchanged = true;

        app.emit('Idle');

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

        helper.text = '';
    }

    function currentBalance() {
        return app.service.accountBalance[currency.name];
    }

    function onNumberPadClick(value) {
        if (value === 'delete') {
            return amount.pop();
        }

        amount.push(value);

        const balance = currentBalance();

        if (amount.value >= balance) {
            return amount.value = balance;
        }
    }

    function onAmountChange(value) {
        value = trunc(currency.rate * value);

        cash.text = currencyFormat(value);

        confirmBtn.enable = check(value);
    }

    function check(value) {
        const needCheck = (currency.rate === 0.5);

        const isOdd = (value % 2 !== 0);

        if (needCheck && isOdd) {
            helper.text = app.translate('common:helper.amountIsOdd');

            return false;
        }

        helper.text = '';

        return (value !== 0);
    }

    function onSelect(index) {
        currency = currencies[index];

        clear();
    }
}
