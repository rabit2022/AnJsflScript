const fs = require("fs");
const path = require("path");
// const CommonConfig = require("./webpack.Common.config");
const CheckHeadConfig = require("./webpack.CheckHead.config");

const {
    runCommand,
    deleteDirectory,
    copyFile,
    deleteFile,
    compressFile,
    addClosure,
    getEntries,
    getObjectEntryByIndex,
    getObjectLength
} = require("./utils");

var dirname = path.resolve(__dirname, "../../");

function getEntry() {
    const libDir = path.resolve(dirname, "lib");
    const entries = getEntries(libDir);

    const newEntries = {};
    for (const [key, value] of Object.entries(entries)) {
        if (
            value.endsWith(".T") ||
            value.endsWith(".TD") ||
            value.endsWith(".I") ||
            value.includes("#")
        ) {
            continue;
        }

        if (value.includes("test")) {
            newEntries[key] = `${value}.webpack`;
        }
    }
    return newEntries;
}

async function writeNewConfig(webpackEntries) {
    const webpackConfig = path.resolve(__dirname, "./webpack.Common.config.js");

    const jsonString = JSON.stringify(webpackEntries);
    const newConfig = `
const { merge } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    name: "Common", // 普通的脚本文件配置
    // entry多个文件时，总是会打包chunk,暂时没有办法解决，只能手动修改webpack.config.js文件
    entry: ${jsonString}
});
    `;
    await fs.writeFileSync(webpackConfig, newConfig, "utf-8");
}

async function prepareBuild(webpackEntries) {
    // const webpackEntries = CommonConfig.entry;

    // 创建一个深拷贝
    const origionEntries = structuredClone(webpackEntries);
    Object.entries(origionEntries).forEach(([key, value]) => {
        // webpackEntries[key] = value + '.webpack';
        origionEntries[key] = value.replace(/\.webpack$/, "");
    });

    // console.log("webpackEntries", webpackEntries);
    // console.log("origionEntries", origionEntries);

    // 读取源文件
    for (const [key, value] of Object.entries(origionEntries)) {
        // console.log(key, value);
        const sourceFile = value + ".jsfl";
        const webpackFile = webpackEntries[key] + ".jsfl";

        console.log(`Reading source file: ${sourceFile}`);
        var sourceCode = fs.readFileSync(sourceFile, "utf8");

        // 替换代码
        sourceCode = sourceCode.replace(
            CheckHeadConfig.custom.Head,
            "// " + CheckHeadConfig.custom.Head
        );

        console.log(`Writing webpack file: ${webpackFile}`);
        fs.writeFileSync(webpackFile, sourceCode, "utf8");
    }
}

// prepareBuild();
async function afterBuild(webpackEntries) {
    // 删除webpack文件
    // const webpackEntries = CommonConfig.entry;
    for (const [key, value] of Object.entries(webpackEntries)) {
        const webpackFile = value + ".jsfl";
        console.log(`Deleting webpack file: ${webpackFile}`);

        await deleteFile(webpackFile);
    }
}

// 修改文件内容并重命名
async function processFile(filename) {
    var AllPaths = {
        ".": path.resolve(dirname),
        "./dist": path.resolve(dirname, "dist"),
        "./output": path.resolve(dirname, "output"),
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
        const entry = getEntry();
        console.log("Entry:", entry);

        for (let index = 0; index < getObjectLength(entry); index++) {
            const value = getObjectEntryByIndex(entry, index);
            console.log("Entry:", value);

            // 准备构建
            console.log("Preparing build...");
            await prepareBuild(value);

            // 写入新配置
            console.log("Writing new config...");
            await writeNewConfig(value);

            // 打包
            console.log("Running Webpack...");
            await runCommand("npx webpack --config webpack.Common.config.js");

            // 转换ES5
            console.log("Running Babel...");
            await runCommand(
                "npx babel ../../output --out-dir ../../dist --config-file ./.babelrc"
            );

            const outputDir = path.resolve(dirname, "output");
            const distDir = path.resolve(dirname, "dist");

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
                .filter((file) => file.endsWith(".js") && !file.endsWith("FirstRun.js"));

            // 处理每个文件
            for (const filename of distFiles) {
                await processFile(filename);
            }

            // 后处理
            console.log("Running afterBuild...");
            await afterBuild(value);

            // break;
        }
        // console.log("Build process completed successfully.");
    } catch (error) {
        console.error("Build process failed:", error);
    }
}

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
