import {Emitter} from 'pixi-particles';
import {particles} from 'pixi.js';

const {ParticleContainer} = particles;

function time(delta) {
    return delta * 0.01;
}

export function Particle(textures, config) {
    const it = new ParticleContainer();

    const emitter = new Emitter(
        it,
        textures,
        config,
    );

    emitter.emit = true;

    app.ticker.add(update);

    return it;

    function update(delta) {
        emitter.update(time(delta));
    }
}
