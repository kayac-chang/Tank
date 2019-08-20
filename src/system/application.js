import './styles/App.scss';

import {Application} from 'pixi.js';
import EventEmitter from 'eventemitter3';
import {Sound} from './modules/sound';
import {Network} from './modules/network';
import {Resource} from './modules/resource';
import {resize} from './modules/screen';

// import Swal from './plugin/swal';

import {isMobile} from 'pixi.js/lib/core/utils';

const {defineProperties, assign, freeze} = Object;

export function App() {
    const app =
        new Application({
            resolution: devicePixelRatio,
            antialias: true,
            forceCanvas: true,
            powerPreference: isMobile.phone && 'high-performance',
        });

    //  Resource
    const resource = Resource(app);
    //  Sound
    const sound = Sound(app);
    //  Network
    const network = Network();
    //  Alert
    // const alert = Swal(app);

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
