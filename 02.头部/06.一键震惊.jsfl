﻿/**
 * @file: 06.一键震惊.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 14:08
 * @project: AnJsflScript
 * @description:
 */

(function () {
    var descriptions = {
        "file": "06.一键震惊.jsfl",
        "file description": "头部震惊的动作，必须一个图层一个元件",
        "selection": "仅一个元件",
        "selection description": "选中头部",
        "XMLPanel": false,
        "input parameters": {},
        "detail": "直接k帧",
        "detail description": "更改元件的 缩放,由于选中帧有多个元件时，补间动画会出现问题，所以这里选中帧的图层上，只能有一个元件。",
        "steps": [
            "设置变形点",
            "获取选择的第一帧",
            "更改缩放",
            "补间动画"
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

    var KEY_FRAMES = [FRAME_1, FRAME_3, FRAME_6];
    
    function Main() {
        if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

        // 第一帧
        var frs = CheckSelectedFrames(timeline);
        if (frs === null) return;
        var firstFrame = frs[0].startFrame;
        var firstLayer = layers[frs[0].layerIndex];

        // 变形点
        ele.setTransformationPoint(selection[0], "bottom center");

        KEY_FRAMES=arrUtil.addOffset(KEY_FRAMES,firstFrame);
        
        // 关键帧
        frUtil.convertToKeyframesSafety(timeline, curLayerIndex, KEY_FRAMES);

        // 3
        var frame3_element = firstLayer.frames[frame_3].elements[0];
        frame3_element.scaleY = 1.6;
        
        // 选中1-5帧
        timeline.setSelectedFrames(frame_1, frame_6, true);
        // 传统补间动画
        curve.setClassicEaseCurve(timeline);
        
        // 重置选中帧
        frUtil.resetSelectedFrames(timeline, frs);
    }

    Main();
})();