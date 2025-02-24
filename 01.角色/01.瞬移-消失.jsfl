/**
 * @file: 01.瞬间-消失.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 13:40
 * @project: AnJsflScript
 * @description:
 */

require([
    'checkUtil',
    'linqUtil',
    'filterUtil',
    'selectionUtil',
    'curveUtil',
    'frameRangeUtil',
    'Constants',
], function (checkUtil, linqUtil, filterUtil, sel, curve, frUtil, Constants) {
    const {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames,
    } = checkUtil;
    const { FRAME_5, FRAME_7, FRAME_9, FRAME_6, FRAME_8, FRAME_10, MAX_BLUR } =
        Constants;

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
    var KEY_FRAMES = linqUtil.convertToProgrammeIndex([1, 5, 6, 7, 8, 9, 10]);
    // 滤镜效果
    var BLUR_FILTER_FRAMES = [FRAME_5, FRAME_7, FRAME_9];
    var BLUR_Y = [MAX_BLUR * 0.5, MAX_BLUR * 0.75, MAX_BLUR];
    // 消失效果
    var DISAPPEAR_FRAMES = [FRAME_6, FRAME_8, FRAME_10];

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, 'selectElement', 'Only one')) return;

        // 获取第一帧
        var frs = checkSelectedFrames(timeline);
        if (frs === null) return;
        var firstLayer = layers[frs[0].layerIndex];
        var firstFrame = frs[0].startFrame;

        KEY_FRAMES = linqUtil.addOffset(KEY_FRAMES, firstFrame);
        BLUR_FILTER_FRAMES = linqUtil.addOffset(BLUR_FILTER_FRAMES, firstFrame);
        DISAPPEAR_FRAMES = linqUtil.addOffset(DISAPPEAR_FRAMES, firstFrame);

        // 关键帧
        frUtil.convertToKeyframesSafety(timeline, curLayer, KEY_FRAMES);

        // 滤镜效果
        for (var i = 0; i < BLUR_FILTER_FRAMES.length; i++) {
            var blurfilterframe = BLUR_FILTER_FRAMES[i];
            var blurY = BLUR_Y[i];

            filterUtil.addBlurFilterToFrame(
                firstLayer,
                blurfilterframe,
                0,
                blurY,
                'high'
            );
        }

        // 消失效果
        for (var i = 0; i < DISAPPEAR_FRAMES.length; i++) {
            var disappearframe = DISAPPEAR_FRAMES[i];

            // 必须达到当前帧，否则无法 删除元素
            timeline.currentFrame = disappearframe;

            // 删除元素
            var disappearElements = firstLayer.frames[disappearframe].elements;
            // sel.SelectAll(disappearElements);
            // doc.deleteSelection();
            sel.DeleteSelection(disappearElements);
        }

        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        // 传统补间动画
        curve.setClassicEaseCurve(timeline);

        // 重置选中帧
        frUtil.resetSelectedFrames(timeline, frs);
    }

    Main();
});
