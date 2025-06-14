const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const Terser = require("terser");

// 执行命令并处理输出
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

// 修改文件内容并重命名
async function processFile(filename) {
    var AllPaths = {
        ".": path.resolve(__dirname),
        "./dist": path.resolve(__dirname, "dist"),
        "./output": path.resolve(__dirname, "output"),
        "filename.js": filename,
        "filename.jsfl": filename.replace(/\.js$/, ".jsfl")
    };

    // 添加依赖于其他属性的路径
    AllPaths["./dist/filename.js"] = path.join(
        AllPaths["./dist"],
        AllPaths["filename.js"]
    );
    AllPaths["./dist/filename.jsfl"] = path.join(
        AllPaths["./dist"],
        AllPaths["filename.jsfl"]
    );
    AllPaths["./dist/filename.min.jsfl"] = path.join(
        AllPaths["./dist"],
        AllPaths["filename.jsfl"].replace(/\.jsfl$/, ".min.jsfl")
    );
    AllPaths["./filename.jsfl"] = path.join(AllPaths["."], AllPaths["filename.jsfl"]);

    console.log(`Processing file: ${filename}`);

    // 添加闭包
    console.log(`Adding closure to file: ${AllPaths["./dist/filename.jsfl"]}`);
    await addClosure(AllPaths["./dist/filename.js"], AllPaths["./dist/filename.jsfl"]);

    // // 复制文件到根目录
    // console.log(`Copying file to current directory: ${filename}`);
    // await copyFileToCurrentDirectory(AllPaths["./dist/filename.jsfl"], AllPaths["./filename.jsfl"]);

    // 压缩文件
    console.log(`Compressing file: ${AllPaths["./dist/filename.jsfl"]}`);
    await compressFile(
        AllPaths["./dist/filename.jsfl"],
        AllPaths["./dist/filename.min.jsfl"]
    );
}

// 构建项目
async function buildProject() {
    try {
        //    "build": "webpack && babel output --out-dir dist && rmdir /s /q output"

        // 打包
        console.log("Running Webpack...");
        await runCommand("npx webpack");

        // 转换ES5
        console.log("Running Babel...");
        await runCommand("npx babel output --out-dir dist");

        const outputDir = path.resolve(__dirname, "output");
        const distDir = path.resolve(__dirname, "dist");

        // // 清空输出目录 output
        // if (fs.existsSync(outputDir)) {
        //     console.log('Deleting output directory...');
        //     await deleteDirectory(outputDir);
        // } else {
        //     console.log('Output directory does not exist, skipping deletion.');
        // }

        // 获取dist目录下所有文件
        const distFiles = fs.readdirSync(distDir).filter((file) => file.endsWith(".js"));

        // 处理每个文件
        for (const filename of distFiles) {
            await processFile(filename);
        }

        console.log("Build process completed successfully.");
    } catch (error) {
        console.error("Build process failed:", error);
    }
}

// buildProject();
// 带性能监控的执行
(async () => {
    const start = Date.now();
    try {
        const report = await buildProject();
        console.log(`构建成功，耗时 ${(Date.now() - start) / 1000}秒`);
        // console.log(report);
    } catch (error) {
        console.error(`构建失败，已运行 ${(Date.now() - start) / 1000}秒`);
        throw error;
    }
})();
