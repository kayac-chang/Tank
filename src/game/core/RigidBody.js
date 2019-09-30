import {Bodies, Body, Events} from 'matter-js';

import Vector from './Vector';

export function Rectangle({x, y, width, height}, options) {
    const body = Bodies.rectangle(x, y, width, height, options);

    let scale = {x: 1, y: 1};

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
        get scale() {
            return scale;
        },
        set scale({x = scale.x, y = scale.y}) {
            scale = {x, y};

            Body.scale(body, x, y);
        },
        //
        addForce(value) {
            body.force =
                Vector(body.force)
                    .add(value)
                    .rotate(body.angle);

            return body.force;
        },
        on(event, callback) {
            Events.on(body, event, callback);
        },
    };

    //  Default
    it.position = {x, y};

    return it;
}
