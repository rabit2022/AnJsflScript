/**
 * @file: 01.运行所有模块.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/28 22:15
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel"], function (checkUtil, log) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var frs = CheckSelectedFrames(timeline);
    // if (frs === null) return;
    // var firstLayer = layers[frs[0].layerIndex];
    // var firstFrame = frs[0].startFrame;

    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 假设 require.s.contexts._.config 已经定义
        const config = require.s.contexts._.config || {};
        const paths = config.paths || {};

        // 提取所有模块名称
        var moduleNames = Object.keys(paths);

        // // 排除 core-js 模块
        // moduleNames = moduleNames.filter(function (moduleName) {
        //     return moduleName !== "core-js";
        // });
        log.info(moduleNames);

        // 加载所有模块
        moduleNames.forEach(function (moduleName) {
            log.info('Loading module "%s"...', moduleName);
            require([moduleName], function (module) {
                // console.log('Module "%s" loaded: %s', moduleName, module);
                log.info('Module "%s" loaded.', moduleName);
            });
        });
    }

    Main();
});
