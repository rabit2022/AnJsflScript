
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

// 删除文件
async function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}: ${err}`);
                reject(err);
            } else {
                console.log(`Deleted file: ${filePath}`);
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


// 添加 不格式化 注释
async function addNoFormatComment(inputFile, outputFile) {
    // @formatter:off
    // prettier-ignore
    // (function(){var m=fl.scriptURI.match(/(?:^|.*[\\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\\/]|$)/)[1];;if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");var i=fl.scriptURI.lastIndexOf(m[0]);var p=fl.scriptURI.substring(0,i+m[0].length);;typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
    // @formatter:on
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

function formatPath(path) {
    // 步骤1：找到 "lib" 的位置
    const libIndex = path.indexOf('lib');
    if (libIndex === -1) {
        throw new Error('路径中未找到 "lib" 部分');
    }

    // 步骤2：提取 "lib" 后的部分
    const libPath = path.substring(libIndex + 4); // 跳过 "lib" 和反斜杠

    // 步骤3：分割为数组
    const parts = libPath.split('\\').filter(Boolean); // 过滤掉空字符串

    // 步骤4：使用 "_" 连接数组
    const connectedString = parts.join('-');

    // 步骤5：添加前缀
    const result = `[AnJsflScript]${connectedString}`;

    return result;
}


/**
 * 获取入口配置
 * {
 *   '[AnJsflScript]00.快捷✔-00.跨域剪切': 'F:\\04_ps\\沙雕动画\\_素材库\\WindowSWF-master\\WindowSWF-master\\AnJsflScript\\lib\\000.跨域剪切'
 * }
 * @param {string} dir 入口目录
 * @returns {object} 入口配置
 */
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
            // const name = path.basename(file.name, ".jsfl"); // 去掉扩展名


            let modulePath = filePath.replace(/.jsfl$/, ""); // 去掉扩展名

            let savePath = formatPath(modulePath); // 组成新的入口名称

            // savePath=savePath.replace("✔️", ""); // 去掉特殊字符
            // modulePath += ".webpack"; // 加上 webpack 配置文件名

            entries[savePath] = modulePath; // 使用文件名作为入口名称
        }
    });

    return entries;
}



function getObjectEntryByIndex(obj, index) {
    const keys = Object.keys(obj);
    if (index >= 0 && index < keys.length) {
        const key = keys[index];
        // return {key: obj[key]};
        var returnObj = {};
        returnObj[key] = obj[key];
        return returnObj;
    }
    return obj; // 如果索引无效，返回整个对象
}

function getObjectLength(obj) {
    const length = Object.keys(obj).length; // 3
    return length;
}

module.exports = {
    runCommand,
    deleteDirectory,
    copyFile,
    compressFile,
    addClosure,
    deleteFile,
    getEntries,
    getObjectEntryByIndex,
    getObjectLength,
}