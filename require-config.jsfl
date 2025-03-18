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
        loglevel: 'Third/log/loglevel-1.9.2/loglevel',
        'path-browserify':
            'Third/modules/path-browserify-1.0.1/path-browserify',
        require: 'Third/modules/requirejs-2.3.7/require',
        'es5-sham': 'Third/shims/es5-shim-4.6.7/es5-sham',
        'es5-shim': 'Third/shims/es5-shim-4.6.7/es5-shim',
        'es6-sham': 'Third/shims/es6-shim-0.35.4/es6-sham',
        'es6-shim': 'Third/shims/es6-shim-0.35.4/es6-shim',
        'es7-shim': 'Third/shims/es7-shim-6.0.0/es7-shim',
        json3: 'Third/shims/json3-3.3.3/json3',
        'error-stack-parser':
            'Third/stack/error-stack-parser-3.0.0/error-stack-parser',
        stackframe: 'Third/stack/stackframe-1.3.4/stackframe',
        linq: 'Third/utils/linq-4.0.3/linq',
        lodash: 'Third/utils/lodash-4.17.21/lodash',
        rxjs: 'Third/utils/rxjs-7.8.2/rxjs.umd',
        sprintf: 'Third/utils/sprintf-js-1.1.3/sprintf',

        Constants: 'Core/Constants/Constants',
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
        Class: 'Core/Third/xjsfl/Utils/Class',
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
        builtInP: 'Core/Utils/py/builtInP',
        os: 'Core/Utils/py/os',
        random: 'Core/Utils/py/random',
        StringP: 'Core/Utils/py/StringP'
    },
    packages: [
        // {
        //     name: 'core-js/stable/json',
        //     location: 'Third/core-js-3.41.0/stable/json',
        //     main: 'index'
        // }, {
        //     name: 'core-js/es/json',
        //     location: 'Third/core-js-3.41.0/es/json',
        //     main: 'index'
        // }
        // 'core-js/stable/promise'
        // {
        //     name: 'core-js/stable/promise',
        //     location: 'Third/core-js-3.41.0/stable/promise',
        //     main: 'index'
        // }, {
        //     name: 'core-js/es/promise',
        //     location: 'Third/core-js-3.41.0/es/promise',
        //     main: 'index'
        // }
    ]
});
