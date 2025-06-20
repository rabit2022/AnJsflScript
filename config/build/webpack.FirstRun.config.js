const { merge } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    name: "FirstRun", // FirstRun 的 webpack 配置
    entry: {
        // FirstRun.webpack.jsfl
        FirstRun: "./FirstRun.webpack.jsfl"
    },

});
