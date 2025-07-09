const fs = require("fs");
const path = require("path");

var dirname = path.resolve(__dirname, "../../");

// 指定要处理的根目录
const rootDirs = [path.resolve(dirname, "./test/"), path.resolve(dirname, "./lib/")]; // 你可以根据需要修改这个路径

// 递归函数，用于遍历目录并重命名文件
function renameFilesRecursively(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // 如果是目录，递归处理
            renameFilesRecursively(filePath);
        } else if (stats.isFile() && file.endsWith(".js")) {
            // 指定文件夹
            // if (!file.includes("test") &&!file.includes("lib") ) return;

            // 如果是 .ts 文件，重命名为 .jsfl 文件
            const newFilePath = filePath.replace(/\.js$/, ".jsfl");
            fs.renameSync(filePath, newFilePath);
            console.log(`Renamed ${filePath} to ${newFilePath}`);

            // 读取文件内容，define开头的话 把开头的define更改为 require
            const content = fs.readFileSync(newFilePath, "utf8");
            const newContent = content
                .replace(/^define/, "require")
                .replace(`"exports"`, `"_exports"`);
            fs.writeFileSync(newFilePath, newContent, "utf8");
            console.log(`Updated ${newFilePath}`);
        }
    });
}

// // 调用递归函数，从根目录开始
// renameFilesRecursively(rootDir);
rootDirs.forEach((dir) => {
    console.log(`Processing ${dir}...`);
    renameFilesRecursively(dir);
});
