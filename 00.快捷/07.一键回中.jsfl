﻿/**
 * @file: 07.一键回中.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 16:33
 * @project: AnJsflScript
 * @description:
 */

require(['checkUtil', 'SAT'], function (checkUtil, sat) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle,
        wrapPosition = sat.GLOBALS.wrapPosition;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'Not Zero')) return;

        // 获取屏幕的宽高
        var screenWidth = doc.width;
        var screenHeight = doc.height;
        var screenCenterPoint = new Vector(screenWidth / 2, screenHeight / 2);

        // 获取选中内容的边界
        var boundsCenterPoint = new Rectangle(
            doc.getSelectionRect()
        ).getCenterVector();

        // 计算偏移量
        var offset = screenCenterPoint.clone().sub(boundsCenterPoint);

        // 移动所有选中的元件到屏幕中心
        doc.moveSelectionBy(offset.toObj());
    }

    Main();
});
