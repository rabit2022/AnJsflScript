/**
 * @file: ReRun.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/5 15:50
 * @project: AnJsflScript
 * @description:
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
        var lastSlashIndex = scriptURI.lastIndexOf("/");
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
        var scriptURI = curFolderURI + "/" + relativeScriptPath;

        fl.runScript(scriptURI);
    }

    function Main() {
        // 清除当前的 RequireJS 实例
        window.requirejs = undefined;
        window.require = undefined;
        window.define = undefined;

        var requirejsScript = "Third/requirejs-2.3.7/require.jsfl";
        // 重新加载 require.js 脚本
        importMoudle(requirejsScript);

        fl.trace("ReRun require js script: " + requirejsScript);
    }

    Main();
})();