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
        // region Third
        // 发布到npm的模块，由node_modules文件夹进行代码补全
        "Class":"Third/Class/Class.js-0.0.1/Class",
        "Interface":"Third/Class/Class.js-0.0.1/Interface",
        "chroma-js":"Third/color/chroma.js-3.1.2/chroma-js",
        "universal-cookie":"Third/cookie/universal-cookie-8.0.1/universal-cookie",
        "eventemitter3":"Third/event/eventemitter3-5.0.1/eventemitter3",
        "rxjs":"Third/event/rxjs-7.8.2/rxjs.umd",
        "circular-json":"Third/json/circular-json-0.5.9/circular-json.amd",
        "json3":"Third/json/json3-3.3.3/json3",
        "loglevel":"Third/log/loglevel-1.9.2/loglevel",
        "numjs":"Third/math/numjs-0.16.1/numjs",
        "require-js":"Third/modules/requirejs-2.3.7/require-js",
        "text":"Third/modules/text-2.0.16/text",
        "assert":"Third/nodejs/assert/assert",
        "path-browserify":"Third/nodejs/path-browserify-1.0.1/path-browserify",
        "es5-sham":"Third/polyfill/es5-shim-4.6.7/es5-sham",
        "es5-shim":"Third/polyfill/es5-shim-4.6.7/es5-shim",
        "es6-collections":"Third/polyfill/es6-collections-0.5.6/es6-collections",
        "es6-promise":"Third/polyfill/es6-promise-4.6.8/es6-promise.auto",
        "es6-sham":"Third/polyfill/es6-shim-0.35.4/es6-sham",
        "es6-shim":"Third/polyfill/es6-shim-0.35.4/es6-shim",
        "es7-shim":"Third/polyfill/es7-shim-6.0.0/es7-shim",
        "Intl-complete":"Third/polyfill/intl-1.2.5/Intl-complete",
        "Intl":"Third/polyfill/intl-1.2.5/Intl",
        "es2017":"Third/polyfill/polyfill-0.1.43/es2017",
        "symbol-es6":"Third/polyfill/symbol-es6-0.1.2/symbol-es6",
        "typedarray":"Third/polyfill/typedarray-0.0.7/typedarray",
        "crypto-js":"Third/random/crypto-js-4.2.0/crypto-js",
        "error-stack-parser":"Third/stack/error-stack-parser-3.0.0/error-stack-parser",
        "stackframe":"Third/stack/stackframe-1.3.4/stackframe",
        "date-fns":"Third/time/date-fns-4.1.0/date-fns",
        "luxon":"Third/time/luxon-3.6.1/luxon",
        "linq":"Third/utils/linq-4.0.3/linq",
        "lodash":"Third/utils/lodash-4.17.21/lodash",
        "sprintf-js":"Third/utils/sprintf-js-1.1.3/sprintf-js",
        "store-js":"Third/utils/store-js-2.0.4/store-js",
        "fast-xml-parser":"Third/xml/fast-xml-parser-5.0.9/fast-xml-parser",
        "xmldom":"Third/xml/xmldom-0.6.0/xmldom",
        "xpath":"Third/xml/xpath-0.0.34/xpath",
        "date-fns-config":"Third/_bridge/date-fns/date-fns-config",
        "document-cookie":"Third/_bridge/document-cookie/document-cookie",
        "Intl-config":"Third/_bridge/Intl/Intl-config",
        "luxon-config":"Third/_bridge/luxon/luxon-config",
        "Context":"Third/_custom/Context/Context",
        "Navigation":"Third/_custom/FlashTool/Navigation",
        "FolderTraverser":"Third/_custom/FolderTraverser/FolderTraverser",
        "SObject":"Third/_custom/Object/SObject",
        "SAT":"Third/_custom/sat-js-0.9.0/SAT",
        "linqUtil":"Third/_custom/utils/linqUtil",
        "satUtil":"Third/_custom/utils/satUtil",
        "console":"Third/_custom/xjsfl/console",
        "JSFLConstants":"Third/_custom/xjsfl/JSFLConstants",
        "JSFLInterface":"Third/_custom/xjsfl/JSFLInterface",
        "XUL":"Third/_custom/xjsfl/ui/XUL",
        // H:\project\沙雕动画\AnJsflScript\Third\_bridge\exports\exports.jsfl
        "_exports":"Third/_bridge/exports/exports",
        // H:\project\沙雕动画\AnJsflScript\Third\Class\overload-js-1.0.0\overload.jsfl
        "overload-js":"Third/Class/overload-js-1.0.0/overload-js",
        // H:\project\沙雕动画\AnJsflScript\Third\utils\progress-2.0.3\progress.jsfl
        "progress":"Third/utils/progress-2.0.3/progress",
        // H:\project\沙雕动画\AnJsflScript\Third\_custom\Object\FUNC.define.jsfl
        "FUNC":"Third/_custom/Object/FUNC.define",
        // endregion Third

        // region Core
        "BitmapOperation":"Core/flash/Bitmap/BitmapOperation",
        "checkUtil":"Core/flash/checkUtil",
        "ColorPanel":"Core/flash/Color/ColorPanel",
        "ColorTransformDefinitions":"Core/flash/Color/ColorTransformDefinitions",
        "FillDefinitions":"Core/flash/Color/FillDefinitions",
        "StrokeDefinitions":"Core/flash/Color/StrokeDefinitions",
        "ElementAnim":"Core/flash/Context/Element/ElementAnim",
        "ElementChecker":"Core/flash/Context/Element/ElementChecker",
        "ElementOperation":"Core/flash/Context/Element/ElementOperation",
        "ElementQuery":"Core/flash/Context/Element/ElementQuery",
        "ElementTransform":"Core/flash/Context/Element/ElementTransform",
        "FrameChecker":"Core/flash/Context/Frame/FrameChecker",
        "FrameOperation":"Core/flash/Context/Frame/FrameOperation",
        "FrameQuery":"Core/flash/Context/Frame/FrameQuery",
        "KeyFrameChecker":"Core/flash/Context/KeyFrame/KeyFrameChecker",
        "KeyFrameOperation":"Core/flash/Context/KeyFrame/KeyFrameOperation",
        "KeyFrameQuery":"Core/flash/Context/KeyFrame/KeyFrameQuery",
        "LayerChecker":"Core/flash/Context/Layer/LayerChecker.define",
        "LayerHierarchy":"Core/flash/Context/Layer/LayerHierarchy",
        "LayerList":"Core/flash/Context/Layer/LayerList",
        "LayerOperation":"Core/flash/Context/Layer/LayerOperation",
        "LayerQuery":"Core/flash/Context/Layer/LayerQuery",
        "LayerQueryEnhance":"Core/flash/Context/Layer/LayerQueryEnhance",
        "LibraryOperation":"Core/flash/Context/library/LibraryOperation",
        "ElementSelect":"Core/flash/Context/selection/ElementSelect",
        "FramesSelect":"Core/flash/Context/selection/FramesSelect",
        "LayerSelect":"Core/flash/Context/selection/LayerSelect",
        "FilterChecker":"Core/flash/Filter/FilterChecker",
        "FilterDefinitions":"Core/flash/Filter/FilterDefinitions",
        "FilterOperation":"Core/flash/Filter/FilterOperation",
        "FilterQuery":"Core/flash/Filter/FilterQuery",
        "FolderChecker":"Core/flash/Folder/FolderChecker",
        "FolderQuery":"Core/flash/Folder/FolderQuery",
        "DrawCircle":"Core/flash/Graphics/DrawCircle",
        "DrawParallelogram":"Core/flash/Graphics/DrawParallelogram",
        "DrawRectangle":"Core/flash/Graphics/DrawRectangle",
        "promptUtil":"Core/flash/Panel/promptUtil",
        "StringPaser":"Core/flash/Panel/StringPaser",
        "xmlPanelUtil":"Core/flash/Panel/xmlPanelUtil",
        "SoundChecker":"Core/flash/Sound/SoundChecker.define",
        "MoreElement":"Core/flash/Symbol/MoreElement",
        "SymbolNameGenerator":"Core/flash/Symbol/SymbolNameGenerator",
        "EaseCurve":"Core/flash/Tween/EaseCurve",
        "Tween":"Core/flash/Tween/Tween",
        "open":"Core/py/file/open",
        "os":"Core/py/file/os",
        "shutil":"Core/py/file/shutil",
        "sys":"Core/py/file/sys",
        "numpy":"Core/py/numpy/numpy",
        "random":"Core/py/random/random",
        "StringP":"Core/py/string/StringP",
        "KeyFrameMode":"Core/Utils/KeyFrameMode",
        "Tips":"Core/Utils/Tips",
        "COMPATIBILITY":"Core/webpack/COMPATIBILITY",
        // H:\project\沙雕动画\AnJsflScript\Core\flash\Sound\SoundQuery.define.ts
        "SoundQuery":"Core/flash/Sound/SoundQuery.define",

        // endregion Core
    }, packages: []
});
