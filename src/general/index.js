export * from './utils/format';
export * from './utils/time';
export * from './utils/dev';
export * from './performance';
export * from './algorithm';
export * from './utils/dom';
export * from './function';

export {isMobile} from 'pixi.js/lib/core/utils';

import {map} from './function';
import {round} from './algorithm';

export function rgbToHex([r, g, b]) {
    [r, g, b] = map(round, [r, g, b]);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function fetchJSON(url) {
    return fetch(url).then((res) => res.json());
}
