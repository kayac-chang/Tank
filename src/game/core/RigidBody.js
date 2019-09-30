import {Bodies, Body} from 'matter-js';

import Vector from './Vector';

export function Rectangle({x, y, width, height}, options) {
    const body = Bodies.rectangle(x, y, width, height, options);

    const it = {
        //
        get content() {
            return body;
        },
        //
        get position() {
            return Vector(body.position);
        },
        set position(value) {
            const vector = Vector(value);

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
        addForce(value) {
            body.force =
                Vector(body.force)
                    .add(value)
                    .rotate(body.angle);

            return body.force;
        },
    };

    //  Default
    it.position = {x, y};

    return it;
}
