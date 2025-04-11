/**
 * @file: 05.动作模糊.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/25 22:31
 * @project: AnJsflScript
 * @description:
 */

if (typeof require === 'undefined') {
    var msg =
        '【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}
require([
    'checkUtil',
    'loglevel',
    'frameRangeUtil',
    'linqUtil',
    'filterUtil',
    'JSFLConstants'
], function (checkUtil, log, frUtil, linqUtil, filterUtil, JSFLConstants) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
    const { FRAME_1, FRAME_2, FRAME_3, FRAME_4 } = JSFLConstants.Numerics.frame.frameList;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    var KEY_FRAMES = [FRAME_1, FRAME_2, FRAME_3, FRAME_4]; // 动作关键帧

    // 滤镜效果
    var BLUR = [10, 30, 50];
    // 滤镜关键帧
    var BLUR_FILTER_FRAMES = [FRAME_1, FRAME_2, FRAME_3];

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline, '请选择需要添加模糊的帧！');
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    KEY_FRAMES = linqUtil.addOffset(KEY_FRAMES, firstFrame);
    BLUR_FILTER_FRAMES = linqUtil.addOffset(BLUR_FILTER_FRAMES, firstFrame);

    const BLUR_FILTER = JSFLConstants.Constants.filter.name.BLUR_FILTER;
    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'elementOnFrame', 'Not Zero')) return;

        // 关键帧
        frUtil.convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 滤镜效果
        for (var i = 0; i < BLUR_FILTER_FRAMES.length; i++) {
            var blurfilterframe = BLUR_FILTER_FRAMES[i];
            var blurX = (blurY = BLUR[i]);

            if (
                filterUtil.getFilterByName(curLayer, curFrameIndex, BLUR_FILTER) === null
            ) {
                filterUtil.addBlurFilterToFrame(
                    firstLayer,
                    blurfilterframe,
                    blurX,
                    blurY,
                    'high'
                );
            }
        }

        // 重置选中帧
        frUtil.resetSelectedFrames(timeline, frs);
    }

    Main();
});
