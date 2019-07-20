import {
    divide, mod, floor, nth,
} from '../../../../../general';

import {
    TextureManager,
    isReel,
    isSymbol, isResult,
} from './util';

import {Status} from './index';
import {setMotionBlur} from '../../../../plugin/filter';

export function SlotMachine(
    {
        view,
        stopPerSymbol,
        reelTables,
        symbolConfig,
        distancePerStop,
    },
) {
    const slotBaseView =
        view.getChildByName('SlotBase');

    const {getTexture} = TextureManager(symbolConfig);

    const reels =
        slotBaseView.children
            .filter(isReel)
            .map(Reel);

    return {
        view,
        reels,

        get reelTables() {
            return reelTables;
        },
        set reelTables(newTables) {
            reelTables = newTables;
        },
    };

    function Symbol(view, symbolIdx) {
        const distance =
            distancePerStop ||
            divide(Number(view.height), stopPerSymbol);

        const initPos =
            symbolIdx * stopPerSymbol;

        const anchorOffset =
            view.anchor.y * view.height;

        let icon = 0;

        return {
            get symbolIdx() {
                return symbolIdx;
            },

            get view() {
                return view;
            },

            get height() {
                return view.height;
            },

            get icon() {
                return icon;
            },
            set icon(iconId) {
                icon = iconId;

                view.texture = getTexture(iconId);
            },

            get initPos() {
                return initPos;
            },

            get visible() {
                return view.visible;
            },
            set visible(flag) {
                view.visible = flag;
            },

            get pos() {
                return divide(view.y - anchorOffset, distance);
            },
            set pos(newPos) {
                view.y = (newPos * distance) + anchorOffset;
            },

            get y() {
                return view.y;
            },
            set y(newY) {
                view.y = newY;
            },

            get alpha() {
                return view.alpha;
            },
            set alpha(newAlpha) {
                view.alpha = newAlpha;
            },
        };
    }


    function Reel(view, reelIdx) {
        const symbols =
            view.children
                .filter(isSymbol)
                .map(Symbol);

        const results =
            view.children
                .filter(isResult)
                .map(Symbol);

        const displayLength =
            symbols.length * stopPerSymbol;

        let motionBlur = undefined;

        let axis = 0;

        let status = Status.Idle;

        return {
            get status() {
                return status;
            },
            set status(newStatus) {
                status = newStatus;

                if (status === Status.Idle) {
                    axis = floor(axis + 1);

                    symbols.forEach((symbol) => {
                        symbol.vy = 0;
                        updateSymbol(symbol, axis);

                        if (symbol.pos === 0) symbol.visible = true;
                    });
                    //
                } else if (status === Status.Start) {
                    motionBlur = setMotionBlur(view);
                    //
                } else if (status === Status.Stop) {
                    view.filters = undefined;
                    //
                }
            },

            get reelIdx() {
                return reelIdx;
            },

            get view() {
                return view;
            },

            get reelTable() {
                return reelTables[reelIdx];
            },

            get symbols() {
                return symbols;
            },

            get results() {
                return results;
            },

            get axis() {
                return axis;
            },
            set axis(newAxis) {
                newAxis =
                    mod(newAxis, reelTables[reelIdx].length);

                symbols
                    .forEach((symbol) => updateSymbol(symbol, newAxis));

                results
                    .forEach((result) => updateResult(result, newAxis));

                const velocity =
                    (status === Status.Stop) ? 0 : newAxis - axis;
                motionBlur.update(velocity);

                axis = newAxis;
            },
        };

        function updateSymbol(symbol, newAxis) {
            symbol.pos =
                (newAxis + symbol.initPos) % displayLength;

            if (status === Status.Stop) {
                return symbol.visible = false;
                //
            } else if (status === Status.Start) {
                if (symbol.pos < 1 && !symbol.visible) {
                    return symbol.visible = true;
                    //
                } else if (symbol.pos >= displayLength - 1) {
                    const iconId = nth(
                        floor(newAxis), reelTables[reelIdx],
                    );

                    if (iconId === 10) return;

                    symbol.icon = iconId;
                }
            }
        }

        function updateResult(result, newAxis) {
            if (status === Status.Start) {
                if (result.pos < 0) return;

                if (result.pos > displayLength - 1) {
                    result.pos = [-4, -2][result.symbolIdx];

                    result.view.filters = [];
                    result.view.scale.set(1);
                    //
                } else if (result.pos <= displayLength - 1) {
                    const velocity = newAxis - axis;
                    result.pos += (velocity);
                }
            }
        }
    }
}

