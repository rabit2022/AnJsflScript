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
        Class: 'Third/Class/Class.js-0.0.1/Class',
        Interface: 'Third/Class/Class.js-0.0.1/Interface',
        eventemitter3: 'Third/event/eventemitter3-5.0.1/eventemitter3',
        rxjs: 'Third/event/rxjs-7.8.2/rxjs.umd',
        loglevel: 'Third/log/loglevel-1.9.2/loglevel',
        'path-browserify': 'Third/modules/path-browserify-1.0.1/path-browserify',
        require: 'Third/modules/requirejs-2.3.7/require',
        'es5-sham': 'Third/polyfill/es5-shim-4.6.7/es5-sham',
        'es5-shim': 'Third/polyfill/es5-shim-4.6.7/es5-shim',
        'es6-sham': 'Third/polyfill/es6-shim-0.35.4/es6-sham',
        'es6-shim': 'Third/polyfill/es6-shim-0.35.4/es6-shim',
        'es7-shim': 'Third/polyfill/es7-shim-6.0.0/es7-shim',
        json3: 'Third/json/json3-3.3.3/json3',
        es2017: 'Third/polyfill/polyfill-0.1.43/es2017',
        'error-stack-parser': 'Third/stack/error-stack-parser-3.0.0/error-stack-parser',
        stackframe: 'Third/stack/stackframe-1.3.4/stackframe',
        linq: 'Third/utils/linq-4.0.3/linq',
        lodash: 'Third/utils/lodash-4.17.21/lodash',
        sprintf: 'Third/utils/sprintf-js-1.1.3/sprintf',
        xmldom: 'Third/xml/xmldom-0.6.0/xmldom',
        jquery: 'Third/xml/jquery-3.7.1/jquery.slim',
        'circular-json': 'Third/json/circular-json-0.5.9/circular-json.amd',
        'fast-xml-parser': 'Third/xml/fast-xml-parser-5.0.9/fast-xml-parser',
        xpath: 'Third/xml/xpath-0.0.34/xpath',


        // 自定义模块
        test: 'Core/test/test',
        open: 'Core/Utils/py/open',
        KeyFrameMode: 'Core/Utils/mode/KeyFrameMode',
        ErrorDefinitions: 'Core/myShim/ErrorDefinitions',
        FUNC: 'Core/myShim/FUNC',
        frameRange: 'Core/Object/frameRange',
        frameRangeUtil: 'Core/Object/frameRangeUtil',
        moreElement: 'Core/Object/moreElement',
        moreElementUtil: 'Core/Object/moreElementUtil',
        LayerManager: 'Core/Third/FlashTool/LayerManager',
        LibraryManager: 'Core/Third/FlashTool/LibraryManager',
        Navigation: 'Core/Third/FlashTool/Navigation/Navigation',
        linqUtil: 'Core/Third/linqUtil',
        SAT: 'Core/Third/sat-js-0.9.0/SAT',
        satUtil: 'Core/Third/satUtil',
        console: 'Core/Third/xjsfl/console',
        JSFLConstants: 'Core/Third/xjsfl/flash/JSFLConstants',
        JSFLInterface: 'Core/Third/xjsfl/flash/JSFLInterface',
        Utils: 'Core/Third/xjsfl/Utils/Utils',
        checkUtil: 'Core/Utils/flash/checkUtil',
        curveUtil: 'Core/Utils/flash/curveUtil',
        elementUtil: 'Core/Utils/flash/elementUtil',
        filterUtil: 'Core/Utils/flash/filterUtil',
        graphicsUtil: 'Core/Utils/flash/graphicsUtil',
        layerUtil: 'Core/Utils/flash/layerUtil',
        libUtil: 'Core/Utils/flash/libUtil',
        promptUtil: 'Core/Utils/flash/promptUtil',
        selectionUtil: 'Core/Utils/flash/selectionUtil',
        xmlPanelUtil: 'Core/Utils/flash/xmlPanelUtil',
        os: 'Core/Utils/py/os',
        random: 'Core/Utils/py/random',
        StringP: 'Core/Utils/py/StringP'
    },
    packages: []
});
