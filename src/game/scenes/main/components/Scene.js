
import {Viewport} from 'pixi-viewport';

export function Scene() {
    const it = new Viewport({
        screenWidth: app.screen.width,
        screenHeight: app.screen.height,
        worldWidth: 1000,
        worldHeight: 1000,
    });

    app.stage.addChild(it);

    return it;
}
