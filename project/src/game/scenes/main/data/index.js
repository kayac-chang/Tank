import {sprites} from './sprites';
import {sounds} from './sound';
import {symbols, symbolConfig} from './symbols';

import ENERGY_URL from '../assets/images/energy.png';

import NUMBER from '../assets/fonts/number.xml';
import '../assets/fonts/number.png';

export function reserve() {
    return [
        ...(sprites),
        ...(symbols),
        ...(sounds),

        {name: 'energy', url: ENERGY_URL},

        {name: 'number', url: NUMBER},
    ];
}


const getSpinDuration = () => [1800, 1200, 600][app.user.speed];
const getSpinStopInterval = () => [360, 240, 120][app.user.speed];


export {
    symbolConfig,

    getSpinDuration,
    getSpinStopInterval,
};

