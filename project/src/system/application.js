import './styles/App.scss';

import {Application} from 'pixi.js';
import EventEmitter from 'eventemitter3';
import {Sound} from './modules/sound';
import {Network} from './modules/network';
import {Resource} from './modules/resource';
import {resize} from './modules/screen';

import Swal from './plugin/swal';
import i18n from './plugin/i18n';

const {defineProperties, assign, freeze} = Object;

export async function App() {
    const app =
        new Application({
            resolution: devicePixelRatio,
            antialias: true,
        });

    //  Resource
    const resource = Resource(app);
    //  Sound
    const sound = Sound(app);
    //  Network
    const network = Network();
    //  Translate
    const translate = await i18n.init();
    //  Alert
    const alert = Swal(translate);

    //  Service
    let service = undefined;
    //  User
    let user = undefined;
    //  Control
    let control = undefined;

    //  Modules
    defineProperties(app, {
        resource: {
            get: () => resource,
        },
        sound: {
            get: () => sound,
        },
        network: {
            get: () => network,
        },
        alert: {
            get: () => alert,
        },
        service: {
            get: () => service,
            set: (newService) => service = newService,
        },
        user: {
            get: () => user,
            set: (newUser) => user = newUser,
        },
        control: {
            get: () => control,
            set: (newControl) => control = newControl,
        },
        translate: {
            get: () => translate,
        },
    });

    //  EventCore
    const eventCore = new EventEmitter();

    //  Functions
    assign(app, {
        //  EventEmitter ==================
        on(event, listener) {
            eventCore.on(event, listener);
        },
        once(event, listener) {
            eventCore.once(event, listener);
        },
        off(event, listener) {
            eventCore.off(event, listener);
        },
        emit(event, ...args) {
            eventCore.emit(event, ...args);
        },
        //  Screen Management ==================
        resize() {
            resize(app);
            app.emit('resize');
        },
    });

    //  Event Binding
    global.addEventListener('resize', app.resize);
    global.addEventListener('orientationchange', app.resize);

    return freeze(app);
}
