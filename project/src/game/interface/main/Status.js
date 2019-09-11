import {currencyFormat, isFunction, isString} from '@kayac/utils';
import {observe} from '../observe';
import {move} from '../../effect';


export function Status(it) {
    Cash(select('field@cash'));
    Win(select('field@win'));
    Bet(select('field@bet'));

    Label();

    return it;

    function Label() {
        select('label@cash').text = app.translate(`common:status.cash`);
        select('label@win').text = app.translate(`common:status.win`);
        select('label@bet').text = app.translate(`common:status.bet`);
    }

    function select(arg) {
        if (isString(arg)) return it.getChildByName(arg);

        else if (isFunction(arg)) return it.children.filter(arg);
    }
}

function Cash(it) {
    it = observe({
        key: 'value',
        value: app.user.cash,
        onChange,
    }, it);

    app.on('UserCashChange', (cash) => update(it, cash));

    return it;
}

function Win(it) {
    it = observe({
        key: 'value',
        value: app.user.lastWin,
        onChange,
    }, it);

    app.on('UserLastWinChange', (lastWin) => update(it, lastWin));

    return it;
}

function Bet(it) {
    app.on('UserBetChange', update);

    update();

    return it;

    function update() {
        const value = app.user.currentBet;
        it.value = value;
        it.text = currencyFormat(value);
    }
}

function onChange(value) {
    this.text = currencyFormat(value);
}

async function update(it, value) {
    const config = {
        easing: 'linear',
        duration: 720,
    };

    await move({
        targets: it,
        value,

        ...(config),
    }).finished;
}


