/**
 * @file: FrameRange.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:56
 * @project: AnJsflScript
 * @description:
 */

define([
    'layerUtil',
    'frameRange',
    'selectionUtil'
    // 'core-js/actual/array/includes'
], function (layerUtil, FrameRange, sel) {
    function FrameRangeUtil() {}

    /**
     * 获取选中元件的帧范围
     * @param {number[]} selectedFrames 选中帧数组 [layerIndex, startFrame, endFrame]
     * @return {FrameRange[]} 帧范围数组
     * @private
     */
    FrameRangeUtil.wrapFrFromSl = function (selectedFrames) {
        /**
         * 获取选中元件的帧范围
         * @type {FrameRange[]}
         */
        var frameRanges = [];
        for (var i = 0; i < selectedFrames.length; i += 3) {
            // fl.trace("选中元件：" + i);
            var layerIndex = selectedFrames[i];
            var startFrame = selectedFrames[i + 1];
            var endFrame = selectedFrames[i + 2];
            // i = i + 2;
            var fr = new FrameRange(layerIndex, startFrame, endFrame);
            frameRanges.push(fr);
        }
        return frameRanges;
    };

    /**
     * 获取选中元件的帧范围
     * var selectedFrames = timeline.getSelectedFrames();
     * @return {FrameRange[]} 帧范围数组
     */
    FrameRangeUtil.getSelectedFrs = function (timeline) {
        var selectedFrames = timeline.getSelectedFrames();
        return this.wrapFrFromSl(selectedFrames);
    };

    /**
     * 重置选中帧
     * @param {Timeline} timeline 时间线
     * @param {FrameRange[]} frs 帧范围数组
     */
    FrameRangeUtil.resetSelectedFrames = function (timeline, frs) {
        sel.SelectNoneTl(timeline);
        for (var i = 0; i < frs.length; i++) {
            var fr = frs[i];

            var frArray = fr.toArray();
            timeline.setSelectedFrames(frArray, false);
        }
    };

    /**
     * 快速抽取关键帧索引-注意是索引， 不是frame对象
     * @param {Layer} layer 图层
     * @return {number[]} 关键帧索引数组
     * @see https://gitee.com/ninge/WindowSWF/tree/master/
     * @private
     */
    FrameRangeUtil.getKeyFrames = function (layer) {
        var frames = layer.frames;

        /**
         * 关键帧数组
         * @type {number[]}
         */
        var keyFrames = [];
        for (var i = frames.length - 1; i >= 0; i--) {
            //情景模拟， 95  80  20  1 是关键帧
            //获取关键帧数
            var frame = frames[i]; //i=100
            var startFrame = frame.startFrame; //95
            i = startFrame; // 跳过 100-95序列
            keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
        }
        keyFrames.sort(function (a, b) {
            return a - b;
        });
        return keyFrames;
    };

    /**
     * 获取关键帧 范围
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer|number} layer 图层
     * @param {number[]} keyFrames 关键帧索引数组
     * @return {FrameRange[]} 帧范围数组
     * @private
     */
    FrameRangeUtil.wrapKeyFrames = function (layers, layer, keyFrames) {
        // 获取图层索引
        var layerIndex = layerUtil.convertToLayerIndex(layers, layer);

        /**
         * 关键帧范围数组
         * @type {FrameRange[]}
         */
        var keyFrameRanges = [];
        for (var i = 0; i < keyFrames.length; i++) {
            if (i + 1 >= keyFrames.length) continue;

            var startFrame = keyFrames[i];
            var endFrame = keyFrames[i + 1];
            // var layerIndex = layerIndex;
            var frameRange = new FrameRange(layerIndex, startFrame, endFrame);
            keyFrameRanges.push(frameRange);
        }
        return keyFrameRanges;
    };

    /**
     * 获取选中元件的关键帧范围
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer} curLayer 当前图层
     * @return {FrameRange[]} 帧范围数组
     */
    FrameRangeUtil.getKeyFrameRanges = function (layers, curLayer) {
        // var layers = timeline.layers;//图层

        // 关键帧范围
        // var layer = layers[selectedFr.layerIndex];
        var keyFrames = FrameRangeUtil.getKeyFrames(curLayer);

        // 缺少最后一段，补上
        var lastKf = curLayer.frameCount; // 开区间
        keyFrames.push(lastKf);

        var keyFrameRanges = FrameRangeUtil.wrapKeyFrames(layers, curLayer, keyFrames);
        if (keyFrameRanges.length < 1) return null;

        return keyFrameRanges;
    };

    /**
     * keyFrameRanges 中的 包含 selectedFrLittle 的帧范围
     * 完全包含的，只有一个帧范围
     * @param {FrameRange} selectedFrLittle 选中范围
     * @param {FrameRange[]} keyFrameRanges 关键帧范围数组
     * @return {FrameRange} 帧范围
     */
    FrameRangeUtil.getKfrFromSlLittle = function (selectedFrLittle, keyFrameRanges) {
        var keyFr = null;
        for (var i = 0; i < keyFrameRanges.length; i++) {
            var keyFrameRange = keyFrameRanges[i];
            if (keyFrameRange.contain(selectedFrLittle)) {
                keyFr = keyFrameRange;
                break;
            }
        }
        return keyFr;
    };

    /**
     * 安全的转换为关键帧
     * 如果 需要转换的帧 已经是 关键帧，则不转换关键帧，以防止bug
     * @bug(当前帧已经是关键帧，再次转换会把下一帧也变成关键帧)
     * @param {Timeline} timeline 时间线
     * @param {number[]} keyFramesIndex 帧数组
     */
    FrameRangeUtil.convertToKeyframesSafety = function (timeline, keyFramesIndex) {
        // timeline.convertToKeyframes(frame_1);
        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        // var layer_ = layerUtil.convertToLayer(layers, layer);
        var keyFrames = this.getKeyFrames(curLayer);

        for (var i = 0; i < keyFramesIndex.length; i++) {
            var fr = keyFramesIndex[i];
            if (keyFrames.includes(fr)) {
                continue;
            }
            timeline.convertToKeyframes(fr);
        }
    };

    FrameRangeUtil.IsKeyFrame = function (layer, frameIndex) {
        var frame = layer.frames[frameIndex];
        if (!frame) return false;
        return frame.startFrame === frameIndex;
    };

    return FrameRangeUtil;
});
