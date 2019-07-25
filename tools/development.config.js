//  Imports

//  Exports
module.exports = function(env) {
    return {
        //  Mode    =========================================
        mode: 'development',

        devServer: {
            compress: true,
            port: 8091,
        },

        //  DevTool =========================================
        devtool: 'inline-source-map',
    };
};
