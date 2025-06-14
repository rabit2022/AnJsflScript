/**
 * @file: FirstRun.webpack.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:45
 * @project: AnJsflScript
 * @description:无法运行，只用于生成 webpack 打包文件
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

    // region setTimeout polyfill
    /**
     * 用于存储所有定时器的数组。
     * @type {Array.<{eventID: number, startTime: number, delay: number}>}
     */
    var timers = [];

    /**
     * 模拟 JavaScript 的 Timeout 对象。
     * @constructor
     * @param {function} callbackFunction - 延迟后要执行的回调函数。
     * @param {number} delay - 延迟时间（单位：毫秒）。
     */
    function Timeout(callbackFunction, delay) {
        /**
         * 延迟时间（单位：毫秒）。
         * @type {number}
         */
        this._idleTimeout = delay;

        /**
         * 回调函数。
         * @type {function}
         */
        this._onTimeout = callbackFunction;

        /**
         * 定时器的唯一标识符。
         * @type {number|null}
         */
        this._timerID = null;

        /**
         * 是否已被销毁（取消）。
         * @type {boolean}
         */
        this._destroyed = false;

        // 初始化定时器
        this._startTimer();
    }

    /**
     * 启动定时器。
     * @private
     */
    Timeout.prototype._startTimer = function () {
        var self = this;

        // 获取当前时间戳
        var startTime = new Date().getTime();

        /**
         * 检查延迟是否已达到的回调函数。
         * @private
         */
        function checkDelay() {
            var currentTime = new Date().getTime();
            if (currentTime - startTime >= self._idleTimeout && !self._destroyed) {
                self._onTimeout(); // 执行目标回调函数
                self._clearTimer(); // 清除定时器
            }
        }

        // 注册 mouseMove 事件侦听器
        var eventID = fl.addEventListener("mouseMove", checkDelay);

        // 生成一个唯一的定时器 ID
        var timerID = timers.length;

        // 将定时器信息存储到 timers 数组中
        timers.push({
            eventID: eventID,
            startTime: startTime,
            delay: self._idleTimeout
        });

        // 保存定时器 ID
        self._timerID = timerID;
    };

    /**
     * 清除定时器。
     * @private
     */
    Timeout.prototype._clearTimer = function () {
        if (this._timerID !== null) {
            // 获取对应的事件 ID
            var eventID = timers[this._timerID].eventID;

            // 移除事件侦听器
            fl.removeEventListener("mouseMove", eventID);

            // 从 timers 数组中移除该定时器
            timers.splice(this._timerID, 1);

            // 标记为销毁
            this._destroyed = true;
        }
    };

    /**
     * 取消定时器。
     */
    Timeout.prototype.clear = function () {
        this._clearTimer();
    };

    /**
     * 创建一个 Timeout 实例。
     * @param {function} callbackFunction - 延迟后要执行的回调函数。
     * @param {number} delay - 延迟时间（单位：毫秒）。
     * @returns {Timeout} 返回一个 Timeout 实例。
     */
    function setTimeout(callbackFunction, delay) {
        return new Timeout(callbackFunction, delay);
    }

    // endregion setTimeout polyfill

    function Main() {
        window.AnJsflScript = {};
        // window.AnJsflScript.importFlashScripts = importFlashScripts;
        /**
         * 项目文件夹路径
         * @type {string}
         */
        window.AnJsflScript.$ProjectFileDir$ = getcwd();
        /**
         * 其他脚本的  存储变量
         * @type {{}}
         */
        window.AnJsflScript.GLOBALS = {};

        // var config = {
        //     "require-js": "Third/modules/requirejs-2.3.7/require-js"
        // };
        // // 导入模块,相对路径导入
        // window.AnJsflScript.importFlashScripts(config["require-js"]);

        // 由于setTimeout的polyfill，与原生有差别，导致require.js加载失败，所以必须先加载require.js
        // 想要使用Promise(es6-shim或es6-sham),需要在 setTimeout
        window.setTimeout = setTimeout;

        // 导入Promise模块
        // require会被babel翻译为Promise,导致报错
        /* provided dependency */ var Promise = __webpack_require__(
            /*! es6-promise */ "./Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl"
        )["Promise"];

        require([
            // 导入配置文件
            // "./require-config",

            "es6-promise",

            // 导入shims, 避免其他模块依赖时报错
            "es5-shim", // es5,es2009
            "es5-sham",
            "es6-shim", // es6,es2015
            "es6-sham",
            "es7-shim", // es7,es2016
            "es2017", // es8,es2017

            "json3"
            // "console"
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
