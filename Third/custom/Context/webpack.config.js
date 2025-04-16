const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'Context.js',
        library: 'Context',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    mode: 'development',
    devtool: 'source-map'
};