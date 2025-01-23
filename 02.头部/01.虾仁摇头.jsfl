﻿/**
 * @file: 01.虾仁摇头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 19:50
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function checkDom() {
        if (doc == null) {
            throw new Error("请打开 [.fla] 文件");
        }
    }

    function checkSelection() {
        // if (selection.length < 1) {
        //     alert("请选择元件？");
        //     return false;
        // }
        // if (selection.length > 1) {
        //     alert("请选择单个元件");
        //     return false;
        // }
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

        var shakeIntensity = xmlPanelUtil.parseNumber(panel.shakeIntensity, "摇头强度只能输入数字，请重新输入。");
        if (shakeIntensity === null) return null;

        var headDirection = xmlPanelUtil.parseNumber(panel.headDirection);
        if (headDirection === null) return null;

        return {shakeIntensity: shakeIntensity, headDirection: headDirection};
    }


    var doc = fl.getDocumentDOM();//文档
    checkDom();
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkSelection()) {
            return;
        }

        // 配置参数
        var config = checkXMLPanel();
        if (config === null) return;
        var shakeIntensity = config.shakeIntensity;
        var headDirection = config.headDirection;

        var symbolName = libUtil.generateNameUntilUnique("虾仁摇头_");
        doc.convertToSymbol('graphic', symbolName, 'center');


        // x:中间位置, y:(bottom-middle) *80%
        var element = selection[0];
        var eleRect = wrapRectByElement(element);
        // var eleCenter = eleRect.center();
        var offsetY = (eleRect.height / 2) * 0.8;
        
        var Offset=new Point(0,offsetY);
        
        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();
        
        // 设置变形点
        var element1= timeline.layers[0].frames[0].elements[0];
        element1.setTransformationPoint(Offset.toObj());
        
        // 给所有图层加帧
        timeline.insertFrames(FRAME_7, true);
        // 关键帧 1,4,7
        timeline.convertToKeyframes(FRAME_4);
        timeline.convertToKeyframes(FRAME_7);

        var frame4_element = timeline.layers[0].frames[FRAME_4].elements[0];
        frame4_element.rotation = headDirection * shakeIntensity;

        SelectAllTl(timeline);

        timeline.createMotionTween();
        curve.setClassicEaseCurve(timeline);

        doc.exitEditMode();

    }

    Main();
})();