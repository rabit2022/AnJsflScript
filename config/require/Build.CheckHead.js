const fs = require("fs");
const path = require("path");
// const CommonConfig = require("./webpack.Common.config");
const {
    runCommand,
    deleteDirectory,
    copyFile,
    deleteFile,
    compressFile,
    addClosure
} = require("../build/utils");

const config={
    entry: path.resolve(__dirname, "./CheckHead.jsfl"),
    output: {
        path: __dirname,
        filename: "./CheckHead.zip.jsfl",
    }
}

console.log(config);


// 构建项目
async function buildProject() {
    try {
        await compressFile(
            config.entry,
            path.join(config.output.path, config.output.filename)
        );




        // // 准备构建
        // console.log("Preparing build...");
        // await prepareBuild();
        //
        //
        // // 打包
        // console.log("Running Webpack...");
        // await runCommand("npx webpack --config webpack.Common.config.js");
        //
        // // 转换ES5
        // console.log("Running Babel...");
        // await runCommand("npx babel output --out-dir dist");
        //
        // const outputDir = path.resolve(__dirname, "output");
        // const distDir = path.resolve(__dirname, "dist");
        //
        // // 清空输出目录 output
        // if (fs.existsSync(outputDir)) {
        //     console.log('Deleting output directory...');
        //     await deleteDirectory(outputDir);
        // } else {
        //     console.log('Output directory does not exist, skipping deletion.');
        // }
        //
        // // 获取dist目录下所有文件
        // const distFiles = fs
        //     .readdirSync(distDir)
        //     .filter((file) => file.endsWith(".js") && !file.endsWith("FirstRun.js"));
        //
        // // 处理每个文件
        // for (const filename of distFiles) {
        //     await processFile(filename);
        // }
        //
        // // 后处理
        // console.log("Running afterBuild...");
        // await afterBuild();
        //
        // console.log("Build process completed successfully.");
    } catch (error) {
        console.error("Build process failed:", error);
    }
}

// // 准备构建
// console.log("Preparing build...");
// prepareBuild();
//
// // 打包
// console.log("Running Webpack...");
// runCommand("npx webpack --config webpack.Common.config.js");
//
// // // 后处理
// // console.log("Running afterBuild...");
// // afterBuild();

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
