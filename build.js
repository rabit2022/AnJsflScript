const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

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

// 示例：复制文件到当前文件夹
async function copyFileToCurrentDirectory(sourcePath, targetPath) {
    try {
        await copyFile(sourcePath, targetPath);
        console.log(`File copied to current directory: ${filename}`);
    } catch (error) {
        console.error(`Failed to copy file: ${error}`);
    }
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
    AllPaths["./filename.jsfl"] = path.join(AllPaths["."], AllPaths["filename.jsfl"]);

    console.log(`Processing file: ${filename}`);
    console.log(`Reading file: ${AllPaths["./dist/filename.js"]}`);

    // 读取源文件
    const content = fs.readFileSync(AllPaths["./dist/filename.js"], "utf-8");
    const newContent = `(function(){\n${content}\n})();`;

    // 写入新文件
    console.log(`Writing file: ${AllPaths["./dist/filename.jsfl"]}`);
    fs.writeFileSync(AllPaths["./dist/filename.jsfl"], newContent, "utf-8");

    // 删除源文件
    await fs.unlink(AllPaths["./dist/filename.js"], (err) => {
        if (err) throw err;
        console.log("File deleted successfully :", AllPaths["./dist/filename.js"]);
    });

    console.log(
        `File processed and renamed: ${filename} -> ${AllPaths["./dist/filename.jsfl"]}`
    );

    // // 复制文件到根目录
    // console.log(`Copying file to current directory: ${filename}`);
    // await copyFileToCurrentDirectory(AllPaths["./dist/filename.jsfl"], AllPaths["./filename.jsfl"]);
}

// 构建项目
async function buildProject() {
    try {
        //    "build": "webpack && babel output --out-dir dist && rmdir /s /q output"

        // 打包
        console.log("Running Webpack...");
        await runCommand("npx webpack");

        // // 在webpack.config.js顶部添加
        // if (!fs.existsSync('dist')) {
        //     fs.mkdirSync('dist');
        // }
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
            // console.log(`Processing file: ${filename}`);
        }

        console.log("Build process completed successfully.");
    } catch (error) {
        console.error("Build process failed:", error);
    }
}

buildProject();
