const path = require("path");
const webpack = require("webpack");

const alias = require("./webpack.alias.config");

const dirname = path.resolve(__dirname, "../");

module.exports = {
    output: {
        path: path.resolve(dirname, "output"),
        filename: "[name].js",
        library: "__AnJsflScript", // 定义一个全局变量
        chunkFilename: "[name].chunk.js", // 禁用哈希
        libraryTarget: "var",
        globalObject: "this"
    },

    // 关键配置：禁用代码分割
    optimization: {
        splitChunks: false, // 禁用默认代码分割
        runtimeChunk: false, // 禁用运行时文件
        // 强制合并所有模块
        concatenateModules: true,
        // 确保所有依赖内联
        usedExports: false, // 关闭Tree Shaking
        sideEffects: false,
        chunkIds: "deterministic", // 禁用动态导入分块
        minimize: false // ④ 关闭压缩（避免隐藏合并）
    },

    mode: "development",
    // mode: "production",
    devtool: "source-map",

    // 模块解析规则
    resolve: {
        // 自动补全 .jsfl 扩展名
        extensions: [".jsfl"],
        // 路径别名（映射 Third/ 和 Core/）
        alias: alias
    },

    // 模块加载规则
    module: {
        rules: [
            {
                test: /\.jsfl?$/, // 匹配 .js 和 .jsfl 文件
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        sourceType: "script", // 关闭严格模式
                        presets: ["@babel/preset-env"],

                        // plugins: [
                        //     // 将 require() 转换为 AMD 格式（兼容 JSFL）
                        //     [
                        //         "@babel/plugin-transform-modules-amd",
                        //         {
                        //             noInterop: true, // 禁用Promise包装
                        //             strict: true, // 使用严格模式
                        //             allowTopLevelThis: true // 允许顶层 this
                        //         }
                        //     ]
                        // ]
                    }
                    // loader: 'raw-loader', // 直接将文件作为字符串处理
                }
            },
            {
                // as,txt,xml,xul
                test: /\.as$|\.txt$|\.xml$|\.xul$/,
                use: "raw-loader"
            }
        ]
    },

    plugins: [
        // 阻止 node_modules 被打包
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/node_modules$/
        }),
        // 强制限制为单文件
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1 // 关键：强制只生成1个文件
        }),
        // 自动注入Promise
        new webpack.ProvidePlugin({
            Promise: ["es6-promise", "Promise"] // 自动注入Promise
        })
    ],
    // 5. 关闭所有可能触发分块的特性
    experiments: {
        topLevelAwait: false, // 禁用顶级await
        outputModule: false // 禁用ES模块输出
    }
};
