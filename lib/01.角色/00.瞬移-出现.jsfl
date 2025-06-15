/**
 * @file: 00.瞬移-出现.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 13:40
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require([
    "checkUtil",
    "linqUtil",
    "EaseCurve",
    "loglevel",
    "JSFLConstants",
    "ElementSelect",
    "FilterOperation",
    "FramesSelect",
    "KeyFrameOperation"
], function (checkUtil, linqUtil, curve, log, JSFLConstants, es, fo, fms, kfo) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    } = checkUtil;
    const { FRAME_1, FRAME_2, FRAME_3, FRAME_4, FRAME_5, FRAME_9 } =
        JSFLConstants.Numerics.frame.frameList;
    const { setClassicEaseCurve } = curve;
    const { DeleteSelection } = es;
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

    // 关键帧
    // var KEY_FRAMES = convertToProgrammeIndex([1, 2, 3, 4, 5, 9]);
    var KEY_FRAMES = [FRAME_1, FRAME_2, FRAME_3, FRAME_4, FRAME_5, FRAME_9];
    log.info("关键帧", KEY_FRAMES);

    // 滤镜效果
    // 1    0,255 高
    // 3    0,191.3  高
    // 5    0,127.5  高
    // +63.7  255*0.25  [1,0.75,0.5]
    var BLUR_FILTER_FRAMES = [FRAME_1, FRAME_3, FRAME_5];
    var BLUR_Y = [255, 255 * 0.75, 255 * 0.5];
    // 消失效果
    var DISAPPEAR_FRAMES = [FRAME_2, FRAME_4];

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 获取第一帧
        var frs = checkSelectedFrames(timeline);
        if (frs === null) return;
        var firstLayer = layers[frs[0].layerIndex];
        var firstFrame = frs[0].startFrame;

        KEY_FRAMES = $addOffset(KEY_FRAMES, firstFrame);
        BLUR_FILTER_FRAMES = $addOffset(BLUR_FILTER_FRAMES, firstFrame);
        DISAPPEAR_FRAMES = $addOffset(DISAPPEAR_FRAMES, firstFrame);

        // 关键帧
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 滤镜效果
        for (var i = 0; i < BLUR_FILTER_FRAMES.length; i++) {
            var blurfilterframe = BLUR_FILTER_FRAMES[i];
            var blurY = BLUR_Y[i];

            addBlurFilterToFrame(firstLayer, blurfilterframe, 0, blurY, "high");
        }

        // 消失效果
        for (var i = 0; i < DISAPPEAR_FRAMES.length; i++) {
            var disappearframe = DISAPPEAR_FRAMES[i];

            // 必须达到当前帧，否则无法 删除元素
            timeline.currentFrame = disappearframe;

            // 删除元素
            var disappearElements = firstLayer.frames[disappearframe].elements;
            // SelectAll(disappearElements);
            // doc.deleteSelection();
            DeleteSelection(disappearElements);
        }

        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        log.info("firstF:", firstF, "lastF:", lastF);
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        // 传统补间动画
        setClassicEaseCurve(timeline);

        // 重置选中帧
        SelectStartFms(timeline, frs);
    }

    Main();
});
