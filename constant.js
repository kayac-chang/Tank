/*
 *   **Important**
 *      This file made for path Redirecting.
 */

//  Imports
const {resolve} = require('path');

//  Root Path
const rootPath = __dirname;

//  Project Element Path
const sourceDir = resolve(rootPath, 'src');
const baseDir = resolve(rootPath, 'base');
const toolDir = resolve(rootPath, 'tools');
const productDir = resolve(rootPath, 'dist');

//  Public Path
const publicPath = '';

module.exports = {
    sourceDir,
    baseDir,
    toolDir,
    productDir,
    publicPath,
};
