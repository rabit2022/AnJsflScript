﻿/**
 * @file: 05.一键瞬冲.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 17:53
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
    "linqUtil",
    "JSFLConstants",
    "EaseCurve",
    "FilterOperation",
    "FramesSelect",
    "KeyFrameOperation"
], function (checkUtil, promptUtil, linqUtil, JSFLConstants, curve, fo, fms, kfo) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;
    const { FRAME_1, FRAME_7, FRAME_11 } = JSFLConstants.Numerics.frame.frameList;
    const { setClassicEaseCurve } = curve;
    const { addBlurFilterToFrame } = fo;
    const { SelectStartFms } = fms;
    const { $addOffset } = linqUtil;
    const { convertToKeyframesSafety } = kfo;

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

    // 关键帧 1,7,11
    var KEY_FRAMES = [FRAME_1, FRAME_7, FRAME_11];
    // 右 30度
    var ALTER_ROTATION = FRAME_7;
    var ROTATION_DEGREE = 30;
    // 模糊度
    // offsetX=3*height
    var ALTER_POSITION_BLUR = FRAME_11;
    var BLUR_X = 200;

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 输入瞬冲方向(默认为右，空格为左)
        var direction = promptUtil.parseDirection(
            "请输入瞬冲方向(默认为右，空格为左)：",
            { 右: 1, 左: -1, " ": -1 }
        );
        if (direction === null) return;

        // 获取第一帧
        var frs = checkSelectedFrames(timeline);
        if (frs === null) return;
        var firstLayer = layers[frs[0].layerIndex];
        var firstFrame = frs[0].startFrame;

        KEY_FRAMES = $addOffset(KEY_FRAMES, firstFrame);
        ALTER_ROTATION += firstFrame;
        ALTER_POSITION_BLUR += firstFrame;

        // 关键帧
        timeline.currentLayer = frs[0].layerIndex;
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 旋转
        var frame_element = firstLayer.frames[ALTER_ROTATION].elements[0];
        frame_element.rotation += ROTATION_DEGREE * direction;
        // 位移
        var frame_element_blur = firstLayer.frames[ALTER_POSITION_BLUR].elements[0];
        frame_element_blur.x += 3 * frame_element_blur.height * direction;
        addBlurFilterToFrame(firstLayer, ALTER_POSITION_BLUR, BLUR_X, 0, "high");

        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        // 传统补间动画
        setClassicEaseCurve(timeline);

        // 重置选中帧
        SelectStartFms(timeline, frs);
    }

    Main();
});
