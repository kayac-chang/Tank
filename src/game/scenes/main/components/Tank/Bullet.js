import {Sprite} from 'pixi.js';
import {Speed} from '../Base/Speed';
import {Collision} from '../Base/Collision';
import {wait} from '@kayac/utils';

const res = app.resource.get;

const REVERSE = 8;

export function Bullet() {
    const texture = res('bullets').textures['bullet_1.png'];

    texture.rotate = REVERSE;

    return function spawn({position, angle}) {
        const it = new Sprite(texture);

        it.name = 'Bullet';

        Speed({maxSpeed: 2}, it);

        Collision(it);

        it.on('Collision', onCollision);

        app.stage.addChild(it);

        return it;

        function onCollision(target) {
            if (target.name === 'Crate') destroy(it);
        }

        async function destroy() {
            it.collision = false;

            it.off('Collision', onCollision);

            await wait(0);

            it.parent.removeChild(it);
        }
    };
}
