﻿/**
 * @file: #06.灵魂出窍.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 20:42
 * @project: AnJsflScript
 * @description:
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === "undefined") {
    var msg =
        "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
    var msg = "【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}
require([
    "checkUtil",
    "SAT",
    "SymbolNameGenerator",
    "Context",
    "KeyFrameOperation",
    "LayerQuery",
    "DrawRectangle"
], function (checkUtil, sat, sng, Context, kfo, lq, dr) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { Vector, Size } = sat;
    const { wrapSize, getSymbolBounds, wrapRectByCenter } = sat.GLOBALS;

    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { getLayersIndexByName } = lq;
    const { convertToKeyframesSafety } = kfo;
    const { drawRectangleWithoutLine } = dr;

    // var doc = fl.getDocumentDOM(); //文档
    // if (!checkDom(doc)) return;
    //
    // var selection = doc.selection; //选择
    // var library = doc.library; //库文件
    // var timeline = doc.getTimeline(); //时间轴
    //
    // var layers = timeline.layers; //图层
    // var curLayerIndex = timeline.currentLayer; //当前图层索引
    // var curLayer = layers[curLayerIndex]; //当前图层
    //
    // var curFrameIndex = timeline.currentFrame; //当前帧索引
    // var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    const context = new Context();
    context.update();
    const {
        doc,
        selection,
        library,
        timeline,
        AllLayers,
        curLayerIndex,
        curLayer,
        curFrameIndex,
        curFrame
    } = context;
    const { firstSlLayerIndex, firstSlFrameIndex } = context;

    // 渐变遮罩层
    var MASK_LAYER_INDEX = 0;
    // 宽高=位置+100
    var MASK_WIDTH = 100;
    var MASK_HEIGHT = 100;

    // offset=Point(-width,height/5)

    function getRect(element) {
        const bounds = getSymbolBounds(element);
        // log.info("bounds", bounds,bounds.center,bounds.size);
        const size = bounds.size;
        const addSize = new Size(100, 100);
        const newSize = size.add(addSize);

        const newRect = wrapRectByCenter(bounds.center, newSize);

        // log.info("newRect", newRect);
        return newRect;
    }

    function KFrames() {
        // 此时元件1  占用 第一个图层
        doc.enterEditMode("inPlace");

        // 4.1  添加渐变遮罩层
        context.update();
        var timeline = context.timeline;
        var newLayerIndex = timeline.addNewLayer("渐变遮罩", "normal", true);

        // 4.2 添加一个shape 长方形，铺满 元件的轮廓
        // 宽高=位置+100
        var rect = getRect(selection[0]);
        // drawRectangleWithoutLine(rect)
        doc.addNewRectangle(rect, 0);

        // 设置 混合模式为 alpha

        // bug:doc.setBlendMode 只能在元件生效，不能在图层生效
        // doc.setBlendMode('alpha')
        context.update();
        var curLayer = context.curLayer;
        curLayer.setBlendModeAtFrame(0, "alpha");

        // TODO:设置笔触，填充，，填充透明度80
        // var stroke = {
        //     "thickness": 1,
        //     "color": "#FF0000",
        //     "originalcolor": "#FF0000",
        //     "breakAtCorners": false,
        //     "strokeHinting": false,
        //     "scaleType": "normal",
        //     "joinType": "round",
        //     "capType": "round",
        //     "miterLimit": 3,
        //     "shapeFill": {
        //         "tag": 0,
        //         "color": "#FF0000",
        //         "style": "solid",
        //         "matrix": {
        //             "a": 1,
        //             "b": 0,
        //             "c": 0,
        //             "d": 1,
        //             "tx": 0,
        //             "ty": 0
        //         }
        //     },
        //     "style": "solid"
        // }
        // var fill = {
        //     "tag": 0,
        //     "color": "#000000",
        //     "style": "linearGradient",
        //     "matrix": {
        //         "a": 1,
        //         "b": 0,
        //         "c": 0,
        //         "d": 1,
        //         "tx": 0,
        //         "ty": 0
        //     },
        //     "posArray": [
        //         0,
        //         130,
        //         148,
        //         255
        //     ],
        //     "colorArray": [
        //         "#FFFFFFCC",
        //         "#FFFFFFCC",
        //         "#FFFFFF00",
        //         "#FFFFFF00"
        //     ],
        //     "overflow": "Extend",
        //     "linearRGB": true,
        //     "focalPoint": 0
        // }
        //
        // doc.setCustomStroke(stroke);
        // doc.setCustomFill(fill);
        // doc.setStroke("#FF0000", 1, "solid");
        // doc.setFillColor("#FF0000");

        // 补帧 5s----150帧,不清楚有没有必要

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        doc.clipCopy();

        // 1.创建新的图层---- 灵魂出窍，
        // 需要优化，如果有这个图层的时就不再创建，直接在那个图层上进行k帧
        var layerIndex = getLayersIndexByName(AllLayers, "灵魂出窍");
        if (layerIndex.length > 0) {
            // 已存在独白黑幕图层，直接选中
            timeline.currentLayer = layerIndex[0];
        } else {
            timeline.addNewLayer("灵魂出窍", "normal", true);
        }

        // 关键帧
        convertToKeyframesSafety(timeline, firstSlFrameIndex);

        // 2.复制选中的元件到新的图层
        // 必须true,否则会导致粘贴时出现问题:粘贴的位置没有与原位置重合
        doc.clipPaste(true);

        // 3.包装为一个新的元件
        var symbolName = generateNameUntilUnique("灵魂出窍_");
        doc.convertToSymbol("graphic", symbolName, "center");

        var element = selection[0];
        var eleSize = wrapSize(element);

        // 4. 编辑模式
        KFrames();

        // 5. 移动到左上角
        var moveDirection = new Vector(-1.5, -0.3);
        var distanceToMove = eleSize.toVector().scale(moveDirection);

        doc.moveSelectionBy(distanceToMove);

        // 6.设置 混合模式 图层
        context.update();
        var curLayer = context.curLayer;
        curLayer.setBlendModeAtFrame(firstSlFrameIndex, "layer");
    }

    Main();
});
