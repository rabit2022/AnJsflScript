﻿/**
 * @file: 07.一键甩头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 14:56
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkDom() {
        if (doc == null) {
            // throw new Error("请打开 [.fla] 文件");
            alert("请打开 [.fla] 文件");
            return false;
        }
        return true;
    }

    function checkSelection() {
        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
        if (selection.length > 1) {
            alert("请选择单个元件");
            return false;
        }
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        // var horizontalCount = xmlPanelUtil.parseNumber(panel.horizontalCount, "横向排布数量只能输入数字，请重新输入。");
        // if (horizontalCount === null) return null;
        //
        // return {horizontalCount: horizontalCount};
    }

    function checkSelectedFrames() {
        var frs = frUtil.getSelectedFrs(timeline);
        if (frs.length < 1) {
            alert("请选择至少一个帧");
            return null;
        }
        return frs;
    }

    var doc = fl.getDocumentDOM();//文档
    if (!checkDom()) return;
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkSelection()) return;
        // var config = checkXMLPanel();
        // if (config === null) return;
        // var horizontalCount = config.horizontalCount;

        // 选中的所有帧 的第一帧
        var frs = checkSelectedFrames();
        if (frs === null) return;
        var firstFrame = frs[0].startFrame;

        var direction = promptUtil.parseDirection("输入头部朝向(默认为右，空格为左)：",
            {"右": 1, " ": -1, "左": -1});
        if (direction === null) {
            return;
        }

        // 变形点
        var element = selection[0];
        var trPoint = pointUtil.getShakeHeadTrPoint(element1);
        element.setTransformationPoint(trPoint);

        // 1,11
        var frame_1 = firstFrame + FRAME_1;
        var frame_11 = firstFrame + FRAME_11;

        // 关键帧
        timeline.convertToKeyframes(frame_1);
        timeline.convertToKeyframes(frame_11);

        // 选中帧
        timeline.setSelectedFrames(frame_1, frame_11, true);

        // 传统补间，顺时针旋转，1
        curve.setClassicEaseCurve(timeline);
        curve.setTweenRotation(timeline, "clockwise", 1);

        // 重置选中帧
        frUtil.resetSelectedFrames(timeline,frs);

    }

    Main();
})();