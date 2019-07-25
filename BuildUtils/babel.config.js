//  Imports

//  Exports
module.exports = function(api) {
    //  Cache   =====================================
    api.cache(() => process.env.NODE_ENV === 'production');

    //  Presets =====================================
    const env = [
        '@babel/env',
        {
            targets: {
                edge: '17',
                firefox: '60',
                chrome: '63',
                safari: '11.1',
            },
            useBuiltIns: 'usage',
        },
    ];

    const flow = ['@babel/preset-flow'];

    //  Plugins =====================================
    const dynamicImport = '@babel/plugin-syntax-dynamic-import';
    const transformFlowStripTypes = 'transform-flow-strip-types';

    //  Return =====================================
    const presets = [env, flow];
    const plugins = [
        dynamicImport,
        transformFlowStripTypes,
    ];
    return {presets, plugins};
};
