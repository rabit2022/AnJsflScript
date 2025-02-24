/**
 * @file: ReRun.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/5 15:50
 * @project: AnJsflScript
 * @description:
 */

// 定义一个标志变量，用于控制是否处于调试模式
var DEBUG_MODE = true; // 在调试模式下设置为 true，在生产模式下设置为 false

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
    function Main() {
        // 清除当前的 RequireJS 实例
        window.requirejs = undefined;
        window.require = undefined;
        window.define = undefined;
    }

    Main();
})();
