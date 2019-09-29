import {Bullet} from './Bullet';
import {Light} from './Light';

const {assign} = Object;

export function Arms(it) {
    const light = Light();

    light.y = it.height / 2;

    it.addChild(light);

    const spawn = Bullet();

    return assign(it, {fire});

    function fire() {
        light.execute();

        const bullet = spawn(it);

        const pos = light.getGlobalPosition();

        bullet.position.set(pos.x, pos.y);
        bullet.angle = it.angle;

        bullet.speed = 2;
    }
}

