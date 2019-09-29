import {targets} from './Physic';

const {defineProperties} = Object;

export function Collision(it) {
    let enable = true;

    targets.push(it);

    return defineProperties(it, {
        collision: {
            get() {
                return enable;
            },
            set(value) {
                enable = value;

                if (enable) {
                    if (!targets.includes(it)) targets.push(it);
                } else {
                    const index = targets.indexOf(it);
                    targets.splice(index, 1);
                }
            },
        },
    });
}
