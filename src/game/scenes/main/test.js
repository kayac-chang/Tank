import {Crate, Scene, Tank} from './components';

import {SandArea} from './SandArea';
import {Keymap} from '../../core/Keymap';

import {Container} from 'pixi.js';
import {Random} from 'random-js';
import {times} from 'ramda';

const random = new Random();

const table = [
    [[-1, -1], [0, -1], [1, -1]],
    [[-1, 0], [0, 0], [1, 0]],
    [[-1, 1], [0, 1], [1, 1]],
];


function Background() {
    const it = new Container();

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

function setObject(area) {
    const width = 28;
    const height = 15;

    const floorPlan = times(() => times(() => 0, width), height);

    const x = random.integer(0, width - 1);
    const y = random.integer(0, height - 1);

    floorPlan[y][x] = 1;

    const result = [];

    area.children.forEach((it) => {
        const {x, y} = it.coordinate;

        if (floorPlan[y][x] === 1) {
            const crate = Crate();

            const {x, y} = it.getGlobalPosition();

            crate.transformer.set(x, y);

            result.push(crate);
        }
    });

    return result;
}

export function create() {
    const scene = Scene();

    app.scenes['main'] = scene;

    const tank = Tank();

    tank.transformer.x = 500;
    tank.transformer.y = 500;

    scene.follow(tank);

    const background = Background();

    const objects =
        background.children.flatMap(setObject);

    scene.addChild(background, tank, ...objects);

    Keymap({
        'w': () => {
            tank.forward();
            update();
        },
        's': () => {
            tank.backward();
            update();
        },
        'a': () => tank.turnLeft(),
        'd': () => tank.turnRight(),
        'space': () => tank.fire(),
    });

    const {width, height} = background.children[0];

    let origin =
        background.children
            .find(({id}) => {
                const {x, y} = id;

                return x === 0 && y === 0;
            });

    function update() {
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

            table.forEach((row) => {
                //
                row.forEach(([x, y]) => {
                    //
                    const tar =
                        background.children.find(({id}) => {
                            return x === id.x && y === id.y;
                        });

                    if (!tar) {
                        const area = SandArea();

                        area.id = {x, y};

                        area.x = area.width * x + origin.x;
                        area.y = area.height * y + origin.y;
                        area.pivot.set(area.width / 2, area.height / 2);

                        background.addChild(area);
                    }
                });
            });
        }
    }
}
