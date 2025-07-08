const {merge} = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    name: "Text", // requirejs text 插件
    entry: {"XUL": "../src/XUL.webpack"}
});
    
    