import NORMAL_BGM_MP3 from '../assets/sound/mp3/Normal_BGM.mp3';
import NORMAL_BGM_OGG from '../assets/sound/ogg/Normal_BGM.ogg';
import NORMAL_BGM_WEBM from '../assets/sound/webm/Normal_BGM.webm';

import STOP_MP3 from '../assets/sound/mp3/Stop.mp3';
import STOP_OGG from '../assets/sound/ogg/Stop.ogg';
import STOP_WEBM from '../assets/sound/webm/Stop.webm';

import SHOW_COUNT_BAR_MP3 from '../assets/sound/mp3/Show_Count_Bar.mp3';
import SHOW_COUNT_BAR_OGG from '../assets/sound/ogg/Show_Count_Bar.ogg';
import SHOW_COUNT_BAR_WEBM from '../assets/sound/webm/Show_Count_Bar.webm';

import LARGE_SYMBOL_CONNECT_MP3 from '../assets/sound/mp3/Large_Symbol_Connect.mp3';
import LARGE_SYMBOL_CONNECT_OGG from '../assets/sound/ogg/Large_Symbol_Connect.ogg';
import LARGE_SYMBOL_CONNECT_WEBM from '../assets/sound/webm/Large_Symbol_Connect.webm';

import SCATTER_SYMBOL_CONNECT_MP3 from '../assets/sound/mp3/Scatter_Symbol_Connect.mp3';
import SCATTER_SYMBOL_CONNECT_OGG from '../assets/sound/ogg/Scatter_Symbol_Connect.ogg';
import SCATTER_SYMBOL_CONNECT_WEBM from '../assets/sound/webm/Scatter_Symbol_Connect.webm';

import STICK_MP3 from '../assets/sound/mp3/Wild_Stick.mp3';
import STICK_OGG from '../assets/sound/ogg/Wild_Stick.ogg';
import STICK_WEBM from '../assets/sound/webm/Wild_Stick.webm';

import COUNT_MP3 from '../assets/sound/mp3/Wild_Count.mp3';
import COUNT_OGG from '../assets/sound/ogg/Wild_Count.ogg';
import COUNT_WEBM from '../assets/sound/webm/Wild_Count.webm';

import REPLACEMENT_MP3 from '../assets/sound/mp3/Wild_Replacement.mp3';
import REPLACEMENT_OGG from '../assets/sound/ogg/Wild_Replacement.ogg';
import REPLACEMENT_WEBM from '../assets/sound/webm/Wild_Replacement.webm';

import MAYBE_BONUS_MP3 from '../assets/sound/mp3/MaybeBonus.mp3';
import MAYBE_BONUS_OGG from '../assets/sound/ogg/MaybeBonus.ogg';
import MAYBE_BONUS_WEBM from '../assets/sound/webm/MaybeBonus.webm';

import BIGWIN_MP3 from '../assets/sound/mp3/BigWin.mp3';
import BIGWIN_OGG from '../assets/sound/ogg/BigWin.ogg';
import BIGWIN_WEBM from '../assets/sound/webm/BigWin.webm';

import SHOW_LOGO_MP3 from '../assets/sound/mp3/Show_Logo.mp3';
import SHOW_LOGO_OGG from '../assets/sound/ogg/Show_Logo.ogg';
import SHOW_LOGO_WEBM from '../assets/sound/webm/Show_Logo.webm';

import SHOW_FREE_GAME_MP3 from '../assets/sound/mp3/Show_Free_Game.mp3';
import SHOW_FREE_GAME_OGG from '../assets/sound/ogg/Show_Free_Game.ogg';
import SHOW_FREE_GAME_WEBM from '../assets/sound/webm/Show_Free_Game.webm';

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
        name: 'Stop',
        src: [
            STOP_WEBM,
            STOP_OGG,
            STOP_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Symbol_Connect',
        src: [
            LARGE_SYMBOL_CONNECT_WEBM,
            LARGE_SYMBOL_CONNECT_OGG,
            LARGE_SYMBOL_CONNECT_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Scatter_Connect',
        src: [
            SCATTER_SYMBOL_CONNECT_WEBM,
            SCATTER_SYMBOL_CONNECT_OGG,
            SCATTER_SYMBOL_CONNECT_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Stick',
        src: [
            STICK_WEBM,
            STICK_OGG,
            STICK_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Count',
        src: [
            COUNT_WEBM,
            COUNT_OGG,
            COUNT_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Replace',
        src: [
            REPLACEMENT_WEBM,
            REPLACEMENT_OGG,
            REPLACEMENT_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'MaybeBonus',
        src: [
            MAYBE_BONUS_WEBM,
            MAYBE_BONUS_OGG,
            MAYBE_BONUS_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'BigWin',
        src: [
            BIGWIN_WEBM,
            BIGWIN_OGG,
            BIGWIN_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Show_Logo',
        src: [
            SHOW_LOGO_WEBM,
            SHOW_LOGO_OGG,
            SHOW_LOGO_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Show_Count_Bar',
        src: [
            SHOW_COUNT_BAR_WEBM,
            SHOW_COUNT_BAR_OGG,
            SHOW_COUNT_BAR_MP3,
        ],
    },

    {
        type: 'sound',
        subType: 'effects',
        name: 'Show_Free_Game',
        src: [
            SHOW_FREE_GAME_WEBM,
            SHOW_FREE_GAME_OGG,
            SHOW_FREE_GAME_MP3,
        ],
    },
];
