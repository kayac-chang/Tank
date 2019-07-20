import {Howler} from 'howler';

const {values} = Object;

export function Sound({loader}) {
    const soundType = {
        effects: true,
        ambience: true,
    };

    function play(name, rate = 1) {
        const sound = loader.resources[name].data;
        sound.play();

        sound.rate = rate;

        return sound;
    }

    function stop(name) {
        const sound = loader.resources[name].data;
        sound.stop();

        return sound;
    }

    function mute(isMuted, target) {
        if (target) {
            const sound = loader.resources[target].data;
            sound.mute(isMuted);

            return sound;
        }

        if (isMuted === undefined) return Howler._muted;
        return Howler.mute(isMuted);
    }

    //  From 0.0 to 1.0
    function volume(level) {
        return Howler.volume(level);
    }

    function getBy(predicate) {
        return values(loader.resources)
            .filter((res) =>
                res.metadata && res.metadata.type === 'sound')
            .filter(predicate);
    }

    document
        .addEventListener('visibilitychange',
            () => mute(document.hidden));

    return {
        play, mute, volume, getBy, stop,

        get effects() {
            return soundType.effects;
        },
        set effects(flag) {
            getBy(({metadata}) => metadata.subType === 'effects')
                .forEach(({data}) => data.mute(!flag));

            soundType.effects = flag;
        },

        get ambience() {
            return soundType.ambience;
        },
        set ambience(flag) {
            getBy(({metadata}) => metadata.subType === 'ambience')
                .forEach(({data}) => data.mute(!flag));

            soundType.ambience = flag;
        },
    };
}
