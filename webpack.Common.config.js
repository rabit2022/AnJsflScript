const path = require("path");
const fs = require("fs");

const { merge } = require("webpack-merge");
const common = require("./webpack.config");

const { getEntries }=require("./config/build/utils");



function keepFirstKeyValuePair(obj) {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        return obj; // 如果对象为空，直接返回
    }
    const firstKey = keys[0];
    const firstKeyValue = obj[firstKey];

    // 创建一个新对象，只包含第一个键值对
    const result = {};
    result[firstKey] = firstKeyValue;

    return result;
}

const libDir = path.resolve(__dirname, "lib");
let entries = getEntries(libDir);

// 把value添加.webpack后缀
for (const [key, value] of Object.entries(entries)) {
    entries[key] = `${value}.webpack`;
}

entries = keepFirstKeyValuePair(entries); // 只保留第一个入口文件
console.log("entries", entries);

// 检查路径是否存在
function checkPathExists(entryConfig) {
    const entries = {};
    for (const [key, value] of Object.entries(entryConfig)) {
        const resolvedPath = path.resolve(value); // 解析为绝对路径
        if (fs.existsSync(resolvedPath)) {
            // 如果路径存在，添加到新的入口配置中
            entries[key] = resolvedPath;
        } else {
            console.error(`路径不存在: ${resolvedPath}`);
        }
    }
    return entries;
}

// // 检查并更新入口配置
// const updatedEntryConfig = checkPathExists(entries);
//
// console.log('更新后的入口配置:', updatedEntryConfig);

// F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib\00.快捷✔️\00.跨域剪切.webpack.jsfl
// F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript\lib\00.快捷✔️\00.跨域剪切.webpack.webpack.jsfl


module.exports = merge(common, {
    name: "Common", // 普通的脚本文件配置
    entry: entries,
});
