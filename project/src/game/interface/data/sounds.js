import SPIN_WEBM from '../assets/sounds/webm/Click.webm';
import SPIN_OGG from '../assets/sounds/ogg/Click.ogg';
import SPIN_MP3 from '../assets/sounds/mp3/Click.mp3';

import MENU_WEBM from '../assets/sounds/webm/menu01.webm';
import MENU_OGG from '../assets/sounds/ogg/menu01.ogg';
import MENU_MP3 from '../assets/sounds/mp3/menu01.mp3';

import CLICK_WEBM from '../assets/sounds/webm/hard01.webm';
import CLICK_OGG from '../assets/sounds/ogg/hard01.ogg';
import CLICK_MP3 from '../assets/sounds/mp3/hard01.mp3';

import CANCEL_WEBM from '../assets/sounds/webm/cancel01.webm';
import CANCEL_OGG from '../assets/sounds/ogg/cancel01.ogg';
import CANCEL_MP3 from '../assets/sounds/mp3/cancel01.mp3';

export const sounds = [
    {
        type: 'sound',
        subType: 'effects',
        name: 'spin',
        src: [
            SPIN_WEBM,
            SPIN_OGG,
            SPIN_MP3,
        ],
    },
    {
        type: 'sound',
        subType: 'effects',
        name: 'option',
        src: [
            MENU_WEBM,
            MENU_OGG,
            MENU_MP3,
        ],
    },
    {
        type: 'sound',
        subType: 'effects',
        name: 'click',
        src: [
            CLICK_WEBM,
            CLICK_OGG,
            CLICK_MP3,
        ],
    },
    {

        type: 'sound',
        subType: 'effects',
        name: 'cancel',
        src: [
            CANCEL_WEBM,
            CANCEL_OGG,
            CANCEL_MP3,
        ],
    },
];
