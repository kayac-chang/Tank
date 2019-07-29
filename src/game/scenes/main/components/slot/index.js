import {TextureManager} from './util';

export {Slot} from './Slot';

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

