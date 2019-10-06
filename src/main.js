import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {App} from './system/application';

async function main() {
    //  Init App
    try {
        document.title = 'For Every Gamer | 61 Studio';

        global.app = App();

        const [main, control] = await Promise.all([
            import('./game/scenes/main'),
            import('./game/control'),
        ]);

        await app.resource.load(main, control);

        main.create();
        control.create();

        app.resize();
        //
    } catch (error) {
        console.error(error);
    }
}

main();
