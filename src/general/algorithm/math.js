import {pi} from 'mathjs/number';


import {
    create,
    absDependencies,
    log10Dependencies,
    ceilDependencies,
    signDependencies,
    divideDependencies,
    roundDependencies,
    multiplyDependencies,
    modDependencies,
    floorDependencies,
    randomIntDependencies,
    randomDependencies,
} from 'mathjs';

const config = {};

const {
    abs, log10, ceil, sign,
    divide, round, multiply,
    mod, floor, randomInt,
    random,
} = create({
    absDependencies,
    log10Dependencies,
    ceilDependencies,
    signDependencies,
    divideDependencies,
    roundDependencies,
    multiplyDependencies,
    modDependencies,
    floorDependencies,
    randomIntDependencies,
    randomDependencies,
}, config);

export {
    pi,
    abs, log10, ceil, sign,
    divide, round, multiply,
    mod, floor, randomInt,
    random,
};


export function mRound(number, multiple) {
    const n1 = round(divide(number, multiple));
    return multiply(n1, multiple);
}
