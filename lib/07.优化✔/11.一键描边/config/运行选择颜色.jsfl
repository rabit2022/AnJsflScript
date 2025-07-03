/**
 * @file: 运行选择颜色.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/27 00:03
 * @project: AnJsflScript
 * @description:放到与11.一键描边.jsfl同级目录下，运行即可
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

    function join() {
        var args = Array.prototype.slice.call(arguments);
        var path = args.join("/");
        return path;
    }

    var folderPath = getcwd();
    // console.log(folderPath);

    var select_color_script = join(folderPath, "11.一键描边", "00.选择颜色.I.jsfl");
    // console.log(select_color_script);

    fl.runScript(select_color_script);
})();
