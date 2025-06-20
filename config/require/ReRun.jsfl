/**
 * @file: ReRun.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/5 15:50
 * @project: AnJsflScript
 * @description:
 */

// 清除输出面板
fl.outputPanel.clear();

// 由于setTimeout的polyfill，与原生有差别，导致require.js加载失败，所以也要重置setTimeout
window.setTimeout = undefined;

// if (typeof require !== "undefined") {
require(["loglevel"], function (log) {

    // fl.trace("ReRun: Reloading RequireJS");

    // 清除当前的 RequireJS 实例
    window.requirejs = undefined;
    window.require = undefined;
    window.define = undefined;


    // fl.trace("ReRun: Reloading RequireJS");
    log.setLevel(log.levels.TRACE);
});
// }
