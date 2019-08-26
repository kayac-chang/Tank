import {Button} from '../components';

export function SpinButton(it) {
    it = Button(it);

    it.on('click', onClick);

    function onClick() {
        return play();
    }

    async function play() {
        app.user.cash -= app.user.currentBet;
        app.user.lastWin = 0;

        const result = await app.service.sendOneRound({
            key: process.env.KEY,
            bet: app.user.bet,
        });

        return app.emit('GameResult', result);
    }
}
