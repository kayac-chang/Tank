import {sprites} from './sprites';
import {sounds} from './sounds';
import {fonts} from './fonts';


export function reserve() {
    return [
        ...(sprites),

        ...(fonts),

        ...(sounds),
    ];
}
