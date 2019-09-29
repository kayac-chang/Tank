import hotkeys from 'hotkeys-js';

export function Control(binding) {
    hotkeys('*', ({key}) => binding[key] && binding[key]());
}
