
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const Terser = require("terser");


async function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                console.error(`Error code: ${error.code}`);
                console.error(`Error signal: ${error.signal}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            resolve(stdout);
        });
    });
}

// 删除目录
async function deleteDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.rmdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Error deleting directory ${dirPath}: ${err}`);
                reject(err);
            } else {
                console.log(`Deleted directory: ${dirPath}`);
                resolve();
            }
        });
    });
}

// 复制文件到当前目录
async function copyFile(sourcePath, targetPath) {
    return new Promise((resolve, reject) => {
        fs.copyFile(sourcePath, targetPath, (err) => {
            if (err) {
                console.error(`Error copying file: ${err}`);
                reject(err);
            } else {
                console.log(`File copied to: ${targetPath}`);
                resolve();
            }
        });
    });
}

// 压缩文件
async function compressFile(inputFile, outputFile) {
    // 创建outputFile
    // 确保目录存在
    if (!fs.existsSync(path.dirname(outputFile))) {
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    }

    const code = fs.readFileSync(inputFile, "utf8");

    // // 替换八进制转义序列
    // const replacedOctal = code.replace(/\\([0-7]{1,3})/g, (match, octal) => {
    //     const code = parseInt(octal, 8);
    //     return `\\u${code.toString(16).padStart(4, '0')}`;
    // });
    //
    // // 替换汉字为 \\ 开头的字符串
    // const replacedContent = replacedOctal.replace(/[\u4e00-\u9fa5]/g, (match) => {
    //     return `\\${match.charCodeAt(0).toString(16)}`;
    // });

    // 使用 Terser 压缩代码
    Terser.minify(code, {
        compress: {
            drop_console: true // 删除 console.log
        },
        mangle: true,
        format: {
            comments: false // 删除注释
        }
    })
        .then((result) => {
            fs.writeFile(outputFile, result.code, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return;
                }
                console.log("Compression and replacement complete.");
            });
        })
        .catch((error) => {
            console.error("Error compressing file:", error);
        });
}

// 添加闭包
async function addClosure(inputFile, outputFile) {
    // 读取源文件
    console.log(`Reading file: ${inputFile}`);
    const content = fs.readFileSync(inputFile, "utf-8");

    // 添加闭包
    const newContent = `(function(){\n${content}\n})();`;

    // 写入新文件
    console.log(`Writing file: ${outputFile}`);
    fs.writeFileSync(outputFile, newContent, "utf-8");

    // 删除源文件
    await fs.unlink(inputFile, (err) => {
        if (err) throw err;
        console.log("File deleted successfully :", inputFile);
    });

    console.log(`File processed and renamed: ${inputFile} -> ${outputFile}`);
}

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
            const modulePath = filePath.replace(/.jsfl$/, ""); // 去掉扩展名

            entries[name] = modulePath; // 使用文件名作为入口名称
        }
    });

    return entries;
}


module.exports = {
    runCommand,
    deleteDirectory,
    copyFile,
    compressFile,
    addClosure,
    getEntries,
}