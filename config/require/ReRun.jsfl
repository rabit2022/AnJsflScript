/**
 * @file: ReRun.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/5 15:50
 * @project: AnJsflScript
 * @description:
 */

require(['loglevel'], function (log) {
    // 清除输出面板
    fl.outputPanel.clear();

    // 清除当前的 RequireJS 实例
    window.requirejs = undefined;
    window.require = undefined;
    window.define = undefined;

    log.setLevel(log.levels.TRACE);
});
