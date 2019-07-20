import {extras} from 'pixi.js';

const {BitmapText} = extras;

import {currencyFormat, wait} from '../../../../general';
import {currencyChange, fadeIn, fadeOut} from '../effect';
import anime from 'animejs';

const style = {font: '30px Score'};

export function Normal(view) {
    const scores =
        view.children
            .filter(({name}) => name && name.includes('pos'))
            .map(({name, x, y}) => {
                const score = new BitmapText('0', style);

                score.position.set(x, y);

                if (name.includes('jackpot')) {
                    score.name = name.split('_')[1];

                    JackPot(score);
                } else {
                    score.name = name.split('@')[1];

                    PayLine(score);
                }

                app.on('UserBetChange', () => update(score));
                app.on('JackPotChange', () => update(score));

                return score;
            });

    return init();

    function init() {
        const table = {
            '1': '5x',
            '2': '3x',
            '3': '2x',
            '4': 'seven',
            '5': '3bar',
            '6': '2bar',
            '7': '1bar',
        };

        app.on('ShowResult', async ({symbols}) => {
            const includeJackpot =
                ['1', '2', '3'].includes(symbols[1]);

            const firstReelWild =
                symbols[0] === '00';
            const thirdReelWild =
                symbols[2] === '02';
            const bothReelWild =
                firstReelWild && thirdReelWild;

            const allSame =
                symbols.every((symbol) => symbols[0] === symbol);
            const secondThirdSame =
                symbols[1] === symbols[2];
            const firstSecondSame =
                symbols[0] === symbols[1];

            let name = 'any';


            if (includeJackpot && bothReelWild) {
                name = table[symbols[1]];
                //
            } else if (
                includeJackpot ||
                allSame ||
                thirdReelWild && firstSecondSame
            ) {
                name = table[symbols[0]];
                //
            } else if (firstReelWild && secondThirdSame) {
                name = table[symbols[1]];
                //
            }

            const targets = view.getChildByName(`box@${name}`);

            await fadeIn({targets}).finished;

            app.once('SpinStart', () => fadeOut({targets}));
        });

        view.alpha = 0;

        view.addChild(...scores);

        view.show = show;
        view.hide = hide;

        return view;
    }

    function show() {
        return fadeIn({targets: view}).finished;
    }

    function hide() {
        return fadeOut({targets: view}).finished;
    }
}

export function ReSpin(view) {
    const scores =
        view.children
            .filter(({name}) => name.includes('pos'))
            .map(({name, x, y}) => {
                const score = new BitmapText('0', style);

                score.anchor.set(0.5, 1);
                score.position.set(x, y);

                score.name = name.split('_')[1];

                JackPot(score);

                if (['2x', '3x'].includes(score.name)) {
                    score.scale.set(0.9, 0.8);
                }

                app.on('UserBetChange', () => update(score));
                app.on('JackPotChange', () => update(score));

                return score;
            });

    const planets =
        view.children
            .filter(({name}) => name.includes('planet'));

    return init();

    function init() {
        view.alpha = 0;

        view.addChild(...scores);

        view.show = show;
        view.hide = hide;

        return view;
    }

    async function show() {
        view.alpha = 1;

        planets.forEach((it) => it.alpha = 0);
        scores.forEach((it) => it.alpha = 0);

        const showAnim = view.transition['show'];

        showAnim.restart();

        await wait(1000);

        fadeIn({
            targets: scores,
            delay: anime.stagger(250),
        });

        return showAnim.finished;
    }

    function hide() {
        return fadeOut({targets: view}).finished;
    }
}

function getOdds(name) {
    const {payTable} = app.user;

    return {
        '5x': payTable[0],
        '3x': payTable[1],
        '2x': payTable[2],
        'seven': payTable[3],
        '3bar': payTable[4],
        '2bar': payTable[5],
        '1bar': payTable[6],
        'any': payTable[7],
    }[name];
}

function PayLine(view) {
    view.score = getScore();

    view.text = currencyFormat(view.score);

    view.scale.set(0.9, 0.8);

    view.getScore = getScore;

    return view;

    function getScore() {
        return app.user.currentBet * getOdds(view.name);
    }
}

function JackPot(view) {
    view = PayLine(view);

    view.score = getScore();

    view.scale.set(1);

    view.getScore = getScore;

    return view;

    function getScore() {
        const {name} = view;
        return app.user.currentBet * getOdds(name) + app.user.jackPot[name];
    }
}

function update(view) {
    const newScore = view.getScore();

    currencyChange({
        range: [view.score, newScore],
        targets: view,
        duration: 500,
    });

    view.score = newScore;
}


