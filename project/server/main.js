//  Args
const {PORT = 3000, mode = 'development'} =
            require('minimist')(process.argv.slice(2));

//  Constant
const {mapObjIndexed, call} = require('ramda');
const {getPublicPath: publicPath, getToolDir: toolDir} =
                        mapObjIndexed(call)(require('../constant'));

//  Imports
const express = require('express');
const middleware = require('webpack-dev-middleware');

//  Webpack Compiler
const {resolve} = require('path');
const compiler =
    require('webpack')(require(resolve(toolDir, 'build.js'))({mode}));

//  Start Server
const main = express();

main.use(
    middleware(compiler, {publicPath}));

main.listen(PORT, function() {
  console.log(`Server start listening on port ${PORT}!`);
});
