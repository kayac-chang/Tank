import {Bodies, Body, Vector} from 'matter-js';

export function Rectangle({x, y, width, height}) {
    const body = Bodies.rectangle(x, y, width, height);

    const it = {
        get body() {
            return body;
        },

        get position() {
            const {x, y} = body.position;

            return {x, y};
        },
        set position({x, y}) {
            const vector = Vector.create(x, y);

            Body.setPosition(body, vector);
        },
    };

    //  Default
    it.position = {x, y};

    return it;
}
