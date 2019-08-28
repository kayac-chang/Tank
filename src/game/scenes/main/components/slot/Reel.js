import {id, isSymbol} from './util';
import {update} from './update';
import {Symbol} from './Symbol';
import {property, State} from './Slot';

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

    let state = State.Idle;

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

        get state() {
            return state;
        },
        set state(newState) {
            state = newState;
        },

        get pos() {
            return pos;
        },
        set pos(newPos) {
            pos = newPos;

            update(reel, newPos);
        },
    };

    symbols
        .forEach((symbol) => symbol.texture = strip.next().value);

    return reel;
}
