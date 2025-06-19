const fs = require("fs");
const path = require("path");

const {
    runCommand,
    deleteDirectory,
    copyFile,
    compressFile,
    addClosure,
    deleteFile
} = require("./config/build/utils");

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

    // 删除源文件
    console.log(`Deleting source file: ${AllPaths["./dist/filename.jsfl"]}`);
    await deleteFile(AllPaths["./dist/filename.jsfl"]);
}

// 构建项目
async function buildProject() {
    try {
        //    "build": "webpack && babel output --out-dir dist && rmdir /s /q output"

        // 打包
        console.log("Running Webpack...");
        await runCommand("npx webpack --config webpack.FirstRun.config.js");

        // 转换ES5
        console.log("Running Babel...");
        await runCommand("npx babel output --out-dir dist");

        const outputDir = path.resolve(__dirname, "output");
        const distDir = path.resolve(__dirname, "dist");

        // 清空输出目录 output
        if (fs.existsSync(outputDir)) {
            console.log("Deleting output directory...");
            await deleteDirectory(outputDir);
        } else {
            console.log("Output directory does not exist, skipping deletion.");
        }

        // 获取dist目录下所有文件
        const distFiles = fs
            .readdirSync(distDir)
            .filter((file) => file.endsWith("FirstRun.js"));

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
