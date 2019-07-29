import {isReel, TextureManager} from './util';
import {Reel} from './Reel';

let textures = undefined;

export const property = {
    stepPerSymbol: 1,
    reelStrips: [],

    get textures() {
        return textures;
    },
    set textures(config) {
        textures = TextureManager(config);
    },
};

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
