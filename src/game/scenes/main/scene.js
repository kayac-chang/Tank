import {Tank} from './components/Tank';

import {Viewport} from 'pixi-viewport';
import {Control} from './Control';

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

    Control({
        'w': forward,
        's': backward,
        'a': turnLeft,
        'd': turnRight,
        ' ': attack,
    });

    function forward() {
        const unit = 1;
        tank.speed += unit;
    }

    function backward() {
        const unit = -1;
        tank.speed += unit;
    }

    function turnLeft() {
        tank.angle -= 10;
    }

    function turnRight() {
        tank.angle += 10;
    }

    function attack() {
        tank.fire();
    }
}
