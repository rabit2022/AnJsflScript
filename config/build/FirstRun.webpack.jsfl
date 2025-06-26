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

    function Main() {
        window.AnJsflScript = {};
        // window.AnJsflScript.importFlashScripts = importFlashScripts;
        /**
         * 项目文件夹路径
         * @type {string}
         */
        window.AnJsflScript.$ProjectFileDir$ = getcwd();

        // 导入Promise模块
        // require会被babel翻译为Promise,导致报错
        /* provided dependency */ var Promise = __webpack_require__(/*! es6-promise */ "../../Third/polyfill/es6-promise-4.6.8/es6-promise.auto.jsfl")["Promise"];

        require([
            // 导入配置文件
            // "./require-config",

            "document-cookie",// loglevel,store.js 依赖 document.cookie
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
