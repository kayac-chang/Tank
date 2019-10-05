import {Scene, Tank, Crate} from './components';

import {SandArea} from './SandArea';
import {Keymap} from '../../core/Keymap';

import {Container} from 'pixi.js';

function Background() {
    const it = new Container();

    const table = [
        [[-1, -1], [0, -1], [1, -1]],
        [[-1, 0], [0, 0], [1, 0]],
        [[-1, 1], [0, 1], [1, 1]],
    ];

    const targets =
        table.flatMap((row) => {
            //
            return row.map(([x, y]) => {
                const area = SandArea();

                area.id = {x, y};

                area.x = area.width * x;
                area.y = area.height * y;
                area.pivot.set(area.width / 2, area.height / 2);

                return area;
            });
        });

    it.addChild(...targets);

    return it;
}

export function create() {
    const scene = Scene();

    app.scenes['main'] = scene;

    const tank = Tank();

    tank.transformer.x = 0;
    tank.transformer.y = 0;

    scene.follow(tank);

    const crate = Crate();

    crate.transformer.x = 50;
    crate.transformer.y = 0;

    const background = Background();

    const {width, height} = background.children[0];

    scene.addChild(background, tank, crate);

    let origin =
        background.children
            .find(({id}) => {
                const {x, y} = id;

                return x === 0 && y === 0;
            });

    Keymap({
        'w': () => {
            tank.forward();

            const dis = {
                x: tank.x - origin.x,
                y: tank.y - origin.y,
            };

            const halfWidth = width / 2;
            const halfHeight = height / 2;

            if (
                Math.abs(dis.x) >= halfWidth ||
                Math.abs(dis.y) >= halfHeight
            ) {
                const tar = {
                    x: Math.trunc(dis.x / halfWidth),
                    y: Math.trunc(dis.y / halfHeight),
                };

                origin =
                    background.children
                        .find(({id}) => {
                            const {x, y} = id;

                            return x === tar.x && y === tar.y;
                        });

                background.children
                    .forEach((child) => {
                        child.id.x -= tar.x;
                        child.id.y -= tar.y;
                    });
            }
        },
        's': () => tank.backward(),
        'a': () => tank.turnLeft(),
        'd': () => tank.turnRight(),
        'space': () => tank.fire(),
    });
}
