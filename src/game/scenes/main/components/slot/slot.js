import {isReel, isSymbol} from './util';

import {
    divide,
    nth,
    mod,
    round,
} from '../../../../../general';

import {stopPerSymbol, symbolConfig} from '../../data';
import {mRound} from '../../../../../general';

export function SlotMachine({view, table}) {
    const empty =
        symbolConfig
            .find(({name}) => name === 'empty')
            .id;

    table = process(table);

    const reels =
        view.children
            .filter(isReel)
            .map((view, index) => Reel({
                view,
                table: table[index],
            }))
            .sort((a, b) => a.index - b.index);

    return {
        get reels() {
            return reels;
        },

        get table() {
            return table;
        },
        set table(newTable) {
            table = process(newTable);

            reels.forEach(
                (reel, index) => reel.table = table[index]);
        },
    };

    function process(table) {
        return table.map((reel, index) =>
            reel
                .map((icon) => {
                    if (icon === 0 && index !== 1) return `${icon}${index}`;

                    return icon + '';
                })
                .filter((icon) => icon !== empty),
        );
    }
}

function Texture(icon) {
    if (!Texture.config) {
        const {textures} = app.resource.get('symbols');

        Texture.config =
            symbolConfig
                .filter(({texture}) => texture)
                .map(({id, texture}) =>
                    ({id, texture: textures[texture]}));
    }

    return Texture.config
        .find(({id}) => id === icon)
        .texture;
}

function Symbol(view, index) {
    const stepSize =
        divide(view.height, stopPerSymbol);

    const initPos = index * stopPerSymbol;
    let displayPos = initPos;

    let idx = Number(view.name.split('@')[1]);
    let icon = idx;

    return {
        get name() {
            return view.name;
        },

        get height() {
            return view.height;
        },

        get stepSize() {
            return stepSize;
        },

        get initPos() {
            return initPos;
        },

        get displayPos() {
            return displayPos;
        },
        set displayPos(newPos) {
            displayPos = newPos;
        },

        get x() {
            return view.x;
        },
        set x(newX) {
            view.x = newX;
        },

        get y() {
            return view.y;
        },
        set y(newY) {
            view.y = newY;
        },

        get idx() {
            return idx;
        },
        set idx(newIdx) {
            idx = newIdx;
        },

        get icon() {
            return icon;
        },
        set icon(id) {
            view.texture = Texture(id);
            icon = id;
        },

        get visible() {
            return view.visible;
        },
        set visible(flag) {
            view.visible = flag;
        },
    };
}

function Reel({view, table}) {
    const name = view.name;
    const index = Number(view.name.split('@')[1]);

    const symbols =
        view.children
            .filter(isSymbol)
            .sort((a, b) => a.y - b.y)
            .map(Symbol);

    const offsetY = symbols[0].y;

    const displayLength =
        symbols.length * stopPerSymbol;

    let nextId = symbols[0].initPos + 1;

    let pos = 0;

    const reel = {
        get index() {
            return index;
        },

        get name() {
            return name;
        },

        get symbols() {
            return symbols;
        },

        get displayLength() {
            return displayLength;
        },

        get offsetY() {
            return offsetY;
        },

        get table() {
            return table;
        },
        set table(newTable) {
            const nearest = mRound(newTable.length, displayLength);
            table = newTable.slice(0, nearest);

            nextId = mod(nextId, table.length);
        },

        get nextId() {
            return nextId;
        },
        set nextId(newId) {
            nextId = mod(newId, table.length);
        },

        get pos() {
            return pos;
        },
        set pos(newPos) {
            pos = mod(newPos, table.length);
            update(reel);
        },
    };

    reel.pos = 6;
    reel.table = table;

    symbols.forEach((symbol) =>
        symbol.icon = nth(symbol.idx, table));

    app.on('SpinStart', () =>
        symbols.forEach((symbol) => symbol.visible = true));

    app.on('ShowResult', () =>
        symbols.forEach((symbol) => symbol.visible = false));

    return reel;
}

function update(reel) {
    reel.symbols
        .forEach((symbol) => {
            const displayPos =
                mod(reel.pos + symbol.initPos, reel.displayLength);

            const swap =
                round(symbol.displayPos - displayPos) >= reel.displayLength;

            if (swap) {
                symbol.icon = nth(reel.nextId, reel.table);

                reel.nextId += 1;
            }

            symbol.displayPos = displayPos;

            symbol.y =
                reel.offsetY + (symbol.displayPos * symbol.stepSize);
        });
}
