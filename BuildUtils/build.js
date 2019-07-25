//  Imports
const {table, log} = console;
const {mergeRight} = require('ramda');
const {createHash} = require('crypto');

function randomString(length) {
    return [...Array(length)]
        .map(() => (~~(Math.random() * 36)).toString(36))
        .join('');
}

//  Exports
module.exports = function(env) {
    log('======Please Check Out Current Environment=========');
    table({
        'Node': process.env.NODE_ENV,
        'Webpack': env.mode,
    });

    env.KEY = createHash('sha256')
        .update(randomString(10))
        .digest('hex');

    log(env);
    log('===================================================');

    const commonConfig = require(`./common.config.js`)(env);

    const environmentConfig = require(`./${env.mode}.config.js`)(env);

    return mergeRight(commonConfig, environmentConfig);
};

