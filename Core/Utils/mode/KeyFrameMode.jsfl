/**
 * @file: KeyFrameMode.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/26 17:24
 * @project: AnJsflScript
 * @description: 处理 选择范围内 的关键帧,
 *               用于 与frame有关的操作,当前帧的操作相当于 当前帧所在的整个关键帧上的操作
 *               例如：滤镜的添加,声音的调整
 * @version: 1.0.0
 * @example:
 *  var mode = KeyFrameMode();
 * if (!mode) return;
 * mode.forEach(function(item) {
 *     var {layer, frame} = item;
 *     silentFrame(frame);
 * });
 */

define(['checkUtil', 'loglevel', 'frameRange', 'frameRangeUtil'], function (
    checkUtil,
    // frUtil,

    log,
    FrameRange,
    frUtil
) {
    // const { getSplitFrsFromSl, groupByLayerIndex } = frUtil;
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
    const { getKeyFrameRanges } = frUtil;

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

    /**
     * selectedFr 按照 keyFrameRanges 拆分为多个帧范围
     * 可能有多个帧范围
     * @param {FrameRange} selectedFrBigger 选中范围
     * @param {FrameRange[]} keyFrameRanges 关键帧范围数组
     * @return {FrameRange[]} 帧范围数组
     * @private
     */
    var getSplitFrs = function (selectedFrBigger, keyFrameRanges) {
        var keyFrs = [];
        for (var i = 0; i < keyFrameRanges.length; i++) {
            var keyFrameRange = keyFrameRanges[i];
            // 判断是否有重叠
            if (selectedFrBigger.intersects(keyFrameRange)) {
                // 计算重叠部分的范围
                var overlapStart = Math.max(
                    selectedFrBigger.startFrame,
                    keyFrameRange.startFrame
                );
                var overlapEnd = Math.min(
                    selectedFrBigger.endFrame,
                    keyFrameRange.endFrame
                );
                // 创建新的帧范围对象
                var overlapRange = new FrameRange(
                    keyFrameRange.layerIndex,
                    overlapStart,
                    overlapEnd
                );
                keyFrs.push(overlapRange);
            }
        }
        return keyFrs;
    };

    /**
     * 选中范围 拆分为多个帧范围
     * 可能有多个帧范围
     * @param {Array.<Layer>} layers 图层数组
     * @param {FrameRange[]} frs 选中范围数组
     * @return {FrameRange[]} 帧范围数组
     */
    var getSplitFrsFromSl = function (layers, frs) {
        //============分裂 选中范围 ，按照关键帧范围分裂 ===================
        /**
         *
         * @type {FrameRange[]}
         */
        var splitFrs = [];
        for (var i = 0; i < frs.length; i++) {
            // 某一个图层的 选中的帧范围
            var selectedFr = frs[i];
            // 某一个图层的 关键帧范围 列表
            var _layer = layers[selectedFr.layerIndex];
            var keyFrameRanges = getKeyFrameRanges(layers, _layer);

            // 选中范围 包含的 关键帧范围
            var keyFr = getSplitFrs(selectedFr, keyFrameRanges);
            splitFrs = splitFrs.concat(keyFr);
        }
        return splitFrs;
    };

    /**
     * 按照图层索引分类，获取startFrame,返回对象
     * @param {FrameRange[]} arr - 包含图层索引和帧范围的数组
     * @returns {{number: number[]}} - 按图层索引分类的对象
     */
    var groupByLayerIndex = function (arr) {
        return arr.reduce(function (result, fr) {
            if (!result[fr.layerIndex]) {
                result[fr.layerIndex] = [];
            }
            result[fr.layerIndex].push(fr.startFrame);
            return result;
        }, {});
    };

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
