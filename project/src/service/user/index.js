const {seal} = Object;

export function User() {
    let id = undefined;
    let account = '';

    let cash = 0;
    let totalWin = 0;
    let lastWin = 0;

    let betOptions = [1.0, 10.0, 20.0, 50.0, 100.0];
    let betOptionsHotKey = [0, 1, 2, 3, 4];
    let bet = 0;

    const speedOptions = [1, 2, 3];
    let speed = 0;

    const autoOptions = [0, 25, 100, 500, 1000];
    let auto = 0;

    let hasExchanged = false;
    let isBetLock = false;

    let payTable = [];
    let jackPot = {};

    const autoStopCondition = {
        'on_any_win': false,
        'on_single_win_of_at_least': 0,
        'if_cash_increases_by': 0,
        'if_cash_decreases_by': 0,
    };

    return seal({
        get id() {
            return id;
        },
        set id(value) {
            id = value;
        },
        get account() {
            return account;
        },
        set account(value) {
            account = value;
        },
        get hasExchanged() {
            return hasExchanged;
        },
        set hasExchanged(flag) {
            hasExchanged = flag;
        },

        //  Balance...
        get cash() {
            return cash;
        },
        set cash(value) {
            if (value === cash) return;

            cash = value;

            app.emit('UserCashChange', cash);
        },

        get totalWin() {
            return totalWin;
        },
        set totalWin(value) {
            totalWin = value;
        },

        get lastWin() {
            return lastWin;
        },
        set lastWin(value) {
            lastWin = value;

            app.emit('UserLastWinChange', lastWin);
        },

        //  Setting...
        get betOptions() {
            return betOptions;
        },
        set betOptions(options) {
            betOptions = options;
        },

        get betOptionsHotKey() {
            return betOptionsHotKey;
        },
        set betOptionsHotKey(selection) {
            betOptionsHotKey = selection;
        },

        get bet() {
            return bet;
        },
        set bet(index) {
            if (index === bet) return;

            bet = index;
            app.emit('UserBetChange', bet);
        },

        get currentBet() {
            return betOptions[bet];
        },

        get isBetLock() {
            return isBetLock;
        },
        set isBetLock(flag) {
            isBetLock = flag;
        },

        get speedOptions() {
            return speedOptions;
        },
        get speed() {
            return speed;
        },
        set speed(index) {
            speed = index;

            app.emit('UserSpeedChange', speed);
        },

        get autoOptions() {
            return autoOptions;
        },
        get auto() {
            return auto;
        },
        set auto(index) {
            auto = index;
            app.emit('UserAutoChange', auto);
        },

        get autoStopCondition() {
            return autoStopCondition;
        },

        get payTable() {
            return payTable;
        },
        set payTable(newTable) {
            payTable = newTable;
        },

        get jackPot() {
            return jackPot;
        },
        set jackPot(newTable) {
            jackPot = newTable;
            app.emit('JackPotChange', jackPot);
        },
    });
}
