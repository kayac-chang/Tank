import {isReel, TextureManager} from './util';
import {Reel} from './Reel';

const {freeze, assign} = Object;

let textures = undefined;

export const property = {
    stepPerSymbol: 1,
    displayLength: 3,
    reelStrips: [],

    get textures() {
        return textures;
    },
    set textures(config) {
        textures = TextureManager(config);
    },
};

export const State = freeze({
    Spin: 'spin',
    Stop: 'stop',
});

export function Slot({view, ...options}) {
    assign(property, options);

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
