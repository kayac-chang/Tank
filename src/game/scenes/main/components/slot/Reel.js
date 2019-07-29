import {id, isSymbol} from './util';
import {update} from './update';
import {Symbol} from './Symbol';
import {property} from './Slot';

function* Strip(data) {
    while (true) {
        for (const id of data) {
            yield property.textures.get(id);
        }
    }
}

export function Reel(view) {
    const index = id(view);

    const symbols =
        view.children
            .filter(isSymbol)
            .sort((a, b) => a.y - b.y)
            .map(Symbol);

    const strip = Strip(property.reelStrips[index]);

    let pos = 0;

    const reel = {
        get index() {
            return index;
        },

        get symbols() {
            return symbols;
        },

        get strip() {
            return strip;
        },

        get pos() {
            return pos;
        },
        set pos(newPos) {
            pos = newPos;

            update(reel, newPos);
        },
    };

    return reel;
}
