/**
 * @file: KeyFrameMode.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/26 17:24
 * @project: AnJsflScript
 * @description: 处理 选择范围内 的关键帧 的首帧
 * @version: 1.0.0
 * @example:
 *  var mode = KeyFrameMode();
 * if (!mode) return;
 * mode.forEach(function(item) {
 *     var {layer, frame} = item;
 *     silentFrame(frame);
 * });
 */

define(['checkUtil', 'frameRangeUtil', 'loglevel'], function (
    checkUtil,
    frUtil,
    log
) {
    const { getSplitFrsFromSl, groupByLayerIndex } = frUtil;
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

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

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (frs === null) return EmptyFunc;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // var MODE = [];

    // 空函数,防止报错 mode is not defined
    function EmptyFunc() {}

    function Main() {
        var MODE = [];
        // 检查选择的元件
        if (!CheckSelection(selection, 'selectElement', 'No limit')) return;

        // 分裂 选中范围 ，按照关键帧范围分裂
        var splitFrs = getSplitFrsFromSl(layers, frs);
        var frDict = groupByLayerIndex(splitFrs);
        // log.info('splitFrs:', splitFrs);
        // log.info('frDict:', frDict);

        Object.entries(frDict).forEach(function (item) {
            var [layerIndex, frameIndexes] = item;
            // log.info(layerIndex, frameIndexes);

            var curLayer = layers[layerIndex]; //当前图层
            frameIndexes.forEach(function (frameIndex) {
                var curFrame = curLayer.frames[frameIndex]; //当前帧

                // silentFrame(curFrame);
                // MODE.push([curLayer, curFrame, layerIndex, frameIndex]);
                var mode = {
                    layer: curLayer,
                    frame: curFrame,
                    layerIndex: layerIndex,
                    frameIndex: frameIndex
                };
                MODE.push(mode);
            });
        });

        return MODE;
    }

    // Main();
    return Main;
});
