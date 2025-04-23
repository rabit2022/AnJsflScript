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
     * 获取当前 文件夹 路径
     */
    function getcwd() {
        var scriptURI = fl.scriptURI;
        // 斜杠符号的位置
        var lastSlashIndex = scriptURI.lastIndexOf('/');
        // 获取脚本文件所在的文件夹路径
        var folderPath = scriptURI.substring(0, lastSlashIndex);
        return folderPath;
    }

    /**
     * Flash script 导入指定脚本文件
     * @param {...string} scriptPaths 相对于当前脚本文件的相对路径，或绝对路径（允许多个路径，可以混搭）
     */
    function importFlashScripts() {
        // region polyfills

        // String.prototype.startswith
        function startsWith(str, prefix) {
            return str.indexOf(prefix) === 0;
        }

        // String.prototype.endsWith
        function endsWith(str, suffix) {
            return str.lastIndexOf(suffix) === str.length - suffix.length;
        }

        // 获取当前脚本文件的所在文件夹路径
        function getcwd() {
            var scriptURI = fl.scriptURI;
            // 斜杠符号的位置
            var lastSlashIndex = scriptURI.lastIndexOf('/');
            // 获取脚本文件所在的文件夹路径
            var folderPath = scriptURI.substring(0, lastSlashIndex);
            return folderPath;
        }

        // 检查文件是否存在
        var fileExists = FLfile.exists;

        function assertPath(path) {
            if (typeof path !== 'string') {
                throw new TypeError('Path must be a string. Received ' + path + '.'); // 'Path must be a string. Received ' + JSON.stringify(path)
            }
        }

        function isAbsolute(path) {
            assertPath(path);
            // return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
            var ABSOLUTE_FLAG = 'file:///';
            return path.length > 0 && startsWith(path, ABSOLUTE_FLAG);
        }

        // endregion polyfills

        // 将 arguments 转换为数组
        var paths = Array.prototype.slice.call(arguments);
        var curWorkingDirectory = getcwd();

        paths.forEach(function (path) {
            // 转换为绝对路径
            var scriptURI = isAbsolute(path) ? path : curWorkingDirectory + '/' + path;

            // 结尾是.js后缀名时，替换为.jsfl后缀名
            if (endsWith(scriptURI, '.js')) {
                scriptURI = scriptURI.replace(/(\.[^.]*)?$/, '.jsfl');
            }
            // 结尾没有.jsfl后缀名时，添加.jsfl后缀名
            if (!/\.jsfl$/.test(scriptURI)) {
                scriptURI += '.jsfl';
            }

            // var message = '[importFlashScripts] Run script file [' + scriptURI + ']';
            // fl.trace(message);
            // 执行脚本
            var exists = fileExists(scriptURI);
            if (exists) {
                fl.runScript(scriptURI);
            } else {
                var message =
                    '[importFlashScripts] Error: Cannot find script file [' +
                    scriptURI +
                    ']';
                fl.trace(message);
                // console.stack(message);
                throw new Error(message);
            }
        });
    }

    function Main() {
        // bug:没有 打开 fla 文件时
        // doc没有打开时，无法获取DOM元素，因此需要先打开doc
        if (!fl.getDocumentDOM()) {
            alert(
                '【温馨提示】请打开一个【.fla】文件，再尝试运行这个文件。\n作者：b站 @穹的兔兔'
            );
            return;
        }

        // 全局变量
        window.importFlashScripts = importFlashScripts;
        /**
         * 项目文件夹路径
         * @type {string}
         */
        window.$ProjectFileDir$ = getcwd();

        var config = {
            'require-js': 'Third/modules/requirejs-2.3.7/require-js'
        };
        // 导入模块,相对路径导入
        importFlashScripts(config['require-js']);

        require([
            // 导入配置文件
            './require-config',

            // 导入shims, 避免其他模块依赖时报错
            'es5-shim', // es5,es2009
            'es5-sham',
            'es6-shim', // es6,es2015
            'es6-sham',
            'es7-shim', // es7,es2016
            'es2017', // es8,es2017

            'json3',
            'console'
        ]);

        require(['loglevel'], function (log) {
            // 禁用log
            log.setDefaultLevel(log.levels.SILENT);

            const info =
                '【温馨提示】导入成功！！！\n 如果有bug,或者建议，请@我。\n\n【注意】这个文件只是导入所需的模块，并没有安装功能。 \n作者：@穹的兔兔';
            alert(info);
        });
    }

    Main();
})();
