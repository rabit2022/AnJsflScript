/**
 * @file: CheckEnvironment.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/11 22:06
 * @project: AnJsflScript
 * @description:
 */

(function() {
    /**
     * 退出程序并输出错误信息
     * @param {string} msg - 错误信息
     */
    function exit(msg) {
        fl.trace(msg);
        throw new Error(msg);
    }

    /**
     * 获取项目路径，提取 "AnJsflScript","AnJsflScript-master", "AnJsflScript-dev" 及其之前的路径部分
     * @returns {string} - 提取的项目路径或错误信息
     */
    function getProjectPath() {
        const pattern = fl.scriptURI.match(/(?:^|.*[\\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\\/]|$)/)[1];
        const match = fl.scriptURI.match(pattern);

        if (match) {
            const projectName = match[0];
            const index = fl.scriptURI.lastIndexOf(projectName);

            const projectPath = fl.scriptURI.substring(0, index + projectName.length);
            return projectPath;
        }

        exit(
            "【温馨提示】你可能使用的是盗版软件，这个是开源的项目，如果花费了金钱购买，请退款。\n\n作者：@穹的兔兔\n QQ：3101829204\n 地址：https://github.com/rabit2022/AnJsflScript"
        );
    }

    /**
     * 合并多个路径。
     * @param {...string} paths - 要合并的路径数组。
     * @return {string} - 合并后的路径。
     */
    var OSPath_join = function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        var result = paths.join("/").replace(/\/+/g, "/");
        if (result.length > 0 && result.charAt(result.length - 1) === "/") {
            result = result.substring(0, result.length - 1);
        }

        // 确保路径以 file:/// 开头
        result = result.replace("file:/", "file:///");
        return result;
    };

    // polyfills
    function String_includes(str, search) {
        return str.indexOf(search) !== -1;
    }

    // bug:没有 打开 fla 文件时
    // doc没有打开时，无法获取DOM元素，因此需要先打开doc
    if (!fl.getDocumentDOM()) {
        exit(
            "【温馨提示】请打开一个【.fla】文件，再尝试运行这个文件。\n作者：b站 @穹的兔兔"
        );
    }

    // bug,Temp 未解压
    if (String_includes(getProjectPath(), "AppData/Local/Temp")) {
        exit("【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔");
    }

    // bug,FirstRun.jsfl 未运行
    if (typeof require === "undefined") {
        // exit(
        //     "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔"
        // );
        const FirstRun = OSPath_join(getProjectPath(), "FirstRun.jsfl");
        fl.runScript(FirstRun);
    }
})();
