import {isReel, TextureManager} from './util';
import {Reel} from './Reel';

const {freeze, assign} = Object;

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

export const State = freeze({
    Idle: 'idle',
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

        get current() {
            return reels.map((reel) =>
                reel.symbols
                    .concat()
                    .sort(byPos)
                    .map((symbol) => symbol.icon)
                    .slice(1, reel.symbols.length - 1)
            );
        },
    };
}

function byPos(a, b) {
    return a.pos - b.pos;
}
