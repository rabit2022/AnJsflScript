const path = require('path');
module.exports = {
    entry: './FolderTraverser.js', output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'FolderTraverser.js',
        library: 'FolderTraverser',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    mode: 'development',
    devtool: 'source-map',
    externals: [
        "os"
    ], // 外部依赖排除
    // 其他配置...
    resolve: {
        fallback: {
            path: false,
            fs: false, // 如果你不需要 polyfill `fs`，可以设置为 `false`
        },
    },
};