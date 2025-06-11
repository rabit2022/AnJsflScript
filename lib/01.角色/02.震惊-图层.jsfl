/**
 * @file: 02.震惊-图层.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 15:34
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function getProjectPath() {
        const index = fl.scriptURI.lastIndexOf("AnJsflScript");
        if (index !== -1) return fl.scriptURI.substring(0, index + "AnJsflScript".length);
        throw new Error("Can't find project path.");
    }
    fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
})();
require([
    "checkUtil",
    "linqUtil",
    "ElementTransform",
    "JSFLConstants",
    "EaseCurve",
    "FramesSelect",
    "KeyFrameOperation"
], function (checkUtil, linqUtil, et, JSFLConstants, curve, fms, kfo) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;
    const { FRAME_1, FRAME_3, FRAME_6 } = JSFLConstants.Numerics.frame.frameList;
    const { setTransformationPointWithCorner } = et;
    const { setClassicEaseCurve } = curve;
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

    // 关键帧
    var KEY_FRAMES = [FRAME_1, FRAME_3, FRAME_6];
    var ALTER_HEIGHT_FRAME = FRAME_3;
    // height  364.6,437.15   0.834
    //         238.6,286.1    0.8339
    // 6/5
    var ALTER_RATIO = 6 / 5;

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 获取第一帧
        var frs = checkSelectedFrames(timeline);
        if (frs === null) return;
        var firstLayer = layers[frs[0].layerIndex];
        var firstFrame = frs[0].startFrame;

        KEY_FRAMES = $addOffset(KEY_FRAMES, firstFrame);
        ALTER_HEIGHT_FRAME = ALTER_HEIGHT_FRAME + firstFrame;

        setTransformationPointWithCorner(selection[0], "bottom center");

        // 关键帧
        timeline.currentLayer = frs[0].layerIndex;
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 调整高度
        var frame_element = firstLayer.frames[ALTER_HEIGHT_FRAME].elements[0];
        frame_element.height *= ALTER_RATIO;
        // print('调整高度' + frame_element.height);

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
