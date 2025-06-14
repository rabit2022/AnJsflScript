const fs = require("fs");
const path = require("path");
const CommonConfig = require("./webpack.Common.config");
const {
    runCommand,
    deleteDirectory,
    copyFile,
    compressFile,
    addClosure
} = require("./config/build/utils");

async function prepareBuild() {
    const webpackEntries = CommonConfig.entry;

    // 创建一个深拷贝
    const origionEntries = structuredClone(webpackEntries);
    Object.entries(origionEntries).forEach(([key, value]) => {
        // webpackEntries[key] = value + '.webpack';
        origionEntries[key] = value.replace(/\.webpack$/, "");
    });

    console.log("webpackEntries", webpackEntries);
    console.log("origionEntries", origionEntries);

    // 读取源文件
    for (const [key, value] of Object.entries(origionEntries)) {
        // console.log(key, value);
        const sourceFile = value + ".jsfl";
        const webpackFile = webpackEntries[key] + ".webpack.jsfl";

        console.log(`Reading source file: ${sourceFile}`);
        var sourceCode = fs.readFileSync(sourceFile, "utf8");

        // 替换代码
        const replaceText = `
// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
        `;
        const toText = `
// // @formatter:off
// // prettier-ignore
// (function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/FirstRun.jsfl")})();
// // @formatter:on
ngfngfng
        `;
        // // sourceCode = sourceCode.replace(replace, to);
        // // 使用正则表达式进行全局替换
        // // sourceCode = sourceCode.replace(new RegExp(replace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
        // // sourceCode = sourceCode.replaceAll(replace, to);
        //
        // const replaceRegex = new RegExp(replaceText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gs');
        sourceCode = sourceCode.replace(replaceRegex, toText);


        console.log(`Writing webpack file: ${webpackFile}`);
        fs.writeFileSync(webpackFile, sourceCode, "utf8");
    }
}

prepareBuild();

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
        // 打包
        console.log("Running Webpack...");
        await runCommand("npx webpack --config webpack.Common.config.js");

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
        const distFiles = fs
            .readdirSync(distDir)
            .filter((file) => file.endsWith(".js") && !file.endsWith("FirstRun.js"));

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
// // 带性能监控的执行
// (async () => {
//     const start = Date.now();
//     try {
//         const report = await buildProject();
//         console.log(`构建成功，耗时 ${(Date.now() - start) / 1000}秒`);
//         // console.log(report);
//     } catch (error) {
//         console.error(`构建失败，已运行 ${(Date.now() - start) / 1000}秒`);
//         throw error;
//     }
// })();
