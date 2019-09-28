import LOAD_URL from './assets/sprite_sheets/load.fui';
import LOAD_ATLAS0_URL from './assets/sprite_sheets/load@atlas0.png';

import {addPackage} from 'pixi_fairygui';
import {LoadingBar} from './components/LoadingBar';

import {log} from '@kayac/utils';
import anime from 'animejs';

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

    const loadingText =
        scene.children.filter(({name}) => name.includes('text'));


    anime({
        targets: loadingText,

        alpha: [
            {value: 0.5, duration: 500},
            {value: 1, duration: 500},
        ],

        delay: anime.stagger(120, 'easeInOutSine'),
        loop: true,
        easing: 'easeInOutQuad',
    });

    app.on('loading', ({progress}, {name}) => {
        log(`Progress: ${progress} %`);
        log(`Resource: ${name}`);

        loadingBar.update(progress);

        process.text = `${progress}%`;
    });

    return scene;
}
