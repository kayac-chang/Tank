import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {App} from './system/application';

async function main() {
    //  Init App
    try {
        document.title = 'For Every Gamer | 61 Studio';

        global.app = App();

        const main = await import('./game/scenes/main');

        await app.resource.load(main);

        main.create();
        //
    } catch (error) {
        console.error(error);
    }
}

main();
