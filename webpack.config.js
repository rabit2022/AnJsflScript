const path = require("path");
const { IgnorePlugin } = require("webpack");
const webpack = require('webpack');


module.exports = {
    entry: {
        // FirstRun.webpack.jsfl
        FirstRun: "./FirstRun.webpack.jsfl"
    },
    // output: {
    //     path: path.resolve(__dirname, "output"),
    //     filename: "[name].js",
    //     // library: 'Context',
    //     libraryTarget: "umd",
    //     globalObject: "this"
    // },
    output: {
        path: path.resolve(__dirname, "output"),
        filename: "[name].js",
        library: "__AnJsflScript", // 定义一个全局变量
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
        usedExports: false,
        sideEffects: false
    },

    mode: "development",
    // mode: "production",
    devtool: "source-map",

    // 模块解析规则
    resolve: {
        // 自动补全 .jsfl 扩展名
        extensions: [".jsfl"],
        // 路径别名（映射 Third/ 和 Core/）
        alias: {
            // 发布到npm的模块，由node_modules文件夹进行代码补全
            "Class": path.resolve(__dirname, "Third/Class/Class.js-0.0.1/Class"),
            "Interface": path.resolve(__dirname, "Third/Class/Class.js-0.0.1/Interface"),
            "chroma-js": path.resolve(__dirname, "Third/color/chroma.js-3.1.2/chroma-js"),
            "Context": path.resolve(__dirname, "Third/custom/Context/Context"),
            "Navigation": path.resolve(__dirname, "Third/custom/FlashTool/Navigation"),
            "FolderTraverser": path.resolve(__dirname, "Third/custom/FolderTraverser/FolderTraverser"),
            "SObject": path.resolve(__dirname, "Third/custom/Object/SObject"),
            "SAT": path.resolve(__dirname, "Third/custom/sat-js-0.9.0/SAT"),
            "linqUtil": path.resolve(__dirname, "Third/custom/utils/linqUtil"),
            "satUtil": path.resolve(__dirname, "Third/custom/utils/satUtil"),
            "console": path.resolve(__dirname, "Third/custom/xjsfl/console"),
            "JSFLConstants": path.resolve(__dirname, "Third/custom/xjsfl/JSFLConstants"),
            "JSFLInterface": path.resolve(__dirname, "Third/custom/xjsfl/JSFLInterface"),
            "Utils": path.resolve(__dirname, "Third/custom/xjsfl/ui/Utils"),
            "xjsfl": path.resolve(__dirname, "Third/custom/xjsfl/ui/xjsfl"),
            "XML": path.resolve(__dirname, "Third/custom/xjsfl/ui/XML"),
            "XUL": path.resolve(__dirname, "Third/custom/xjsfl/ui/XUL"),
            "XULControl": path.resolve(__dirname, "Third/custom/xjsfl/ui/XULControl"),
            "XULEvent": path.resolve(__dirname, "Third/custom/xjsfl/ui/XULEvent"),
            "eventemitter3": path.resolve(__dirname, "Third/event/eventemitter3-5.0.1/eventemitter3"),
            "rxjs": path.resolve(__dirname, "Third/event/rxjs-7.8.2/rxjs.umd"),
            "circular-json": path.resolve(__dirname, "Third/json/circular-json-0.5.9/circular-json.amd"),
            "json3": path.resolve(__dirname, "Third/json/json3-3.3.3/json3"),
            "loglevel": path.resolve(__dirname, "Third/log/loglevel-1.9.2/loglevel"),
            "mathjs": path.resolve(__dirname, "Third/math/mathjs-14.5.2/mathjs"),
            "numjs": path.resolve(__dirname, "Third/math/numjs-0.16.1/numjs"),
            "path-browserify": path.resolve(__dirname, "Third/modules/path-browserify-1.0.1/path-browserify"),
            "require-js": path.resolve(__dirname, "Third/modules/requirejs-2.3.7/require-js"),
            "text": path.resolve(__dirname, "Third/modules/text-2.0.16/text"),
            "assert": path.resolve(__dirname, "Third/nodejs/assert/assert"),
            "es5-sham": path.resolve(__dirname, "Third/polyfill/es5-shim-4.6.7/es5-sham"),
            "es5-shim": path.resolve(__dirname, "Third/polyfill/es5-shim-4.6.7/es5-shim"),
            "es6-collections": path.resolve(__dirname, "Third/polyfill/es6-collections-0.5.6/es6-collections"),
            "es6-sham": path.resolve(__dirname, "Third/polyfill/es6-shim-0.35.4/es6-sham"),
            "es6-shim": path.resolve(__dirname, "Third/polyfill/es6-shim-0.35.4/es6-shim"),
            "es7-shim": path.resolve(__dirname, "Third/polyfill/es7-shim-6.0.0/es7-shim"),
            "es2017": path.resolve(__dirname, "Third/polyfill/polyfill-0.1.43/es2017"),
            "typedarray": path.resolve(__dirname, "Third/polyfill/typedarray-0.0.7/typedarray"),
            "error-stack-parser": path.resolve(__dirname, "Third/stack/error-stack-parser-3.0.0/error-stack-parser"),
            "stackframe": path.resolve(__dirname, "Third/stack/stackframe-1.3.4/stackframe"),
            "linq": path.resolve(__dirname, "Third/utils/linq-4.0.3/linq"),
            "lodash": path.resolve(__dirname, "Third/utils/lodash-4.17.21/lodash"),
            "sprintf-js": path.resolve(__dirname, "Third/utils/sprintf-js-1.1.3/sprintf-js"),
            "fast-xml-parser": path.resolve(__dirname, "Third/xml/fast-xml-parser-5.0.9/fast-xml-parser"),
            "xmldom": path.resolve(__dirname, "Third/xml/xmldom-0.6.0/xmldom"),
            "xpath": path.resolve(__dirname, "Third/xml/xpath-0.0.34/xpath"),
            // "es6-promise": "Third/polyfill/es6-promise-4.6.8/es6-promise.auto",
            "es6-promise":path.resolve(__dirname, "Third/polyfill/es6-promise-4.6.8/es6-promise.auto"),

            // 自定义模块
            "BitmapOperation": path.resolve(__dirname, "Core/flash/Bitmap/BitmapOperation"),
            "checkUtil": path.resolve(__dirname, "Core/flash/checkUtil"),
            "ColorPanel": path.resolve(__dirname, "Core/flash/color/ColorPanel"),
            "FillDefinitions": path.resolve(__dirname, "Core/flash/color/FillDefinitions"),
            "StrokeDefinitions": path.resolve(__dirname, "Core/flash/color/StrokeDefinitions"),
            "ElementAnim": path.resolve(__dirname, "Core/flash/Context/Element/ElementAnim"),
            "ElementChecker": path.resolve(__dirname, "Core/flash/Context/Element/ElementChecker"),
            "ElementOperation": path.resolve(__dirname, "Core/flash/Context/Element/ElementOperation"),
            "ElementQuery": path.resolve(__dirname, "Core/flash/Context/Element/ElementQuery"),
            "ElementTransform": path.resolve(__dirname, "Core/flash/Context/Element/ElementTransform"),
            "FrameChecker": path.resolve(__dirname, "Core/flash/Context/Frame/FrameChecker"),
            "FrameOperation": path.resolve(__dirname, "Core/flash/Context/Frame/FrameOperation"),
            "FrameQuery": path.resolve(__dirname, "Core/flash/Context/Frame/FrameQuery"),
            "KeyFrameChecker": path.resolve(__dirname, "Core/flash/Context/KeyFrame/KeyFrameChecker"),
            "KeyFrameOperation": path.resolve(__dirname, "Core/flash/Context/KeyFrame/KeyFrameOperation"),
            "KeyFrameQuery": path.resolve(__dirname, "Core/flash/Context/KeyFrame/KeyFrameQuery"),
            "LayerChecker": path.resolve(__dirname, "Core/flash/Context/Layer/LayerChecker"),
            "LayerHierarchy": path.resolve(__dirname, "Core/flash/Context/Layer/LayerHierarchy"),
            "LayerOperation": path.resolve(__dirname, "Core/flash/Context/Layer/LayerOperation"),
            "LayerQuery": path.resolve(__dirname, "Core/flash/Context/Layer/LayerQuery"),
            "LayerQueryEnhance": path.resolve(__dirname, "Core/flash/Context/Layer/LayerQueryEnhance"),
            "LibraryOperation": path.resolve(__dirname, "Core/flash/Context/library/LibraryOperation"),
            "ElementSelect": path.resolve(__dirname, "Core/flash/Context/selection/ElementSelect"),
            "FramesSelect": path.resolve(__dirname, "Core/flash/Context/selection/FramesSelect"),
            "FilterChecker": path.resolve(__dirname, "Core/flash/filter/FilterChecker"),
            "FilterDefinitions": path.resolve(__dirname, "Core/flash/filter/FilterDefinitions"),
            "FilterOperation": path.resolve(__dirname, "Core/flash/filter/FilterOperation"),
            "FilterQuery": path.resolve(__dirname, "Core/flash/filter/FilterQuery"),
            "FolderChecker": path.resolve(__dirname, "Core/flash/Folder/FolderChecker"),
            "FolderQuery": path.resolve(__dirname, "Core/flash/Folder/FolderQuery"),
            "DrawCircle": path.resolve(__dirname, "Core/flash/graphics/DrawCircle"),
            "DrawParallelogram": path.resolve(__dirname, "Core/flash/graphics/DrawParallelogram"),
            "DrawRectangle": path.resolve(__dirname, "Core/flash/graphics/DrawRectangle"),
            "promptUtil": path.resolve(__dirname, "Core/flash/panel/promptUtil"),
            "xmlPanelUtil": path.resolve(__dirname, "Core/flash/panel/xmlPanelUtil"),
            "MoreElement": path.resolve(__dirname, "Core/flash/Symbol/MoreElement"),
            "SymbolNameGenerator": path.resolve(__dirname, "Core/flash/Symbol/SymbolNameGenerator"),
            "EaseCurve": path.resolve(__dirname, "Core/flash/tween/EaseCurve"),
            "Tween": path.resolve(__dirname, "Core/flash/tween/Tween"),
            "FUNC": path.resolve(__dirname, "Core/myShim/FUNC"),
            "open": path.resolve(__dirname, "Core/py/file/open"),
            "os": path.resolve(__dirname, "Core/py/file/os"),
            "shutil": path.resolve(__dirname, "Core/py/file/shutil"),
            "sys": path.resolve(__dirname, "Core/py/file/sys"),
            "numpy": path.resolve(__dirname, "Core/py/numpy/numpy"),
            "random": path.resolve(__dirname, "Core/py/random/random"),
            "StringP": path.resolve(__dirname, "Core/py/string/StringP"),
            "KeyFrameMode": path.resolve(__dirname, "Core/Utils/KeyFrameMode"),
            "Tips": path.resolve(__dirname, "Core/Utils/Tips"),


        }
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
                        presets: ["@babel/preset-env"],
                        plugins: [
                            // 将 require() 转换为 AMD 格式（兼容 JSFL）
                            ['@babel/plugin-transform-modules-amd', {
                                noInterop: true,  // 禁用Promise包装
                                strict: true,       // 使用严格模式
                                allowTopLevelThis: true // 允许顶层 this
                            }]
                        ]
                    }
                }
            }
        ]
    },

    plugins: [
        // 阻止 node_modules 被打包
        new IgnorePlugin({
            resourceRegExp: /^\.\/node_modules$/
        }),
        // 强制限制为单文件
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1 // 关键：强制只生成1个文件
        }),
        // 自动注入Promise
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise'] // 自动注入Promise
        })
    ],
};
