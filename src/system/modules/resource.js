import {loaders} from 'pixi.js';

import {Howl} from 'howler';

import {load as loadFont} from 'webfontloader';

export function Resource({loader}) {
    loader
    //  For Sound Loading
        .pre(SoundHandler)
        //  For Font Loading
        .pre(WebFontLoader);

    //  For Loading Progress
    loader.on('progress', (...args) => {
        app.emit('loading', ...args);
    });

    return {get, load, fetch, reset};

    function get(name) {
        return loader.resources[name];
    }

    function fetch(...tasks) {
        const _tasks =
            tasks.filter((name) => !loader.resources[name]);

        loader.add(_tasks);

        return new Promise((resolve) => {
            if (_tasks.length === 0) {
                const results =
                    tasks.map((task) => {
                        return loader.resources[task];
                    });

                return resolve(results);
            }

            loader.load((loader, resources) => {
                const results =
                    tasks.map((task) => {
                        return resources[task];
                    });

                resolve(results);
            });
        });
    }

    function load(...scenes) {
        scenes
            .map(({reserve}) => reserve())
            .forEach((tasks) => {
                const soundTasks =
                    tasks
                        .filter(({type}) => type === 'sound')
                        .map((res) => {
                            const task = new loaders.Resource(
                                res.name, '', {
                                    loadType: loaders.Resource.LOAD_TYPE.AUDIO,
                                });

                            task.metadata = res;

                            return task;
                        });

                const normals =
                    tasks.filter(({type}) => type !== 'sound');

                return loader.add([...normals, ...soundTasks]);
            });

        return new Promise((resolve) => loader.load(resolve));
    }

    function reset() {
        loader.reset();
    }

    function SoundHandler(resource, next) {
        if (check(resource)) return next();

        const {LOADING} = loaders.Resource.STATUS_FLAGS;
        resource._setFlag(LOADING, true);

        const task = resource.metadata;

        resource.data = new Howl({
            ...task,
            onload,
            onloaderror,
        });

        function check(resource) {
            return (
                !resource ||
                resource.loadType !== loaders.Resource.LOAD_TYPE.AUDIO
            );
        }

        function onload() {
            resource.complete();

            next();
        }

        function onloaderror(id, message) {
            console.error(resource);
            resource.abort(message);
            next();
        }
    }
}


function WebFontLoader(resource, next) {
    if (check()) return next();

    loadFont({
        ...(resource.metadata),
        active,
        inactive,
    });

    function check() {
        return (
            !resource || resource.name !== 'font'
        );
    }

    function active() {
        resource.complete();
        next();
    }

    function inactive() {
        console.error(resource);
        resource.abort(message);
        next();
    }
}

