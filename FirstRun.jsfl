/**
 * @file: FirstRun.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:45
 * @project: AnJsflScript
 * @description:每一次打开An时，都要 执行此脚本，用于初始化一些必要的模块。
 */

(function () {
    /**
     * 获取当前脚本文件的所在文件夹路径
     * @returns {string}
     */
    function getCurFolderURI() {
        // 获取当前脚本文件的完整路径
        var scriptURI = fl.scriptURI;
        // 获取路径中最后一个“/”的位置
        var lastSlashIndex = scriptURI.lastIndexOf('/');
        // 获取脚本文件所在的文件夹路径
        var folderPath = scriptURI.substring(0, lastSlashIndex);
        return folderPath;
    }

    /**
     * 导入指定脚本文件
     * @param {string} relativeScriptPath 相对于当前脚本文件的相对路径
     */
    function importMoudle(relativeScriptPath) {
        var curFolderURI = getCurFolderURI();
        var scriptURI = curFolderURI + '/' + relativeScriptPath;

        fl.runScript(scriptURI);
    }

    function Main() {
        // 导入模块,相对路径导入
        importMoudle('Third/requirejs-2.3.7/require.jsfl');

        /**
         * 项目文件夹路径
         * @type {string}
         */
        window.PROJECT_FOLDER = getCurFolderURI();

        require.config({
            baseUrl: window.PROJECT_FOLDER, // 设置模块的基础路径
            paths: {
                'es5-sham': 'Third/es5-shim-4.6.7/es5-sham',
                'es5-shim': 'Third/es5-shim-4.6.7/es5-shim',
                'es6-sham': 'Third/es6-shim-0.35.4/es6-sham',
                'es6-shim': 'Third/es6-shim-0.35.4/es6-shim',
                linq: 'Third/linq-4.0.3/linq',
                linqUtil: 'Third/linq-4.0.3/linqUtil',
                loglevel: 'Third/loglevel-1.9.2/loglevel',
                'path-browserify':
                    'Third/path-browserify-1.0.1/path-browserify',
                require: 'Third/requirejs-2.3.7/require',
                SAT: 'Third/sat-js-0.9.0/SAT',
                satUtil: 'Third/sat-js-0.9.0/satUtil',

                console: 'Core/myShim/console',
                shim: 'Core/myShim/shim',
                frameRange: 'Core/Object/frameRange',
                frameRangeUtil: 'Core/Object/frameRangeUtil',
                moreElement: 'Core/Object/moreElement',
                moreElementUtil: 'Core/Object/moreElementUtil',
                Log: 'Core/TopLevel/Log',
                Common: 'Core/Utils/custom/Common',
                Constants: 'Core/Utils/custom/Constants',
                JSFLConstants: 'Core/Utils/custom/JSFLConstants',
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
                StringP: 'Core/Utils/py/StringP',
            },
            map: {
                '*': {
                    // sat: 'SAT',
                    // sel: 'selectionUtil',
                    // selection: 'selectionUtil',
                    // me: 'moreElement',
                    // meUtil: 'moreElementUtil',
                    // ele: 'elementUtil',
                    // curve: 'curveUtil',
                    // graphics: 'graphicsUtil',
                    // fr: 'frameRange',
                    // frUtil: 'frameRangeUtil',
                },
            },
        });

        // 当前es3(es1999)环境,补齐es5(es2009)和es6(es2015)的一些方法
        require([
            'es5-shim',
            'es5-sham',
            'es6-shim',
            'es6-sham',
            'shim',
            'console',
        ]);

        // 禁用log
        require(['loglevel'], function (log) {
            log.setDefaultLevel(log.levels.SILENT);
        });

        // 导入完成
        fl.trace('=============Core modules imported.=============');
    }

    Main();
})();
