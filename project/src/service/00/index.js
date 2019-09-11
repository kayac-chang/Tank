import {User} from '../user';

export function Service() {
    const reelTables = {};

    const server = new Worker('../worker/test.worker.js', {type: 'module'});

    return {
        login, init, sendOneRound,
    };

    function request(url, body) {
        const data = {type: url, ...(body)};
        server.postMessage(data);

        return new Promise((resolve) => {
            server.onmessage = ({data}) => resolve(data);
        });
    }

    function login() {
        const requestBody = {};

        return request('account/login', requestBody)
            .then((data) => {
                app.user = new User();

                return data;
            });
    }

    function init() {
        const requestBody = {};

        return request('lobby/init', requestBody)
            .then((data) => {
                reelTables.normalTable =
                    data['reel']['normalreel'];

                return {...reelTables};
            });
    }

    function sendOneRound({bet}) {
        const requestBody = {
            bet,
        };

        return request('game/gameresult', requestBody)
            .then(handle);
    }

    function handle(data) {
        const totalWin = data['totalwinscore'];
        const cash = data['playermoney'];

        const normalGame = Result(data['normalresult']);

        return {
            cash,
            totalWin,

            normalGame,
        };
    }

    function Result(data) {
        return {
            hasLink: Boolean(data['islink']),
            scores: data['scores'],
            positions: data['plateindex'],
            symbols: data['plate'],
        };
    }
}

