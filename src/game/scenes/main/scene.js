import {Sprite} from 'pixi.js';
import hotkeys from 'hotkeys-js';

export function create() {
    const {textures} = app.resource.get('tanks');

    const sp = new Sprite(textures['tank_blue.png']);

    sp.position.set(500, 500);

    app.stage.addChild(sp);

    hotkeys('*', function ({key}) {
        if (key === 'w') {
            sp.position.y -= 1;
        }
    });
}
