﻿/**
 * @file: 13.循环单帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 22:22
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "ElementAnim", "ElementChecker", "KeyFrameOperation"], function (
    checkUtil,
    ea,
    ec,
    kfo
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { SetLoopMode } = ea;
    const { IsSymbol } = ec;
    const { KFrameOnlyOne } = kfo;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function Main() {
        // 关键帧
        KFrameOnlyOne(timeline);

        // 如果全部都是 "loop", targetLoop = "loop"
        // 否则 统一设置为 "single frame"
        var targetLoop = "single frame";

        var tempLoop = 0;
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            // 跳过  非元件
            if (!IsSymbol(element)) {
                continue;
            }

            // 计数loop的元素数量
            if (element.loop === "loop") {
                tempLoop++;
            } else {
                // 一旦发现有一个元素的loop属性不等于"loop"，即可确定targetLoop应为"single frame"
                // targetLoop = "single frame";
                break;
            }
        }

        // 如果所有检查过的元素loop属性都等于"loop"，则设置targetLoop为"loop"
        if (tempLoop > 0 && tempLoop === selection.length) {
            targetLoop = "loop";
        }

        // 设置所有选中元素的loop属性
        SetLoopMode(selection, targetLoop);

        // // 原始版本
        // var firstElement = selection[0];
        // if (!ele.IsSymbol(firstElement)) {
        //     return;
        // }
        //
        // if (firstElement.loop === "single frame") {
        //     firstElement.loop = "loop";
        // } else {
        //     firstElement.loop = "single frame";
        // }
    }

    Main();
});
