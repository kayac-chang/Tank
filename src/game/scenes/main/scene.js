import {Tank} from './components/Tank';
import {Crate} from './components/Obstacle/Crate';

import {Viewport} from 'pixi-viewport';
import {Control} from './Control';
import {Physic} from './components/Base/Physic';

export function create() {
    const scene = new Viewport({
        screenWidth: app.screen.width,
        screenHeight: app.screen.height,
        worldWidth: 1000,
        worldHeight: 1000,
    });

    const tank = Tank();

    tank.position.set(500, 500);

    const crate = Crate();

    crate.position.set(1000, 500);

    scene.addChild(tank, crate);

    app.stage.addChild(scene);

    Control({
        'w': forward,
        's': backward,
        'a': turnLeft,
        'd': turnRight,
        ' ': attack,
    });

    Physic();

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
