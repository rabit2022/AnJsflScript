const path = require("path");
const fs = require("fs");

const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const { getEntries } = require("./config/build/utils");

const libDir = path.resolve(__dirname, "lib");
// const entries = getEntries(libDir);

// F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\config\build\00.跨域剪切.webpack.jsfl
// F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib\00.快捷✔️\00.跨域剪切.jsfl

const entries = {
    // "00.跨域剪切": path.resolve(__dirname, "./config/build/00.跨域剪切.webpack")
    "00.跨域剪切": path.resolve(__dirname, "./lib/00.快捷✔️/00.跨域剪切")
};
// 遍历 entries 对象，为每个值末尾添加 .webpack
Object.entries(entries).forEach(([key, value]) => {
    entries[key] = value + '.webpack';
});

console.log("entries", entries);

module.exports = merge(common, {
    name: "Common", // 普通的脚本文件配置
    entry: entries
});
