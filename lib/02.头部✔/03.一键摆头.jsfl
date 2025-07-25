﻿/**
 * @file: 03.一键摆头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 21:45
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require([
    "checkUtil",
    "promptUtil",
    "SymbolNameGenerator",
    "JSFLConstants",
    "FilterOperation",
    "KeyFrameOperation"
], function (checkUtil, promptUtil, sng, JSFLConstants, fo, kfo) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    const { FRAME_1, FRAME_4, FRAME_6 } = JSFLConstants.Numerics.frame.frameList;
    const { addBlurFilterToFrame } = fo;
    const { convertToKeyframesSafety } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    var descriptions = {
        file: "03.一键摆头.jsfl",
        "file description": "摆头的动作",
        selection: "仅一个元件",
        "selection description": "选中头部",
        XMLPanel: false,
        "input parameters": {
            动态模糊度: 4
        },
        detail: "包装元件",
        "detail description": "",
        steps: ["打包", "包装元件", "k帧", "添加滤镜", "水平翻转"]
    };

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

    const KEY_FRAMES = [FRAME_4];

    function KFrames(blurFilterForce) {
        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();
        var layers = timeline.layers;

        // 添加滤镜
        addBlurFilterToFrame(
            layers[0],
            FRAME_1,
            blurFilterForce,
            blurFilterForce,
            "medium"
        );

        // 给所有图层加帧
        timeline.insertFrames(FRAME_6, true);

        // var _4_frames = 4 - 1;
        // timeline.convertToKeyframes(FRAME_4);
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 水平翻转
        var frame4_element = timeline.layers[0].frames[FRAME_4].elements[0];
        frame4_element.scaleX = -1;
        frame4_element.scaleY = 1;

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        var blurFilterForce = promptUtil.parseNumber(
            "输入动态模糊度：",
            4,
            "动态模糊度只能输入数字，请重新输入。"
        );
        if (blurFilterForce === null) return;

        // var element=selection[0];
        doc.group();

        var symbolName = generateNameUntilUnique("一键摆头_");
        doc.convertToSymbol("graphic", symbolName, "center");

        KFrames(blurFilterForce);
    }

    Main();
});
