/**
 * @file: 07.解除独白.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 19:29
 * @project: AnJsflScript
 * @description:
 */

require([
    'checkUtil',
    'loglevel',
    'frameRangeUtil',
    'filterUtil',
    'JSFLConstants'
], function (checkUtil, log, frUtil, filterUtil, JSFLConstants) {
    const { CheckDom, CheckSelection } = checkUtil;

    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    const GLOW_FILTER = JSFLConstants.filter.name.GLOW_FILTER;

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;

        // 设置关键帧
        frUtil.convertToKeyframesSafety(timeline, [curFrameIndex]);

        filterUtil.clearFilterAtFrame(curLayer, curFrameIndex, GLOW_FILTER);
    }

    Main();
});
