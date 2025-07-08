const fs = require("fs");
const path = require("path");
// const CommonConfig = require("./webpack.Text.config");
// const CheckHeadConfig = require("./webpack.CheckHead.config");
const Config = require("./webpack.Text.config");

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

var dirname = path.resolve(__dirname, "../");

function replaceRelativePath(str) {
    const match = str.matchAll(
        /__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__\(("[^"]+"|'[^']+')\)/g
    );
    // console.log(match);
    return match;
}

function replaceAbsolutePath(str) {
    const regex = /__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__\("([^"]+)"\)/g;
    const match = str.matchAll(regex);
    return match;
}

// var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./09.一键转场.xml");
function replaceXMLPanelRelativePath(str) {
    const regex = /__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__\("([^"]+)"\)/g;
    const match = str.matchAll(regex);
    return match;
}

function replaceRunScriptRelativePath(str) {
    const regex = /__WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__\("([^"]+)"\)/g;
    const matches = str.matchAll(regex);
    return matches;
}

function removeQuotes(str) {
    // 使用正则表达式去除左右两侧的单引号或双引号
    return str.replace(/^["']|["']$/g, "");
}

function addQuotes(str) {
    // 使用单引号包裹字符串
    return `"${str}"`;
}

function getEntry0() {
    const libDir = path.resolve(dirname, "lib");
    let entries = getEntries(libDir);
    const newEntries = {};
    // 把value添加.webpack后缀
    for (const [key, value] of Object.entries(entries)) {
        if (value.endsWith(".I") || value.includes("#")) {
            continue;
        }
        if (value.endsWith(".TD")) {
            // Text Depends
            newEntries[key] = `${value}.webpack`;
        }
    }
    return newEntries;
}

function getEntry() {
    const libDir = path.resolve(dirname, "lib");
    let entries = getEntries(libDir);
    const newEntries = {};
    // 把value添加.webpack后缀
    for (const [key, value] of Object.entries(entries)) {
        if (value.endsWith(".T")) {
            // Text
            newEntries[key] = `${value}.webpack`;
        }
    }
    return newEntries;
}

async function writeNewConfig(webpackEntries) {
    const webpackConfig = path.resolve(__dirname, "./webpack.Text.config.js");

    const jsonString = JSON.stringify(webpackEntries);
    const newConfig = `
const { merge } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    name: "Text", // requirejs text 插件
    // entry多个文件时，总是会打包chunk,暂时没有办法解决，只能手动修改webpack.config.js文件
    entry: ${jsonString}
});
    
    `;
    await fs.writeFileSync(webpackConfig, newConfig, "utf-8");
}

async function prepareBuild(webpackEntries) {
    // const webpackEntries =getEntry();

    // 创建一个深拷贝
    const origionEntries = structuredClone(webpackEntries);
    Object.entries(origionEntries).forEach(([key, value]) => {
        // webpackEntries[key] = value + '.webpack';
        origionEntries[key] = value.replace(/\.webpack$/, "");
    });

    // 读取源文件
    for (const [key, value] of Object.entries(origionEntries)) {
        // console.log(key, value);
        // const sourceFile = value + ".jsfl";
        // const webpackFile = webpackEntries[key] + ".jsfl";
        const sourceFile = value + ".js";
        const webpackFile = webpackEntries[key] + ".js";

        console.log(`Reading source file: ${sourceFile}`);
        var sourceCode = fs.readFileSync(sourceFile, "utf8");


        // text!./filename.as      绝对路径的处理
        var absolutePath = replaceAbsolutePath(sourceCode);
        // console.log(`Reading absolute path: ${absolutePath}`);
        for (const match of absolutePath) {
            const absolutePathStr = path.resolve(dirname, match[1]);
            console.log(`Reading absolute path: ${absolutePathStr}`);
            var fileContent = fs.readFileSync(absolutePathStr, "utf8");
            var singleLineString = JSON.stringify(fileContent.toString());
            sourceCode = sourceCode.replaceAll(match[0], singleLineString);
        }

        // xmlPanel 相对路径的处理
        var xmlPath = replaceXMLPanelRelativePath(sourceCode);
        for (const match of xmlPath) {
            var sourceFileDir = path.dirname(sourceFile);
            var xmlPathStr = removeQuotes(match[1]);
            var absolutePathStr = path.resolve(sourceFileDir, xmlPathStr);
            var fileContent = fs.readFileSync(absolutePathStr, "utf8");
            var singleLineString = JSON.stringify(fileContent.toString());
            sourceCode = sourceCode.replaceAll(addQuotes(match[1]), singleLineString);
        }

        // runScript 相对路径的处理
        var runScriptPath = replaceRunScriptRelativePath(sourceCode);
        for (const match of runScriptPath) {
            console.log(`Reading runScript path: ${match}`);
            var sourceFileDir = path.dirname(sourceFile);
            var runScriptPathStr = removeQuotes(match[1]);
            var absolutePathStr = path.resolve(sourceFileDir, runScriptPathStr);
            absolutePathStr = absolutePathStr.replace(/\\/g, "/");
            absolutePathStr = absolutePathStr.replace(/\.jsfl$/, ".webpack.jsfl");

            var toText = `require(["${absolutePathStr}"]);`;
            sourceCode = sourceCode.replaceAll(match[0], toText);
        }

        console.log(`Writing webpack file: ${webpackFile}`);
        fs.writeFileSync(webpackFile, sourceCode, "utf8");
    }
}

async function afterBuild(webpackEntries) {
    // const webpackEntries = getEntry();
    // 删除webpack文件
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

    // // 压缩文件
    // console.log(`Compressing file: ${AllPaths["./dist/filename.jsfl"]}`);
    // await compressFile(
    //     AllPaths["./dist/filename.jsfl"],
    //     AllPaths["./dist/filename.min.jsfl"]
    // );
    //
    // // 删除源文件
    // console.log(`Deleting source file: ${AllPaths["./dist/filename.jsfl"]}`);
    // await deleteFile(AllPaths["./dist/filename.jsfl"]);
}

// 构建项目
async function buildProject() {
    try {

        const value={
            "XUL":"H:\\project\\沙雕动画\\AnJsflScript\\Third\\_custom\\xjsfl\\ui\\src\\XUL.webpack"
        }

        // 准备构建
        console.log("Preparing build...");
        await prepareBuild(value);

        // // 打包
        // console.log("Running Webpack...");
        // await runCommand("npx webpack --config webpack.Text.config.js");

        // // 转换ES5
        // console.log("Running Babel...");
        // // await runCommand("npx babel output --out-dir dist");
        // await runCommand(
        //     "npx babel ../output --out-dir ../dist --config-file ./.babelrc"
        // );
        //
        // const outputDir = path.resolve(dirname, "output");
        // const distDir = path.resolve(dirname, "dist");
        //
        // // 清空输出目录 output
        // if (fs.existsSync(outputDir)) {
        //     console.log("Deleting output directory...");
        //     await deleteDirectory(outputDir);
        // } else {
        //     console.log("Output directory does not exist, skipping deletion.");
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

        //     // 后处理
        //     console.log("Running afterBuild...");
        //     await afterBuild(value);
        // }
        //
        // for (let index = 0; index < getObjectLength(entry0); index++) {
        //     const value = getObjectEntryByIndex(entry0, index);
        //     console.log("Entry:", value);
        //
        //     // 后处理
        //     console.log("Running afterBuild...");
        //     await afterBuild(value);
        // }

        console.log("Build process completed successfully.");
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
