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
        'core-js': 'Third/core-js-3.41.0',
        'es5-sham': 'Third/es5-shim-4.6.7/es5-sham',
        'es5-shim': 'Third/es5-shim-4.6.7/es5-shim',
        'es6-sham': 'Third/es6-shim-0.35.4/es6-sham',
        'es6-shim': 'Third/es6-shim-0.35.4/es6-shim',
        linq: 'Third/linq-4.0.3/linq',
        lodash: 'Third/lodash-4.17.21/lodash',
        loglevel: 'Third/loglevel-1.9.2/loglevel',
        'path-browserify': 'Third/path-browserify-1.0.1/path-browserify',
        require: 'Third/requirejs-2.3.7/require',
        json3: 'Third/json3-3.3.3/json3',
        sprintf: 'Third/sprintf-js-1.1.3/sprintf',



        Constants: 'Core/Constants/Constants',
        JSFLConstants: 'Core/Constants/JSFLConstants',
        console: 'Core/myShim/console',
        frameRange: 'Core/Object/frameRange',
        frameRangeUtil: 'Core/Object/frameRangeUtil',
        moreElement: 'Core/Object/moreElement',
        moreElementUtil: 'Core/Object/moreElementUtil',
        linqUtil: 'Core/Third/linqUtil',
        SAT: 'Core/Third/sat-js-0.9.0/SAT',
        satUtil: 'Core/Third/satUtil',
        FUNC: 'Core/myShim/FUNC',
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
    ]
});
