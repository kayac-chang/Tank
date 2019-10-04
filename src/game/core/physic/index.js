import {Engine, World, Events} from 'matter-js';
import {frameLoop} from '@kayac/utils';

const subjects = [];

const engine = (function main() {
    //  Engine
    const engine = Engine.create();

    //  Init
    Engine.run(engine);
    frameLoop(() => {
        Engine.update(engine);

        //  Update
        subjects.forEach((subject) => {
            const {x, y} = subject.rigidBody.position;

            subject.position.set(x, y);

            subject.rotation = subject.rigidBody.angle;
        });

        app.emit('Update');
    });

    //  on Collision Active
    Events.on(engine, 'collisionActive', (event) => {
        for (const {bodyA, bodyB} of event.pairs) {
            //

            let tarA = undefined;
            let tarB = undefined;

            for (const it of subjects) {
                if (bodyA === it.rigidBody) tarA = it;
                if (bodyB === it.rigidBody) tarB = it;
            }

            tarA.emit('CollisionActive', tarB);
            tarB.emit('CollisionActive', tarA);
        }
    });

    //  World
    const {world} = engine;

    //  Top-Down
    world.gravity.y = 0;

    return engine;
})();

export function addSubject(gameObject) {
    World.add(engine.world, gameObject.rigidBody);

    subjects.push(gameObject);
}

export function removeSubject(gameObject) {
    World.remove(engine.world, gameObject.rigidBody);

    subjects.splice(subjects.indexOf(gameObject), 1);
}

export * from './RigidBody';
