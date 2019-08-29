import {Container, Sprite} from 'pixi.js';

const {defineProperties} = Object;

export function Digit({x, y}) {
    const {textures} = app.resource.get('number');

    const comp = new Container();

    comp.position.set(x, y);

    let value = 0;

    let fontScale = 1;

    comp.updatePos = updatePos;

    update();

    return defineProperties(comp, {
        //
        value: {
            get() {
                return value;
            },
            set(newValue) {
                value = newValue;

                update();
            },
        },
        //
        fontScale: {
            get() {
                return fontScale;
            },
            set(newScale) {
                fontScale = newScale;

                update();
            },
        },
    });

    function update() {
        comp.removeChildren();

        const words =
            [...String(value)]
                .map((char) => {
                    const sprite = new Sprite(textures[`${char}.png`]);

                    sprite.name = char;

                    sprite.scale.set(fontScale);

                    return sprite;
                });

        words.reduce((a, b) => {
            b.x = a.x + a.width;
            return b;
        });

        comp.addChild(...words);

        comp.updatePos();
    }

    function updatePos() {
        comp.pivot.set(
            comp.width / 2,
            comp.height / 2
        );
    }
}
