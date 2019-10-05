import {Engine, World, Events} from 'matter-js';
import {frameLoop} from '@kayac/utils';

const engine = (function main() {
    //  Engine
    const engine = Engine.create();

    //  World
    const {world} = engine;

    //  Top-Down
    world.gravity.y = 0;

    //  Init
    Engine.run(engine);
    frameLoop(() => {
        Engine.update(engine);

        //  Update
        world.bodies.forEach((body) => {
            const {gameObject} = body;

            const {x, y} = body.position;
            gameObject.position.set(x, y);

            gameObject.rotation = body.angle;
        });

        app.emit('Update');
    });

    //  on Collision Start
    Events.on(engine, 'collisionStart', (event) =>
        emitAll('CollisionStart', event.pairs));

    //  on Collision Active
    Events.on(engine, 'collisionActive', (event) =>
        emitAll('CollisionActive', event.pairs));

    return engine;
})();

function emitAll(event, pairs) {
    for (const {bodyA, bodyB} of pairs) {
        //
        const tarA = bodyA.gameObject;
        const tarB = bodyB.gameObject;

        tarA.emit(event, tarB);
        tarB.emit(event, tarA);
    }
}

export function addSubject(gameObject) {
    World.add(engine.world, gameObject.rigidBody);
}

export function removeSubject(gameObject) {
    World.remove(engine.world, gameObject.rigidBody);
}

export * from './RigidBody';
