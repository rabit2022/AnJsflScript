/**
 * @file: 01.瞬间-消失.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 13:40
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
    var KEY_FRAMES = arrUtil.convertToProgrammeIndex([1, 5, 6, 7, 8, 9, 10]);
    // 滤镜效果
    var BLUR_FILTER_FRAMES = [FRAME_5, FRAME_7, FRAME_9];
    var BLUR_Y = [MAX_BLUR * 0.5, MAX_BLUR * 0.75, MAX_BLUR];
    // 消失效果
    var DISAPPEAR_FRAMES = [FRAME_6, FRAME_8, FRAME_10];

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        // 获取第一帧
        var frs = CheckSelectedFrames(timeline);
        if (frs === null) return;
        var firstLayer = layers[frs[0].layerIndex];
        var firstFrame = frs[0].startFrame;

        KEY_FRAMES = arrUtil.addOffset(KEY_FRAMES, firstFrame);
        BLUR_FILTER_FRAMES = arrUtil.addOffset(BLUR_FILTER_FRAMES, firstFrame);
        DISAPPEAR_FRAMES = arrUtil.addOffset(DISAPPEAR_FRAMES, firstFrame);

        // 关键帧
        frUtil.convertToKeyframesSafety(timeline, curLayer, KEY_FRAMES);


        // 滤镜效果
        for (var i = 0; i < BLUR_FILTER_FRAMES.length; i++) {
            var blurfilterframe = BLUR_FILTER_FRAMES[i];
            var blurY = BLUR_Y[i];

            filterUtil.addBlurFilterToFrame(firstLayer, blurfilterframe, 0, blurY, "high");
        }

        // 消失效果
        for (var i = 0; i < DISAPPEAR_FRAMES.length; i++) {
            var disappearframe = DISAPPEAR_FRAMES[i];

            // 必须达到当前帧，否则无法 删除元素
            timeline.currentFrame = disappearframe;

            // 删除元素
            var disappearElements = firstLayer.frames[disappearframe].elements;
            SelectAll(disappearElements);
            doc.deleteSelection();
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
})();