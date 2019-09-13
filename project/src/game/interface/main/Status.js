import {currencyFormat, isFunction, isString, string2RGBA, rgb2hex, hex2string} from '@kayac/utils';
import {observe} from '../observe';
import {move} from '../../effect';
import anime from 'animejs';


export function Status(it) {
    const cash = Cash(select('field@cash'));
    const win = Win(select('field@win'));
    const bet = Bet(select('field@bet'));

    const labels = Label();

    app.on('ChangeColor', (to) => {
        const targets = [cash, win, bet, ...labels];

        const fill = targets[0].content.style.fill;

        const from = isString(fill) ? fill : fill[0];

        const proxy = {background: from};

        anime({
            targets: proxy,

            background: to,

            easing: 'easeInOutQuad',

            update() {
                const {r, g, b} = string2RGBA(proxy.background);

                targets.forEach((it) => {
                    it.content.style.fill = hex2string(rgb2hex([r, g, b]));
                });
            },
        });
    });

    return it;

    function Label() {
        return (
            [
                ['label@cash', 'common:status.cash'],
                ['label@win', 'common:status.win'],
                ['label@bet', 'common:status.bet'],
            ]
                .map(([name, value]) => {
                    const it = select(name);

                    it.text = app.translate(value);

                    return it;
                })
        );
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


