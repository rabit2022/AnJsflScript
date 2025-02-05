﻿/**
 * @file: 04.一键抬头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 13:57
 * @project: AnJsflScript
 * @description:
 */

(function () {
    var descriptions = {
        "file": "04.一键抬头.jsfl",
        "file description": "抬头的动作",
        "selection": "仅一个元件",
        "selection description": "选中头部",
        "XMLPanel": false,
        "input parameters": {
            "头部朝向": "右",
            "抬头角度": 15
        },
        "detail": "更改transform",
        "detail description": "更改元件的旋转",
        "steps": [
            "更改旋转"
        ]
    };
    var doc = fl.getDocumentDOM();//文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection;//选择
    var library = doc.library;//库文件
    var timeline = doc.getTimeline();//时间轴

    var layers = timeline.layers;//图层
    var curLayerIndex = timeline.currentLayer;//当前图层索引
    var curFrameIndex = timeline.currentFrame;//当前帧索引
    var curLayer = layers[curLayerIndex];//当前图层
    var curFrame = curLayer.frames[curFrameIndex];//当前帧

    function Main() {
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        var direction = promptUtil.parseDirection("请输入头部朝向(默认为右，空格为左)",
            {"右": -1, "左": 1, " ": 1});
        if (direction === null) return;

        var angle = promptUtil.parseNumber("请输入抬头角度(度)", 15, "请输入正确的抬头角度，例如“15”");
        if (angle === null) return;
        // print("direction:" + direction + " angle:" + angle);

        var element = selection[0];
        element.rotation = direction * angle;
    }

    Main();
})();