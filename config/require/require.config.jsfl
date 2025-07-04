/**
 * @file: require.config.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/6 19:28
 * @project: AnJsflScript
 * @description:
 */

require.config({
    // context: 'Core', // 设置模块的加载上下文
    baseUrl: window.AnJsflScript.$ProjectFileDir$, // 设置模块的基础路径
    // baseUrl: '.', // 设置模块的基础路径
    paths: {
        // 发布到npm的模块，由node_modules文件夹进行代码补全
        "Class": "Third/Class/Class.js-0.0.1/Class",
        "Interface": "Third/Class/Class.js-0.0.1/Interface",
        "chroma-js": "Third/color/chroma.js-3.1.2/chroma-js",
        "Context": "Third/custom/Context/Context",
        "Navigation": "Third/custom/FlashTool/Navigation",
        "FolderTraverser": "Third/custom/FolderTraverser/FolderTraverser",
        "SObject": "Third/custom/Object/SObject",
        "SAT": "Third/custom/sat-js-0.9.0/SAT",
        "linqUtil": "Third/custom/utils/linqUtil",
        "satUtil": "Third/custom/utils/satUtil",
        "console": "Third/custom/xjsfl/console",
        "JSFLConstants": "Third/custom/xjsfl/JSFLConstants",
        "JSFLInterface": "Third/custom/xjsfl/JSFLInterface",
        "Utils": "Third/custom/xjsfl/ui/Utils",
        "xjsfl": "Third/custom/xjsfl/ui/xjsfl",
        "XML": "Third/custom/xjsfl/ui/XML",
        "XUL": "Third/custom/xjsfl/ui/XUL",
        "XULControl": "Third/custom/xjsfl/ui/XULControl",
        "XULEvent": "Third/custom/xjsfl/ui/XULEvent",
        "eventemitter3": "Third/event/eventemitter3-5.0.1/eventemitter3",
        "rxjs": "Third/event/rxjs-7.8.2/rxjs.umd",
        "circular-json": "Third/json/circular-json-0.5.9/circular-json.amd",
        "json3": "Third/json/json3-3.3.3/json3",
        "loglevel": "Third/log/loglevel-1.9.2/loglevel",
        "mathjs": "Third/math/mathjs-14.5.2/mathjs",
        "numjs": "Third/math/numjs-0.16.1/numjs",
        "path-browserify": "Third/modules/path-browserify-1.0.1/path-browserify",
        "require-js": "Third/modules/requirejs-2.3.7/require-js",
        "text": "Third/modules/text-2.0.16/text",
        "assert": "Third/nodejs/assert/assert",
        "es5-sham": "Third/polyfill/es5-shim-4.6.7/es5-sham",
        "es5-shim": "Third/polyfill/es5-shim-4.6.7/es5-shim",
        "es6-collections": "Third/polyfill/es6-collections-0.5.6/es6-collections",
        "es6-promise": "Third/polyfill/es6-promise-4.6.8/es6-promise.auto",
        "es6-sham": "Third/polyfill/es6-shim-0.35.4/es6-sham",
        "es6-shim": "Third/polyfill/es6-shim-0.35.4/es6-shim",
        "es7-shim": "Third/polyfill/es7-shim-6.0.0/es7-shim",
        "es2017": "Third/polyfill/polyfill-0.1.43/es2017",
        "typedarray": "Third/polyfill/typedarray-0.0.7/typedarray",
        "error-stack-parser": "Third/stack/error-stack-parser-3.0.0/error-stack-parser",
        "stackframe": "Third/stack/stackframe-1.3.4/stackframe",
        "linq": "Third/utils/linq-4.0.3/linq",
        "lodash": "Third/utils/lodash-4.17.21/lodash",
        "sprintf-js": "Third/utils/sprintf-js-1.1.3/sprintf-js",
        "fast-xml-parser": "Third/xml/fast-xml-parser-5.0.9/fast-xml-parser",
        "xmldom": "Third/xml/xmldom-0.6.0/xmldom",
        "xpath": "Third/xml/xpath-0.0.34/xpath",
        // H:\project\沙雕动画\AnJsflScript\Third\utils\store-js-2.0.4\store-js.jsfl
        "store-js": "Third/utils/store-js-2.0.4/store-js",
        // H:\project\沙雕动画\AnJsflScript\Third\cookie\universal-cookie-8.0.1\universal-cookie.jsfl
        "universal-cookie": "Third/cookie/universal-cookie-8.0.1/universal-cookie",
        // H:\project\沙雕动画\AnJsflScript\Third\custom\document-cookie\document-cookie.jsfl
        "document-cookie": "Third/custom/document-cookie/document-cookie",


// 自定义模块
        "BitmapOperation": "Core/flash/Bitmap/BitmapOperation",
        "checkUtil": "Core/flash/checkUtil",
        "ColorPanel": "Core/flash/color/ColorPanel",
        "FillDefinitions": "Core/flash/color/FillDefinitions",
        "StrokeDefinitions": "Core/flash/color/StrokeDefinitions",
        "ElementAnim": "Core/flash/Context/Element/ElementAnim",
        "ElementChecker": "Core/flash/Context/Element/ElementChecker",
        "ElementOperation": "Core/flash/Context/Element/ElementOperation",
        "ElementQuery": "Core/flash/Context/Element/ElementQuery",
        "ElementTransform": "Core/flash/Context/Element/ElementTransform",
        "FrameChecker": "Core/flash/Context/Frame/FrameChecker",
        "FrameOperation": "Core/flash/Context/Frame/FrameOperation",
        "FrameQuery": "Core/flash/Context/Frame/FrameQuery",
        "KeyFrameChecker": "Core/flash/Context/KeyFrame/KeyFrameChecker",
        "KeyFrameOperation": "Core/flash/Context/KeyFrame/KeyFrameOperation",
        "KeyFrameQuery": "Core/flash/Context/KeyFrame/KeyFrameQuery",
        "LayerChecker": "Core/flash/Context/Layer/LayerChecker",
        "LayerHierarchy": "Core/flash/Context/Layer/LayerHierarchy",
        "LayerOperation": "Core/flash/Context/Layer/LayerOperation",
        "LayerQuery": "Core/flash/Context/Layer/LayerQuery",
        "LayerQueryEnhance": "Core/flash/Context/Layer/LayerQueryEnhance",
        "LibraryOperation": "Core/flash/Context/library/LibraryOperation",
        "ElementSelect": "Core/flash/Context/selection/ElementSelect",
        "FramesSelect": "Core/flash/Context/selection/FramesSelect",
        "FilterChecker": "Core/flash/filter/FilterChecker",
        "FilterDefinitions": "Core/flash/filter/FilterDefinitions",
        "FilterOperation": "Core/flash/filter/FilterOperation",
        "FilterQuery": "Core/flash/filter/FilterQuery",
        "FolderChecker": "Core/flash/Folder/FolderChecker",
        "FolderQuery": "Core/flash/Folder/FolderQuery",
        "DrawCircle": "Core/flash/graphics/DrawCircle",
        "DrawParallelogram": "Core/flash/graphics/DrawParallelogram",
        "DrawRectangle": "Core/flash/graphics/DrawRectangle",
        "promptUtil": "Core/flash/panel/promptUtil",
        "xmlPanelUtil": "Core/flash/panel/xmlPanelUtil",
        "MoreElement": "Core/flash/Symbol/MoreElement",
        "SymbolNameGenerator": "Core/flash/Symbol/SymbolNameGenerator",
        "EaseCurve": "Core/flash/tween/EaseCurve",
        "Tween": "Core/flash/tween/Tween",
        "FUNC": "Core/myShim/FUNC",
        "open": "Core/py/file/open",
        "os": "Core/py/file/os",
        "shutil": "Core/py/file/shutil",
        "sys": "Core/py/file/sys",
        "numpy": "Core/py/numpy/numpy",
        "random": "Core/py/random/random",
        "StringP": "Core/py/string/StringP",
        "KeyFrameMode": "Core/Utils/KeyFrameMode",
        "Tips": "Core/Utils/Tips",

        // D:\project\沙雕动画\AnJsflScript\Core\webpack\COMPATIBILITY.jsfl
        "COMPATIBILITY": "Core/webpack/COMPATIBILITY",
        // D:\project\沙雕动画\AnJsflScript\Core\flash\Context\Layer\LayerList.jsfl
        "LayerList": "Core/flash/Context/Layer/LayerList",
        // H:\project\沙雕动画\AnJsflScript\Core\flash\panel\StringPaser.jsfl
        "StringPaser": "Core/flash/panel/StringPaser",
        //H:\project\沙雕动画\AnJsflScript\Core\flash\color\ColorTransformDefinitions.jsfl
        "ColorTransformDefinitions": "Core/flash/color/ColorTransformDefinitions",
    }, packages: []
});
