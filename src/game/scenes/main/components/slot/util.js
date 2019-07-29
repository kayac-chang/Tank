export function id({name}) {
    return Number(name.split('@')[1]);
}

export function isReel({name}) {
    return name.includes('reel');
}

export function isSymbol({name}) {
    return name.includes('symbol');
}

export function isResult({name}) {
    return name.includes('show.js');
}

export function TextureManager(symbolConfig) {
    let config = undefined;

    return {get};

    function mapping() {
        const {textures} = app.resource.get('symbols');

        if (!config) {
            config =
                symbolConfig.map(({id, texture}) =>
                    ({id, texture: textures[texture]}));
        }

        return config;
    }

    function get(iconId) {
        return mapping()
            .find(({id}) => id === iconId)
            .texture;
    }
}


