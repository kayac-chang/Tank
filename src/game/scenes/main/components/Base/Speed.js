import {RigidBody} from './RigidBody';

const {defineProperties} = Object;
const {abs, sign} = Math;

export function Speed({speed = 0, maxSpeed = 0}, it) {
    it = RigidBody(it);

    return defineProperties(it, {
        //
        speed: {
            get() {
                return speed;
            },
            set(value) {
                speed =
                    (abs(value) >= maxSpeed) ? maxSpeed * sign(value) : value;

                it.vector.set(speed, speed);
            },
        },
        //
        maxSpeed: {
            get() {
                return maxSpeed;
            },
            set(value) {
                maxSpeed = value;
            },
        },
        //
    });
}
