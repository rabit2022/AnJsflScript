const { merge } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    name: "FirstRun",
    entry: {
        // FirstRun.webpack.jsfl
        FirstRun: "./config/build/FirstRun.webpack.jsfl"
    }

});
