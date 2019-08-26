import {getSearchParam} from '../utils';
import {clone, err} from '@kayac/utils';
import {User} from '../user';

const {assign, entries, fromEntries} = Object;

export function Service(prodKey) {
    const tokens = {
        'accounttoken': construct(),
        'token': '',
    };

    const env = {
        'logintype': ENV.LOGIN_TYPE,
        'gametypeid': ENV.GAME_ID,
    };

    // type 1 - 金幣      gold
    // type 2 - 禮卷      gift
    // type 3 - 娛樂幣    etc
    // type 4 - 紅利      bonus
    const currencies = new Map([
        ['1', {type: '1', name: 'gold', rate: 1}],
        ['3', {type: '3', name: 'etc', rate: 1}],
        ['4', {type: '4', name: 'bonus', rate: 0.5}],
        ['2', {type: '2', name: 'gift', rate: 0.5}],
    ]);
    const accountBalance = {};

    const reelTables = {};

    const time = {
        now: undefined,
        warning: undefined,
        maintain: undefined,
    };

    return {
        login, init, refresh, exchange, checkout, sendOneRound, sendOneTest,

        get currencies() {
            return currencies;
        },

        get accountBalance() {
            return clone(accountBalance);
        },
    };

    function construct() {
        const token =
            getSearchParam('token') || sessionStorage.getItem('accounttoken');

        if (!token) {
            // @TODO Maybe Popup an Alert before redirect to game hall.

            throw new Error(`User Access Tokens is empty`);
        }

        history.pushState(undefined, undefined,
            location.origin + location.pathname,
        );

        global.addEventListener('popstate', () => history.back());

        sessionStorage.setItem('accounttoken', token);

        return token;
    }

    function updateAccount(data) {
        data.forEach(({type, amount}) => {
            if (!currencies.has(type)) return;
            const currency = currencies.get(type).name;

            accountBalance[currency] = amount;
        });

        return accountBalance;
    }

    function request(url, body) {
        return app.network
            .post(url, body)
            .then(({data, error}) => {
                const code = error['ErrorCode'];
                if (code !== 0) {
                    err(new Error(error['Msg']));

                    const msg = {title: `Error: ${code}`};

                    if (code === 18) {
                        msg.type = 'info';
                        msg.text = translate('common:error.maintain');
                    }

                    return app.alert.error(msg);
                }

                return data;
            });
    }

    function authenticate(key) {
        return key !== prodKey;
    }

    function checkTime() {
        time.now.setSeconds(time.now.getSeconds() + 1);

        const msg = {};

        if (time.now - time.maintain > 0) {
            msg.type = 'info';
            msg.text = translate('common:error.maintain');

            clearInterval(time.timer);

            return app.alert.error(msg);
        }

        if (time.now - time.warning > 0) {
            msg.type = 'warning';
            msg.title = translate('common:error.warning');
            msg.showCancelButton = false;

            time.warning.setMinutes(time.now.getMinutes() + 1);

            return app.alert.request(msg);
        }
    }

    function login({key}) {
        if (authenticate(key)) {
            return err(new Error('Permission Denied...'));
        }

        const requestBody = {
            ...tokens,
            ...env,
        };

        return request('account/login', requestBody)
            .then((data) => {
                tokens.token = data['token'];

                app.user = new User();

                app.user.account = data['gameaccount'];

                updateAccount(data['userCoinQuota']);

                data['gameInfo']
                    .forEach(({type, rate}) => {
                        currencies.get(type).rate = rate;
                    });

                const now =
                    data['serversetting']['servertime'] * 1000;
                const maintain =
                    data['serversetting']['maintaintime'] * 1000;

                time.now = new Date(now);
                time.warning = new Date(maintain - (10 * 60 * 1000));
                time.maintain = new Date(maintain);

                time.timer = setInterval(checkTime, 1000);

                return data;
            });
    }

    function init({key}) {
        if (authenticate(key)) {
            return err(new Error('Permission Denied...'));
        }

        const requestBody = {
            ...tokens,
            ...env,
            'gameaccount': app.user.account,
        };

        return request('lobby/init', requestBody)
            .then((data) => {
                app.user.id = Number(data['player']['id']);

                app.user.cash = data['player']['money'];

                app.user.betOptions = data['betrate']['betrate'];
                app.user.betOptionsHotKey = data['betrate']['betratelinkindex'];
                app.user.bet = data['betrate']['betratedefaultindex'];

                app.user.hasExchanged =
                    Boolean(data['thirdparty']['isexchange']);

                assign(reelTables, {
                    normalTable: data['reel']['normalreel'],
                    freeTable: data['reel']['freereel'],
                });

                return {...reelTables};
            });
    }

    function refresh({key}) {
        if (authenticate(key)) {
            return err(new Error('Permission Denied...'));
        }

        const requestBody = {
            ...tokens,
            ...env,
            'gameaccount': app.user.account,
        };

        return request('lobby/refresh', requestBody)
            .then((data) => {
                updateAccount(data['userCoinQuota']);

                return accountBalance;
            });
    }

    function exchange({key, currency, amount}) {
        if (authenticate(key)) {
            return err(new Error('Permission Denied...'));
        }

        const requestBody = {
            ...tokens,
            ...env,
            'playerid': app.user.id,

            'cointype': Number(currency),
            'coinamount': Number(amount),
        };

        return request('lobby/exchange', requestBody)
            .then((data) => {
                app.user.cash = data['gameCoin'];
                app.emit('UserStatusChange', app.user);
            })
            .then(() => refresh({key}))
            .then(() => ({accountBalance, cash: app.user.cash}));
    }

    function checkout({key}) {
        if (authenticate(key)) {
            return err(new Error('Permission Denied...'));
        }

        const requestBody = {
            ...tokens,
            ...env,
            'playerid': app.user.id,
        };

        return request('lobby/checkout', requestBody)
            .then((data) => {
                app.user.cash = 0;
                app.emit('UserStatusChange', app.user);

                const result =
                    entries(data['userCoinQuota'])
                        .filter(([key]) => key.includes('coin'))
                        .map(([key, value]) => {
                            const type = key.match(/\d+/)[0];
                            const {name} = currencies.get(type);

                            return [name, value];
                        });

                return fromEntries(result);
            });
    }

    function sendOneRound({key, bet}) {
        if (authenticate(key)) {
            return err(new Error('Permission Denied...'));
        }

        const requestBody = {
            'type': 'gameResult',
            'playerid': app.user.id,
            ...tokens,
            ...env,
            bet,
        };

        return request('game/gameresult', requestBody)
            .then(handle);
    }

    function sendOneTest({bet}) {
        const requestBody = {
            'type': 'gameResult',
            'playerid': app.user.id,
            ...tokens,
            ...env,
            bet,
        };

        return request('game/testresult', requestBody)
            .then(handle);
    }

    function handle(data) {
        const totalWin = data['totalwinscore'];
        const cash = data['playermoney'];

        const normalGame = Round(data['normalresult']);

        const hasFreeGame = Boolean(data['isfreegame']);

        const freeGame = hasFreeGame && data['freeresult'].map(Round);

        return {
            cash,
            totalWin,

            normalGame,

            hasFreeGame,
            freeGame,
        };
    }

    function Round(data) {
        const symbols = data['plate'];

        const results = data['gameresult'].map(Result);

        const randomWild = RandomWild(data['randwild']);

        const scores = results.reduce((a, b) => a.scores + b.scores, 0);

        return {
            symbols, results, randomWild, scores,
        };

        function RandomWild(data) {
            if (!data || data.length === 0) return;

            const wild = 0;

            return (
                data.map((row, rowIndex) =>
                    row &&
                    row.filter((colIndex) =>
                        symbols[rowIndex][colIndex] !== wild))
            );
        }
    }

    function Result(data) {
        return {
            symbols: data['LineSymbolNum'],
            positions: data['LineSymbolPoint'],
            rate: data['LineWinRate'],
            scores: data['Score'],
        };
    }
}

