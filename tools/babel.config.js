//  Imports

//  Exports
module.exports = function (api) {
    //  Cache   =====================================
    api.cache(() => process.env.NODE_ENV === 'production');

    //  Presets =====================================
    const env = ['@babel/preset-env'];

    const flow = ['@babel/preset-flow'];

    //  Plugins =====================================
    const dynamicImport = '@babel/plugin-syntax-dynamic-import';
    const proposalClassProperties = '@babel/plugin-proposal-class-properties';
    const transformFlowStripTypes = 'transform-flow-strip-types';

    //  Return =====================================
    const presets = [env, flow];
    const plugins = [
        dynamicImport,
        transformFlowStripTypes,
        proposalClassProperties,
    ];
    return {presets, plugins};
};
