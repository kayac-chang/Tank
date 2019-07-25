import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {select} from '@kayac/utils';

import {App} from './system/application';
import {enableFullScreenMask} from './system/modules/screen';

const key = process.env.KEY;

async function main() {
    //  Init App
    try {
        document.title = 'For Every Gamer | 61 Studio';

        global.app = App();

        const comp = select('#app');
        const svg = select('#preload');
        svg.remove();

        comp.prepend(app.view);

        enableFullScreenMask();

        //  Import Main Scene
        const [MainScene] =
            await Promise.all([
                import('./game/scenes/main'),
            ]);

        await app.resource.load(MainScene);

        const scene = MainScene.create();

        app.stage.addChildAt(scene, 0);

        select('script').forEach((el) => el.remove());

        app.resize();

        app.emit('Idle');
        //
    } catch (error) {
        console.error(error);
        //
        // const msg = {title: error.message};
        //
        // app.alert.error(msg);
    }
}

main();
