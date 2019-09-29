import {Sprite} from 'pixi.js';
import {Collision} from '../Base/Collision';
import {nextFrame, wait} from '@kayac/utils';

const res = app.resource.get;

export function Crate() {
    const it =
        new Sprite(res('crates').textures[`crateWood.png`]);

    it.name = 'Crate';

    Collision(it);

    it.on('Collision', onCollision);

    return it;

    async function onCollision(target) {
        destroy(it);

        target.speed = 0;

        target.vector.set(-1, -1);

        await nextFrame();

        target.vector.set(0, 0);
    }

    async function destroy() {
        it.collision = false;

        it.off('Collision', onCollision);

        await wait(0);

        it.parent.removeChild(it);
    }
}
