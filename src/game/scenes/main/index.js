import {Scene} from './Scene';
import {Tank} from './components/Tank';


export function create() {
    const scene = Scene();

    const tank = Tank();

    scene.addChild(tank);

    window.scene = scene;
}

export * from './data';
