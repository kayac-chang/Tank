import {isReel} from './util';
import {property} from './index';
import {Reel} from './Reel';

export function Slot({view, ...options}) {
    Object.assign(property, options);

    const reels =
        view.children
            .filter(isReel)
            .map(Reel);

    return {
        get reels() {
            return reels;
        },
    };
}
