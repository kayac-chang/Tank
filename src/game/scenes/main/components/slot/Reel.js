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

function byX(a, b) {
    return a.x - b.x;
}

function byY(a, b) {
    return a.y - b.y;
}

export function Reel(view) {
    const index = id(view);

    const symbols =
        view.children
            .filter(isSymbol)
            .sort(byY)
            .map(Symbol);

    const strip = Strip(property.reelStrips[index]);

    const buffer = [];

    let pos = 0;

    let state = State.Idle;

    let anim = undefined;

    const reel = {
        buffer,

        get index() {
            return index;
        },

        get symbols() {
            return [...symbols].sort(byY);
        },

        get displaySymbols() {
            return reel.symbols.slice(1, 1 + property.displayLength);
        },

        get state() {
            return state;
        },
        set state(newState) {
            state = newState;

            return view.emit('StateChange', state);
        },

        get pos() {
            return pos;
        },
        set pos(newPos) {
            pos = newPos;

            update(reel, newPos);
        },

        get anim() {
            return anim;
        },
        set anim(newAnim) {
            anim = newAnim;
        },

        push(...icons) {
            const textures =
                icons.map((icon) => property.textures.get(icon));

            buffer.push(...textures);
        },

        next() {
            if (buffer.length) return buffer.pop();

            return strip.next().value;
        },

        on(event, listener) {
            return view.on(event, listener);
        },

        once(event, listener) {
            return view.once(event, listener);
        },

        off(event, listener) {
            return view.off(event, listener);
        },

        emit(event, ...args) {
            return view.emit(event, ...args);
        },
    };

    symbols
        .forEach((symbol) => symbol.texture = reel.next());

    return reel;
}
