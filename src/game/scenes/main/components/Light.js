import {twink} from '../effect';

export function Light(view) {
    let twinkling = false;

    return {show, off};

    async function show() {
        twinkling = true;
        while (twinkling) await twink({targets: view, interval: 500});
    }

    function off() {
        twinkling = false;
    }
}
