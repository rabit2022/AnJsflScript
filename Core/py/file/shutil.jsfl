/**
 * @file: shutil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/23 22:15
 * @project: AnJsflScript
 * @description:
 */


define(function() {
    function shutil() {}

    /**
     * 复制文件
     * @param {string} src 源文件路径
     * @param {string} dst 目标文件路径
     */
    shutil.copyfile = FLfile.copy;


    return shutil;
});