const path = require('path');
module.exports = {
    entry: './src/fxp.js', output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'fast-xml-parser.js',
        library: 'fast-xml-parser',
        libraryTarget: 'umd',
        globalObject: 'this'
    }, mode: 'development', devtool: 'source-map'
};