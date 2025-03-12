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
     * 导入指定脚本文件
     * @param {...string} scriptPaths 相对于当前脚本文件的相对路径，或绝对路径（允许多个路径，可以混搭）
     */
    function importFlashScripts() {
        // 获取当前 文件夹 路径
        function getcwd() {
            var scriptURI = fl.scriptURI;
            // 斜杠符号的位置
            var lastSlashIndex = scriptURI.lastIndexOf('/');
            // 获取脚本文件所在的文件夹路径
            var folderPath = scriptURI.substring(0, lastSlashIndex);
            return folderPath;
        }

        // 判断路径是否为绝对路径
        function isAbsolutePath(path) {
            var ABSOLUTE_FLAG = 'file:///';
            // 兼容es5
            return path.indexOf(ABSOLUTE_FLAG) === 0;
            // es6
            // return path.startsWith(ABSOLUTE_FLAG);
        }

        // 将 arguments 转换为数组
        var paths = Array.prototype.slice.call(arguments);
        var curWorkingDirectory = getcwd();

        paths.forEach(function (path) {
            var scriptURI;

            if (isAbsolutePath(path)) {
                scriptURI = path; // 绝对路径直接使用
            } else {
                // 拼接相对路径
                scriptURI = curWorkingDirectory + '/' + path;
            }

            // 执行脚本
            fl.runScript(scriptURI);
        });
    }

    function Main() {
        // 导入模块,相对路径导入
        importFlashScripts('Third/requirejs-2.3.7/require.jsfl');

        /**
         * 项目文件夹路径
         * @type {string}
         */
        window.$ProjectFileDir$ = getcwd();

        require([
            // 导入配置文件
            './require-config',

            // 导入shims, 避免其他模块依赖时报错
            'es5-shim',
            'es5-sham',
            'es6-shim',
            'es6-sham',

            'json3',
            // 补全console模块, 避免其他模块依赖console时报错
            'console'
        ]);

        require(['loglevel'], function (log) {
            // 禁用log
            log.setDefaultLevel(log.levels.SILENT);

        });

        // 导入完成
        // print('=============Core modules imported.=============');
        console.info('=============Core modules imported.=============');
    }

    Main();
})();
