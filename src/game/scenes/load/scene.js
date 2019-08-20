import LOAD_URL from './assets/sprite_sheets/load.fui';
import LOAD_ATLAS0_URL from './assets/sprite_sheets/load@atlas0.png';

import {addPackage} from 'pixi_fairygui';
import {LoadingBar} from './components/LoadingBar';

import {log} from '@kayac/utils';

export function reserve() {
    return [
        {name: 'load.fui', url: LOAD_URL, xhrType: 'arraybuffer'},
        {name: 'load@atlas0.png', url: LOAD_ATLAS0_URL},
    ];
}

export function create() {
    const create = addPackage(app, 'load');

    const scene = create('LoadScene');

    const loadingBar =
        LoadingBar(scene.getChildByName('loading'));

    const process = scene.getChildByName('process');

    app.on('loading', ({progress}, {name}) => {
        log(`Progress: ${progress} %`);
        log(`Resource: ${name}`);

        loadingBar.update(progress);

        process.text = `${progress}%`;
    });

    return scene;
}
