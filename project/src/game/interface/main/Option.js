import {Button} from '../components';
import {changeColor, scaleDown, scaleUp} from '../../effect';
import {Inner} from './Inner';

const {assign} = Object;

const TRANS = {
    IN: {easing: 'easeOutCirc', duration: 260},
    OUT: {easing: 'easeInCirc', duration: 260},
};

export function Option(it, main) {
    it.interactive = true;

    const backButton = Button(it.getChildByName('back'));
    backButton.on('pointerup', close);

    const inner = Inner(it.getChildByName('inner'));

    const state = {};

    ['speed', 'auto', 'bet']
        .forEach((name) => {
            const button = Button(it.getChildByName(name));

            button.on('pointerup', onOptionClick);

            state[name] = it.getChildByName(`state@${name}`);
        });

    const audio = Audio();

    const exchangeButton = Button(it.getChildByName('exchange'));

    exchangeButton.on('pointerup', openExchange);

    const frames =
        it.children
            .filter(({name}) => name.includes('frame') || name.includes('outline'));

    app.on('ChangeColor', (color) => {
        changeColor({targets: frames, color});
    });

    let current = undefined;

    return assign(it, {
        isOpen: false,
        open, close,
    });

    async function open() {
        audio.update();

        app.sound.play('spin');

        main.transition['open_option'].restart();

        await main.transition['open_option'].finished;

        if (current) await openInner();

        backButton.interactive = true;

        it.isOpen = true;
    }

    async function close() {
        backButton.interactive = false;

        it.isOpen = false;

        app.sound.play('spin');

        main.transition['close_option'].restart();

        if (current) await closeInner();

        await main.transition['close_option'].finished;
    }

    async function openInner() {
        scaleUp({targets: state[current], easing: 'easeOutCirc', duration: 260});

        inner.update(current);

        await inner.open();
    }

    async function closeInner() {
        scaleDown({targets: state[current], easing: 'easeInCirc', duration: 260});

        await inner.close();
    }

    async function onOptionClick() {
        backButton.off('pointerup', close);

        const reset = await hide();

        current = this.name;

        await openInner();

        backButton.once('pointerup', prev);

        async function prev() {
            await closeInner();

            await reset();

            current = undefined;

            backButton.on('pointerup', close);
        }
    }

    async function hide() {
        const targets =
            it.children
                .filter(({name}) => match(name));

        await scaleDown({targets, ...TRANS.OUT}).finished;

        return async function reset() {
            await scaleUp({targets, ...TRANS.IN}).finished;
        };

        function match(name) {
            const KEYS = ['speed', 'auto', 'bet', 'audio', 'exchange'];

            return KEYS.includes(name) || name.split('@')[0] === 'img';
        }
    }

    function Audio() {
        const open = it.getChildByName('img@audio_open');
        const close = it.getChildByName('img@audio_close');

        update();

        const audioButton = Button(it.getChildByName('audio'));

        audioButton.on('pointerup', onAudioClick);

        return {update};

        function update() {
            const state = app.sound.mute();

            open.visible = !state;
            close.visible = state;
        }

        function onAudioClick() {
            const state = app.sound.mute();

            app.sound.mute(!state);

            update();
        }
    }

    function openExchange() {
        it.emit('OpenExchange');
    }
}
