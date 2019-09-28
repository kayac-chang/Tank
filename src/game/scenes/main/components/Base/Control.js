import hotkeys from 'hotkeys-js';

export function Control(binding, target) {
    hotkeys('*', ({key}) => binding[key] && binding[key].call(target));
}
