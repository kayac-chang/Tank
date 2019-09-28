import {Tank} from './components/Tank';

export function create() {
    const tank = Tank();

    tank.position.set(500, 500);

    app.stage.addChild(tank);
}




