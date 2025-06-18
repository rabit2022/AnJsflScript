
const { merge } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    name: "Common", // 普通的脚本文件配置
    // entry多个文件时，总是会打包chunk,暂时没有办法解决，只能手动修改webpack.config.js文件
    entry: {"[AnJsflScript]04.辅助相机.Text":"D:\\project\\沙雕动画\\AnJsflScript\\lib\\04.辅助相机.Text.webpack"}
});
    