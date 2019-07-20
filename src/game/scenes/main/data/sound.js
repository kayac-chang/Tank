import NORMAL_BGM_MP3 from '../assets/sound/mp3/Normal_BGM.mp3';
import NORMAL_BGM_OGG from '../assets/sound/ogg/Normal_BGM.ogg';
import NORMAL_BGM_WEBM from '../assets/sound/webm/Normal_BGM.webm';

import SPIN_STOP_1_MP3 from '../assets/sound/mp3/SpinStop1.mp3';
import SPIN_STOP_1_OGG from '../assets/sound/ogg/SpinStop1.ogg';
import SPIN_STOP_1_WEBM from '../assets/sound/webm/SpinStop1.webm';

import SPIN_STOP_2_MP3 from '../assets/sound/mp3/SpinStop2.mp3';
import SPIN_STOP_2_OGG from '../assets/sound/ogg/SpinStop2.ogg';
import SPIN_STOP_2_WEBM from '../assets/sound/webm/SpinStop2.webm';

import NORMAL_CONNECT_MP3 from '../assets/sound/mp3/Normal_Connect.mp3';
import NORMAL_CONNECT_OGG from '../assets/sound/ogg/Normal_Connect.ogg';
import NORMAL_CONNECT_WEBM from '../assets/sound/webm/Normal_Connect.webm';

import WILD_CONNECT_MP3 from '../assets/sound/mp3/Wild_Connect.mp3';
import WILD_CONNECT_OGG from '../assets/sound/ogg/Wild_Connect.ogg';
import WILD_CONNECT_WEBM from '../assets/sound/webm/Wild_Connect.webm';

import WILD_JACKPOT_MP3 from '../assets/sound/mp3/Wild_Jackpot_Connect.mp3';
import WILD_JACKPOT_OGG from '../assets/sound/ogg/Wild_Jackpot_Connect.ogg';
import WILD_JACKPOT_WEBM from '../assets/sound/webm/Wild_Jackpot_Connect.webm';

import ALIEN_FLY_MP3 from '../assets/sound/mp3/Alien_Fly.mp3';
import ALIEN_FLY_OGG from '../assets/sound/ogg/Alien_Fly.ogg';
import ALIEN_FLY_WEBM from '../assets/sound/webm/Alien_Fly.webm';

import MAYBE_BONUS_MP3 from '../assets/sound/mp3/MaybeBonus.mp3';
import MAYBE_BONUS_OGG from '../assets/sound/ogg/MaybeBonus.ogg';
import MAYBE_BONUS_WEBM from '../assets/sound/webm/MaybeBonus.webm';

import ELECTRON_MP3 from '../assets/sound/mp3/Electron.mp3';
import ELECTRON_OGG from '../assets/sound/ogg/Electron.ogg';
import ELECTRON_WEBM from '../assets/sound/webm/Electron.webm';

import BIGWIN_MP3 from '../assets/sound/mp3/BigWin.mp3';
import BIGWIN_OGG from '../assets/sound/ogg/BigWin.ogg';
import BIGWIN_WEBM from '../assets/sound/webm/BigWin.webm';

import ATTRACTION_MP3 from '../assets/sound/mp3/Attraction.mp3';
import ATTRACTION_OGG from '../assets/sound/ogg/Attraction.ogg';
import ATTRACTION_WEBM from '../assets/sound/webm/Attraction.webm';

export const sounds = [
    {
        type: 'sound',
        subType: 'ambience',
        name: 'Normal_BGM',
        loop: true,
        src: [
            NORMAL_BGM_WEBM,
            NORMAL_BGM_OGG,
            NORMAL_BGM_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Reel_Stop_1',
        src: [
            SPIN_STOP_1_WEBM,
            SPIN_STOP_1_OGG,
            SPIN_STOP_1_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Reel_Stop_2',
        src: [
            SPIN_STOP_2_WEBM,
            SPIN_STOP_2_OGG,
            SPIN_STOP_2_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Normal_Connect',
        src: [
            NORMAL_CONNECT_WEBM,
            NORMAL_CONNECT_OGG,
            NORMAL_CONNECT_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Wild_Connect',
        src: [
            WILD_CONNECT_WEBM,
            WILD_CONNECT_OGG,
            WILD_CONNECT_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Jackpot_Connect',
        src: [
            WILD_JACKPOT_WEBM,
            WILD_JACKPOT_OGG,
            WILD_JACKPOT_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Maybe_Bonus',
        src: [
            MAYBE_BONUS_WEBM,
            MAYBE_BONUS_OGG,
            MAYBE_BONUS_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Electron',
        src: [
            ELECTRON_WEBM,
            ELECTRON_OGG,
            ELECTRON_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Attraction',
        src: [
            ATTRACTION_WEBM,
            ATTRACTION_OGG,
            ATTRACTION_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Alien_Fly',
        src: [
            ALIEN_FLY_WEBM,
            ALIEN_FLY_OGG,
            ALIEN_FLY_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Big_Win',
        src: [
            BIGWIN_WEBM,
            BIGWIN_OGG,
            BIGWIN_MP3,
        ],
    },
];
