import {Tank} from './components/Tank';

import {Viewport} from 'pixi-viewport';

export function create() {
    const scene = new Viewport({
        screenWidth: app.screen.width,
        screenHeight: app.screen.height,
        worldWidth: 1000,
        worldHeight: 1000,
    });

    const tank = Tank();

    tank.position.set(500, 500);

    scene.addChild(tank);

    app.stage.addChild(scene);
}
