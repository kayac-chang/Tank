import {sprites} from './sprites';
import {symbols, symbolConfig} from './symbols';

import ENERGY_URL from '../assets/images/energy.png';

import NUMBER from '../assets/fonts/number.xml';
import '../assets/fonts/number.png';

export function reserve() {
    return [
        ...(sprites),
        ...(symbols),

        {name: 'energy', url: ENERGY_URL},

        {name: 'number', url: NUMBER},
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

