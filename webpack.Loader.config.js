const path = require("path");
const fs = require("fs");

const { merge } = require("webpack-merge");
const common = require("./webpack.config");

// 动态生成入口配置，递归遍历子文件夹
function getEntries(dir) {
    const entries = {};
    const files = fs.readdirSync(dir, { withFileTypes: true }); // 使用 withFileTypes 获取文件类型信息

    files.forEach((file) => {
        const filePath = path.join(dir, file.name); // 获取文件的完整路径
        if (file.isDirectory()) {
            // 如果是目录，递归调用 getEntries
            const subEntries = getEntries(filePath);
            Object.assign(entries, subEntries); // 将子目录中的入口文件合并到 entries 中
        } else if (path.extname(file.name) === ".jsfl") {
            // 如果是 .jsfl 文件，添加到入口配置中
            const name = path.basename(file.name, ".jsfl"); // 去掉扩展名
            entries[name] = filePath; // 使用文件名作为入口名称
        }
    });

    return entries;
}

const libDir = path.resolve(__dirname, "lib");
// const entries = getEntries(libDir);


// 排兵布阵
const entries = {
    "00.跨域剪切": path.resolve(__dirname, "./config/build/00.跨域剪切.webpack")
};

console.log("entries", entries);

module.exports = merge(common, {
    name: "Loader",// 运行其他的脚本的打包配置
    entry: entries,

});
