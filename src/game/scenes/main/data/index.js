import {sprites} from './sprites';
import {symbols, symbolConfig} from './symbols';

export function reserve() {
    return [
        ...(sprites),
        ...(symbols),
    ];
}


const stopPerSymbol = 1;

const MAYBE_BONUS_DURATION = 1000;

const getSpinDuration = () => 1800;
const getSpinStopInterval = () => 360;


export {
    stopPerSymbol,

    symbolConfig,

    getSpinDuration,
    getSpinStopInterval,

    MAYBE_BONUS_DURATION,
};

