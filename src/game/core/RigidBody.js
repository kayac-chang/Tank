import {Bodies, Body, Vector} from 'matter-js';

export function Rectangle({x, y, width, height}, options) {
    const body = Bodies.rectangle(x, y, width, height, options);

    const it = {
        //
        get content() {
            return body;
        },
        //
        get position() {
            const {x, y} = body.position;

            return {x, y};
        },
        set position({x, y}) {
            const vector = Vector.create(x, y);

            Body.setPosition(body, vector);
        },
        //
        get rotation() {
            return body.angle;
        },
        set rotation(value) {
            Body.setAngle(body, value);
        },
        //
        addForce({x = 0, y = 0}) {
            let vector = Vector.create(x, y);
            vector = Vector.rotate(vector, body.angle);

            body.force = vector;

            return body.force;
        },
    };

    //  Default
    it.position = {x, y};

    return it;
}
