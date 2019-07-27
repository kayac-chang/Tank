import {symbolConfig} from '../../data';

import {randomInt, wait} from '@kayac/utils';

export async function show(effects, result) {
    app.emit('ShowResult', result);

    const {symbols} = result;

    symbols.forEach((id, index) => {
        const effect = effects[index];

        const name = getSymbolNameBy(id);

        if (name === 'empty') return;

        return (
            (name.includes('wild')) ? wild :
                (name.includes('alien')) ? alien :
                    normal
        )(effect, name);
    });

    await wait(2000);
}

function getSymbolNameBy(icon) {
    return symbolConfig
        .find(({id}) => id === icon)
        .name;
}

function normal(effect, name) {
    const target = effect.getChildByName(name);

    const animation = target.transition['anim'];

    animation.loop = true;

    play(target, animation);
}

function wild(effect, name) {
    const [_name, anim] = name.split('@');

    const target = effect.getChildByName(_name);
    const animation = target.transition[anim];

    target.getChildByName('combo')
        .children
        .forEach((view) => view.visible = false);

    play(target, animation);
}

function alien(effect, name) {
    const target = effect.getChildByName(name);

    const animation = target.transition['anim'];

    const alien = target.getChildByName('alien');

    const expression = alien.transition[randomInt(4)];

    expression.loop = true;
    animation.loop = true;

    expression.restart();

    play(target, animation);

    app.on('SpinStart', () => {
        expression.loop = undefined;
        expression.pause();
    });
}

function play(target, anim) {
    target.visible = true;
    anim.restart();

    app.on('SpinStart', () => {
        target.visible = false;
        anim.loop = undefined;
        anim.pause();
    });
}
