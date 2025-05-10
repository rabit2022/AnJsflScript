/**
 * @file: require-config.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/6 19:28
 * @project: AnJsflScript
 * @description:
 */

require.config({
    // context: 'Core', // 设置模块的加载上下文
    baseUrl: window.$ProjectFileDir$, // 设置模块的基础路径
    // baseUrl: '.', // 设置模块的基础路径
    paths: {
        // 发布到npm的模块，由node_modules文件夹进行代码补全
        Class: "Third/Class/Class.js-0.0.1/Class",
        Interface: "Third/Class/Class.js-0.0.1/Interface",
        Context: "Third/custom/Context/Context",
        Navigation: "Third/custom/FlashTool/Navigation",
        FolderTraverser: "Third/custom/FolderTraverser/FolderTraverser",
        SAT: "Third/custom/sat-js-0.9.0/SAT",
        linqUtil: "Third/custom/utils/linqUtil",
        satUtil: "Third/custom/utils/satUtil",
        console: "Third/custom/xjsfl/console",
        JSFLConstants: "Third/custom/xjsfl/JSFLConstants",
        Utils: "Third/custom/xjsfl/ui/Utils",
        XML: "Third/custom/xjsfl/ui/XML",
        XUL: "Third/custom/xjsfl/ui/XUL",
        XULControl: "Third/custom/xjsfl/ui/XULControl",
        XULEvent: "Third/custom/xjsfl/ui/XULEvent",
        // XUL: "Third/custom/xul/XUL",
        eventemitter3: "Third/event/eventemitter3-5.0.1/eventemitter3",
        rxjs: "Third/event/rxjs-7.8.2/rxjs.umd",
        "circular-json": "Third/json/circular-json-0.5.9/circular-json.amd",
        json3: "Third/json/json3-3.3.3/json3",
        loglevel: "Third/log/loglevel-1.9.2/loglevel",
        "path-browserify": "Third/modules/path-browserify-1.0.1/path-browserify",
        "require-js": "Third/modules/requirejs-2.3.7/require-js",
        text: "Third/modules/text-2.0.16/text",
        assert: "Third/nodejs/assert/assert",
        "es5-sham": "Third/polyfill/es5-shim-4.6.7/es5-sham",
        "es5-shim": "Third/polyfill/es5-shim-4.6.7/es5-shim",
        "es6-collections": "Third/polyfill/es6-collections-0.5.6/es6-collections",
        "es6-sham": "Third/polyfill/es6-shim-0.35.4/es6-sham",
        "es6-shim": "Third/polyfill/es6-shim-0.35.4/es6-shim",
        "es7-shim": "Third/polyfill/es7-shim-6.0.0/es7-shim",
        es2017: "Third/polyfill/polyfill-0.1.43/es2017",
        "error-stack-parser": "Third/stack/error-stack-parser-3.0.0/error-stack-parser",
        stackframe: "Third/stack/stackframe-1.3.4/stackframe",
        linq: "Third/utils/linq-4.0.3/linq",
        lodash: "Third/utils/lodash-4.17.21/lodash",
        sprintf: "Third/utils/sprintf-js-1.1.3/sprintf",
        "fast-xml-parser": "Third/xml/fast-xml-parser-5.0.9/fast-xml-parser",
        xmldom: "Third/xml/xmldom-0.6.0/xmldom",
        xpath: "Third/xml/xpath-0.0.34/xpath",

        // 自定义模块
        BitmapOperation: "Core/flash/Bitmap/BitmapOperation",
        checkUtil: "Core/flash/checkUtil",
        ElementAnim: "Core/flash/Context/Element/ElementAnim",
        ElementChecker: "Core/flash/Context/Element/ElementChecker",
        ElementOperation: "Core/flash/Context/Element/ElementOperation",
        ElementQuery: "Core/flash/Context/Element/ElementQuery",
        ElementTransform: "Core/flash/Context/Element/ElementTransform",
        FrameChecker: "Core/flash/Context/Frame/FrameChecker",
        KeyFrameChecker: "Core/flash/Context/KeyFrame/KeyFrameChecker",
        KeyFrameOperation: "Core/flash/Context/KeyFrame/KeyFrameOperation",
        KeyFrameQuery: "Core/flash/Context/KeyFrame/KeyFrameQuery",
        LayerChecker: "Core/flash/Context/Layer/LayerChecker",
        LayerHierarchy: "Core/flash/Context/Layer/LayerHierarchy",
        LayerOperation: "Core/flash/Context/Layer/LayerOperation",
        LayerQuery: "Core/flash/Context/Layer/LayerQuery",
        LayerQueryEnhance: "Core/flash/Context/Layer/LayerQueryEnhance",
        LibraryOperation: "Core/flash/Context/library/LibraryOperation",
        ElementSelect: "Core/flash/Context/selection/ElementSelect",
        FramesSelect: "Core/flash/Context/selection/FramesSelect",
        FilterChecker: "Core/flash/filter/FilterChecker",
        FilterOperation: "Core/flash/filter/FilterOperation",
        FilterQuery: "Core/flash/filter/FilterQuery",
        FolderChecker: "Core/flash/Folder/FolderChecker",
        FolderQuery: "Core/flash/Folder/FolderQuery",
        DrawCircle: "Core/flash/graphics/DrawCircle",
        DrawRectangle: "Core/flash/graphics/DrawRectangle",
        promptUtil: "Core/flash/panel/promptUtil",
        xmlPanelUtil: "Core/flash/panel/xmlPanelUtil",
        MoreElement: "Core/flash/Symbol/MoreElement",
        SymbolNameGenerator: "Core/flash/Symbol/SymbolNameGenerator",
        EaseCurve: "Core/flash/tween/EaseCurve",
        Tween: "Core/flash/tween/Tween",
        FUNC: "Core/myShim/FUNC",
        open: "Core/py/file/open",
        os: "Core/py/file/os",
        shutil: "Core/py/file/shutil",
        sys: "Core/py/file/sys",
        random: "Core/py/random/random",
        StringP: "Core/py/string/StringP",
        KeyFrameMode: "Core/Utils/KeyFrameMode",
        Tips: "Core/Utils/Tips"
    },
    packages: []
});
