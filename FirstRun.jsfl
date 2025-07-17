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
        var lastSlashIndex = scriptURI.lastIndexOf("/");
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
            var lastSlashIndex = scriptURI.lastIndexOf("/");
            // 获取脚本文件所在的文件夹路径
            var folderPath = scriptURI.substring(0, lastSlashIndex);
            return folderPath;
        }

        // 检查文件是否存在
        var fileExists = FLfile.exists;

        function assertPath(path) {
            if (typeof path !== "string") {
                throw new TypeError("Path must be a string. Received " + path + "."); // 'Path must be a string. Received ' + JSON.stringify(path)
            }
        }

        function isAbsolute(path) {
            assertPath(path);
            // return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
            var ABSOLUTE_FLAG = "file:///";
            return path.length > 0 && startsWith(path, ABSOLUTE_FLAG);
        }

        // endregion polyfills

        // 将 arguments 转换为数组
        var paths = Array.prototype.slice.call(arguments);
        var curWorkingDirectory = getcwd();

        paths.forEach(function (path) {
            // 转换为绝对路径
            var scriptURI = isAbsolute(path) ? path : curWorkingDirectory + "/" + path;

            // 结尾是.js后缀名时，替换为.jsfl后缀名
            if (endsWith(scriptURI, ".js")) {
                scriptURI = scriptURI.replace(/(\.[^.]*)?$/, ".jsfl");
            }
            // 结尾没有.jsfl后缀名时，添加.jsfl后缀名
            if (!/\.jsfl$/.test(scriptURI)) {
                scriptURI += ".jsfl";
            }

            // var message = '[importFlashScripts] Run script file [' + scriptURI + ']';
            // fl.trace(message);
            // 执行脚本
            var exists = fileExists(scriptURI);
            if (exists) {
                fl.runScript(scriptURI);
            } else {
                var message =
                    "[importFlashScripts] Error: Cannot find script file [" +
                    scriptURI +
                    "]";
                fl.trace(message);
                // console.stack(message);
                throw new Error(message);
            }
        });
    }

    function Main() {
        window.AnJsflScript = {};
        window.AnJsflScript.importFlashScripts = importFlashScripts;
        /**
         * 项目文件夹路径
         * @type {string}
         */
        window.AnJsflScript.$ProjectFileDir$ = getcwd();

        window.AnJsflScript.FOLDERS = {
            Log: window.AnJsflScript.$ProjectFileDir$ + "/config/Log", // console.log 输出日志
            Cache: window.AnJsflScript.$ProjectFileDir$ + "/config/Cache", // 12.#磁力粘贴.jsfl,缓存文件夹
            AsciiArtLibrary:
                window.AnJsflScript.$ProjectFileDir$ + "/config/ascii_art_library", // 02.排兵布阵_ascii_art.jsfl 字体库文件夹
            Save: window.AnJsflScript.$ProjectFileDir$ + "/config/Save", // 存档文件夹
            Scripts: window.AnJsflScript.$ProjectFileDir$ + "/Scripts", // 脚本文件夹
        };

        var config = {
            "require-js": "Third/modules/requirejs-2.3.7/require-js"
        };
        // 导入模块,相对路径导入
        window.AnJsflScript.importFlashScripts(config["require-js"]);

        // 由于setTimeout的polyfill，与原生有差别，导致require.js加载失败，所以必须先加载require.js
        // 想要使用Promise(es6-shim或es6-sham),需要在 setTimeout
        // window.setTimeout = setTimeout;

        require([
            // 导入配置文件
            "./config/require/require.config",

            "es6-promise", // babel 转译 依赖 Promise

            // 导入shims, 避免其他模块依赖时报错
            "es5-shim", // es5,es2009
            "es5-sham",
            "es6-shim", // es6,es2015
            "es6-sham",
            "es7-shim", // es7,es2016
            "es2017", // es8,es2017

            "json3",
            "console",

            "document-cookie" // loglevel,store.js 依赖 document.cookie
        ]);

        require(["loglevel", "Tips"], function (log, Tips) {
            // 禁用log
            log.setDefaultLevel(log.levels.SILENT);

            // 显示提示信息
            const { alertMessage } = Tips;
            alertMessage("loading success!");
            if (!window.AnJsflScript.$ProjectFileDir$.includes("AnJsflScript")) {
                alertMessage("loading might be not allowed!");
            }
        });
    }

    Main();
})();
