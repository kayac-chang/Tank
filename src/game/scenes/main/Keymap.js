import keyboard from 'keyboardjs';
import {throttleByFrame} from '@kayac/utils';

const {entries} = Object;

export function Keymap(config) {
    entries(config)
        .forEach(([key, func]) =>
            keyboard.bind(key, throttleByFrame(func)));
}
