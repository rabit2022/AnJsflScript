
const { merge } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    name: "Text", // requirejs text 插件
    // entry多个文件时，总是会打包chunk,暂时没有办法解决，只能手动修改webpack.config.js文件
    entry: {"[AnJsflScript]04.运镜✔-04.辅助相机.T":"D:\\project\\沙雕动画\\AnJsflScript\\lib\\04.运镜✔\\04.辅助相机.T.webpack"}
});
    
    