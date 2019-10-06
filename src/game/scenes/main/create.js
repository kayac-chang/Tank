import {Wall, Hay, Scene, Tank} from './components';

import {SandArea} from './SandArea';
import {Keymap} from '../../core/Keymap';

import {Container} from 'pixi.js';
import {Random} from 'random-js';

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

export function create() {
    const scene = Scene();

    app.scenes['main'] = scene;

    const blue = Tank('blue');

    blue.transformer.x = 500;
    blue.transformer.y = 500;

    const red = Tank('red');

    red.transformer.x = 750;
    red.transformer.y = 500;

    const green = Tank('green');

    green.transformer.x = 1000;
    green.transformer.y = 500;

    const tanks = [blue, red, green];

    const background = Background();

    const {width, height} = background.children[0];

    let origin =
        background.children
            .find(({id}) => {
                const {x, y} = id;

                return x === 0 && y === 0;
            });

    const objects =
        background.children.flatMap(setObject);

    scene.addChild(background, ...tanks, ...objects);

    let tank = blue;

    scene.follow(tank);

    app.on('Control', (name) => {
        //
        const func = {
            'up': () => {
                tank.forward();
                update();
            },
            'down': () => {
                tank.backward();
                update();
            },
            'left': () => tank.turnLeft(),
            'right': () => tank.turnRight(),
            'A': () => tank.fire(),
            'B': switchTank,
        }[name];

        if (func) func();
    });

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
        'r': switchTank,
    });

    function switchTank() {
        let index = tanks.indexOf(tank) + 1;

        if (index >= tanks.length) index = 0;

        tank = tanks[index];

        scene.follow(tank);
    }

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

                        const objects = setObject(area);

                        scene.addChild(...objects);
                    }
                });
            });
        }
    }

    function setObject(area) {
        const width = 28;
        const height = 15;

        // const MAX_WALL_COUNT = 10;
        // const MAX_HAY_COUNT = 10;

        const floorPlan = table({width, height, fill: 0});

        setWall();
        setHay();

        const objects = [];

        const originX = origin.x;
        const originY = origin.y;

        area.children.forEach((it) => {
            const {x, y} = it.coordinate;

            const object = (
                (floorPlan[y][x] === 1) ? Wall() :
                    (floorPlan[y][x] === 2) ? Hay() :
                        undefined
            );

            if (object) {
                const {x, y} = it.getGlobalPosition();

                object.transformer.set(x + originX, y + originY);

                objects.push(object);
            }
        });

        return objects;

        function setWall() {
            const x = random.integer(0, width - 1);
            const y = random.integer(0, height - 1);

            if (floorPlan[y][x] !== 0) return setWall();

            else floorPlan[y][x] = 1;
        }

        function setHay() {
            const x = random.integer(0, width - 1);
            const y = random.integer(0, height - 1);

            if (floorPlan[y][x] !== 0) return setHay();

            else floorPlan[y][x] = 2;
        }

        function table({width, height, fill}) {
            return Array.from(
                Array(height), () => Array(width).fill(fill)
            );
        }
    }
}


