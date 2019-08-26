import {currencyFormat} from '@kayac/utils';
import {observe} from '../observe';
import {move} from '../../effect';


export function Status(it) {
    Cash(it.getChildByName('field@cash'));
    Win(it.getChildByName('field@win'));
    Bet(it.getChildByName('field@bet'));

    return it;
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


