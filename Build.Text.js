const fs = require("fs");
const path = require("path");
// const CommonConfig = require("./webpack.Text.config");
const CheckHeadConfig = require("./config/require/webpack.CheckHead");

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
} = require("./config/build/utils");

function replaceRelativePath(str) {
    const match = str.match(
        /__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__\(("[^"]+"|'[^']+')\)/
    );
    // console.log(match);
    return match;
}

function replaceAbsolutePath(str) {
    const regex = /__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__\("([^"]+)"\)/;
    const match = str.match(regex);
    return match;
}

// var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./09.一键转场.xml");
function replaceXMLPanelRelativePath(str) {
    const regex = /__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__\("([^"]+)"\)/;
    const match = str.match(regex);
    return match;
}

function getEntry() {
    const libDir = path.resolve(__dirname, "lib");
    let entries = getEntries(libDir);
    const newEntries = {};
    // 把value添加.webpack后缀
    for (const [key, value] of Object.entries(entries)) {
        if (value.endsWith(".Text")) {
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
        const sourceFile = value + ".jsfl";
        const webpackFile = webpackEntries[key] + ".jsfl";

        console.log(`Reading source file: ${sourceFile}`);
        var sourceCode = fs.readFileSync(sourceFile, "utf8");

        // 替换代码
        sourceCode = sourceCode.replace(
            CheckHeadConfig.custom.Head,
            "// " + CheckHeadConfig.custom.Head
        );

        // text!./filename.as    相对路径的处理
        var relativePath = replaceRelativePath(sourceCode);
        if (relativePath) {
            sourceCode = sourceCode.replaceAll(relativePath[0], relativePath[1]);
        }

        // text!./filename.as      绝对路径的处理
        var absolutePath = replaceAbsolutePath(sourceCode);
        // console.log(`Reading absolute path: ${absolutePath}`);
        if (absolutePath) {
            const absolutePathStr = path.resolve(__dirname, absolutePath[1]);
            // 将路径中的反斜杠替换为双反斜杠
            const escapedPathStr = absolutePathStr.replace(/\\/g, "\\\\");
            sourceCode = sourceCode.replaceAll(absolutePath[0], `"${escapedPathStr}"`);
        }

        // xmlPanel 相对路径的处理
        var xmlPath = replaceXMLPanelRelativePath(sourceCode);
        if (xmlPath) {
            var toText = `
        function getScriptText() {
        function getScriptTextInner(callback) {
            require([__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__("./config/ui/dialog.xul")], function(text) {
                const scriptText = __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_TEXT__(text);
                if (!scriptText) {
                    callback(new Error("Can't find script file [./04.辅助相机.as]"));
                } else {
                    callback(null, scriptText);
                }
            });
        }

        var scriptText1 = "";
        getScriptTextInner(function(err, scriptText) {
            if (err) {
                fl.trace(err.message);
                return;
            }
            scriptText1 = scriptText;
        });
        return scriptText1;
    }
            
            `;
            sourceCode = sourceCode.replaceAll(xmlPath[0], xmlPath[1]);
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
        const entry = getEntry();
        console.log("Entries:", entry);

        for (let index = 0; index < getObjectLength(entry); index++) {
            const value = getObjectEntryByIndex(entry, index);
            console.log("Entry:", value);

            // 准备构建
            console.log("Preparing build...");
            await prepareBuild(value);

            break;

            // // 写入新配置
            // console.log("Writing new config...");
            // await writeNewConfig(value);
            //
            // // 打包
            // console.log("Running Webpack...");
            // await runCommand("npx webpack --config webpack.Text.config.js");
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
            //
            // // 后处理
            // console.log("Running afterBuild...");
            // await afterBuild(value);
        }

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
