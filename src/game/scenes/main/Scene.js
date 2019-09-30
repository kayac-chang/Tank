import {Engine, World} from 'matter-js';
import {Viewport} from 'pixi-viewport';

import {frameLoop} from '@kayac/utils';

function Physic() {
    //  Engine
    const engine = Engine.create();

    //  Init
    Engine.run(engine);
    frameLoop(() => Engine.update(engine));

    //  World
    const {world} = engine;

    //  Top-Down
    world.gravity.y = 0;

    return {addChild};

    function addChild(...children) {
        return World.add(world, ...children);
    }
}

export function Scene() {
    const physic = Physic();

    const render = new Viewport({
        screenWidth: app.screen.width,
        screenHeight: app.screen.height,
        worldWidth: 1000,
        worldHeight: 1000,
    });
    app.stage.addChild(render);

    return {
        add,
    };

    function add(...children) {
        physic.addChild(...children);
        render.addChild(...children);
    }
}
