﻿/**
 * @file: 02.震惊-图层.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 15:34
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        // var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        // if (horizontalCount === null) return null;
        //
        // return {horizontalCount: horizontalCount};
    }

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

    // 关键帧
    var KEY_FRAMES = [FRAME_1, FRAME_3, FRAME_6];
    var ALTER_HEIGHT_FRAME = FRAME_3;
    // height  364.6,437.15   0.834
    //         238.6,286.1    0.8339
    // 6/5
    var ALTER_RATIO = 6 / 5;

    function KFrames() {
        doc.enterEditMode("inPlace");

        var selection = doc.selection;
        var timeline = doc.getTimeline();//时间轴
        
        var layers = timeline.layers;//图层
        var curLayerIndex = timeline.currentLayer;//当前图层索引
        var curLayer = layers[curLayerIndex];//当前图层
        
        
        ele.setTransformationPoint(selection[0], "bottom center");

        // 关键帧
        frUtil.convertToKeyframesSafety(timeline, curLayer, KEY_FRAMES);

        // 调整高度
        var frame_element = curLayer.frames[ALTER_HEIGHT_FRAME].elements[0];
        frame_element.height *= ALTER_RATIO;
        // print("调整高度" + frame_element.height);

        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);


        // 传统补间动画
        curve.setClassicEaseCurve(timeline);

        doc.exitEditMode();

    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        // 获取第一帧
        var frs = CheckSelectedFrames(timeline);
        if (frs === null) return;
        
        var symbolName = libUtil.generateNameUntilUnique("一键震惊_静_");
        doc.convertToSymbol('graphic', symbolName, 'center');

        var symbolName = libUtil.generateNameUseLast("一键震惊_动_");
        doc.convertToSymbol('graphic', symbolName, 'center');

        // 播放一次
        var selection = doc.selection;//选择
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            element.loop = "play once";
        }
        
        KFrames();
        
        // 重置选中帧
        frUtil.resetSelectedFrames(timeline, frs);
    }

    Main();
})();