const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    name:"FirstRun",
    entry: {
        // FirstRun.webpack.jsfl
        FirstRun: "./FirstRun.webpack.jsfl"
    }
    // output: {
    //     path: path.resolve(__dirname, "output"),
    //     filename: "[name].js",
    //     // library: 'Context',
    //     libraryTarget: "umd",
    //     globalObject: "this"
    // },
    // output: {
    //     path: path.resolve(__dirname, "output"),
    //     filename: "[name].js",
    //     library: "__AnJsflScript", // 定义一个全局变量
    //     libraryTarget: "var",
    //     globalObject: "this"
    // },

});
