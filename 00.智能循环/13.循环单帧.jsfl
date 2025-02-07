﻿/**
 * @file: 13.循环单帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 22:22
 * @project: AnJsflScript
 * @description:
 */

require(["checkUtil", "ele"], function (checkUtil, ele) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom(doc)) return;

    var selection = doc.selection;//选择
    var library = doc.library;//库文件
    var timeline = doc.getTimeline();//时间轴

    var layers = timeline.layers;//图层
    var curLayerIndex = timeline.currentLayer;//当前图层索引
    var curLayer = layers[curLayerIndex];//当前图层

    var curFrameIndex = timeline.currentFrame;//当前帧索引
    var curFrame = curLayer.frames[curFrameIndex];//当前帧

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;


        // 如果全部都是 "loop", targetLoop = "loop"
        // 否则 统一设置为 "single frame"
        var targetLoop = "single frame";

        var tempLoop = 0;
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            // 跳过  非元件
            if (!ele.IsSymbol(element)) {
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
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            if (ele.IsSymbol(element)) {
                element.loop = targetLoop;
            }
        }

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

