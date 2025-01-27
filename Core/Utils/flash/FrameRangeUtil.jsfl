/**
 * @file: FrameRangeUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/23 20:45
 * @project: AnJsflScript
 * @description:
 */


function FrameRangeUtil() {

}


/**
 * 获取选中元件的帧范围
 * @param {number[]} selectedFrames 选中帧数组 [layerIndex, startFrame, endFrame]
 * @return {FrameRange[]} 帧范围数组
 * @private
 */
FrameRangeUtil.prototype.wrapFrFromSl = function (selectedFrames) {
    /**
     * 获取选中元件的帧范围
     * @type {FrameRange[]}
     */
    var frameRanges = [];
    for (var i = 0; i < selectedFrames.length; i++) {
        // fl.trace("选中元件：" + i);
        var layerIndex = selectedFrames[i];
        var startFrame = selectedFrames[i + 1];
        var endFrame = selectedFrames[i + 2];
        i = i + 2;
        var frameRange = new FrameRange(layerIndex, startFrame, endFrame);
        frameRanges.push(frameRange);
    }
    return frameRanges;
}

/**
 * 获取选中元件的帧范围
 * var selectedFrames = timeline.getSelectedFrames();
 * @return {FrameRange[]} 帧范围数组
 */
FrameRangeUtil.prototype.getSelectedFrs = function (timeline) {
    var selectedFrames = timeline.getSelectedFrames();
    return this.wrapFrFromSl(selectedFrames);
}

/**
 * 重置选中帧
 * @param {Timeline} timeline 时间线
 * @param {FrameRange[]} frs 帧范围数组
 */
FrameRangeUtil.prototype.resetSelectedFrames = function (timeline, frs) {
    for (var i = 0; i < frs.length; i++) {
        var fr = frs[i];

        var frArray = fr.toArray();
        timeline.setSelectedFrames(frArray, false);
    }
}


/**
 * 快速抽取关键帧索引-注意是索引， 不是frame对象
 * @param {Layer} layer 图层
 * @return {number[]} 关键帧索引数组
 * @see https://gitee.com/ninge/WindowSWF/tree/master/
 */
FrameRangeUtil.prototype.getKeyFrames = function (layer) {
    var frames = layer.frames;

    /**
     * 关键帧数组
     * @type {number[]}
     */
    var keyFrames = [];
    for (var i = frames.length - 1; i >= 0; i--) {
        //情景模拟， 95  80  20  1 是关键帧
        //获取关键帧数
        var frame = frames[i];//i=100
        var startFrame = frame.startFrame;//95
        i = startFrame;// 跳过 100-95序列
        keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
    }
    keyFrames.sort(function (a, b) {
        return a - b;
    });
    return keyFrames;
}

/**
 * 获取关键帧 范围
 * @param {Layer|number} layer 图层
 * @param {number[]} keyFrames 关键帧索引数组
 * @return {FrameRange[]} 帧范围数组
 * @private
 */
FrameRangeUtil.prototype.wrapKeyFrames = function (layer, keyFrames) {
    // // 获取图层索引
    // var layerIndex = 0;
    // if (typeof layer === "number") {
    //     layerIndex = layer;
    // } else {
    //     layerIndex = layerUtil.getLayerIndex(layer);
    // }
    var layerIndex = layerUtil.convertToLayerIndex(layer);


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
}

/**
 * 获取选中元件的关键帧范围
 * @param {Timeline} timeline 时间线
 * @param {FrameRange} selectedFr 选中范围
 * @return {FrameRange[]} 帧范围数组
 */
FrameRangeUtil.prototype.getKeyFrameRanges = function (timeline, selectedFr) {
    var layers = timeline.layers;//图层

    // 关键帧范围
    var layer = layers[selectedFr.layerIndex];
    var keyFrames = this.getKeyFrames(layer);

    // 缺少最后一段，补上
    var lastKf = layer.frameCount;// 开区间
    keyFrames.push(lastKf);

    var keyFrameRanges = this.wrapKeyFrames(selectedFr.layerIndex, keyFrames);
    if (keyFrameRanges.length < 1) return null;
    return keyFrameRanges;
}

/**
 * selectedFr 包含的 keyFrameRanges 中的 某些帧范围
 * 可能有多个帧范围
 * @param {FrameRange} selectedFrBigger 选中范围
 * @param {FrameRange[]} keyFrameRanges 关键帧范围数组
 * @return {FrameRange[]} 帧范围数组
 */
FrameRangeUtil.prototype.getKfrsFromSlBigger = function (selectedFrBigger, keyFrameRanges) {
    var keyFrs = [];
    for (var i = 0; i < keyFrameRanges.length; i++) {
        var keyFrameRange = keyFrameRanges[i];
        if (selectedFrBigger.contain(keyFrameRange)) {
            keyFrs.push(keyFrameRange);
        }
    }
    return keyFrs;
}

/**
 * keyFrameRanges 中的 包含 selectedFrLittle 的帧范围
 * 完全包含的，只有一个帧范围
 * @param {FrameRange} selectedFrLittle 选中范围
 * @param {FrameRange[]} keyFrameRanges 关键帧范围数组
 * @return {FrameRange} 帧范围
 */
FrameRangeUtil.prototype.getKfrFromSlLittle = function (selectedFrLittle, keyFrameRanges) {
    var keyFr = null;
    for (var i = 0; i < keyFrameRanges.length; i++) {
        var keyFrameRange = keyFrameRanges[i];
        if (keyFrameRange.contain(selectedFrLittle)) {
            keyFr = keyFrameRange;
            break;
        }
    }
    return keyFr;
}

/**
 * 安全的转换为关键帧
 * 如果 需要转换的帧 已经是 关键帧，则不转换关键帧，以防止
 * bug(当前帧已经是关键帧，再次转换会把下一帧也变成关键帧)
 * @param {Timeline} timeline 时间线
 * @param {Layer|number} layer 图层
 * @param {number[]} frs 帧数组
 */
FrameRangeUtil.prototype.convertToKeyframesSafety = function (timeline, layer, frs) {
    // timeline.convertToKeyframes(frame_1);
    var layer_ = layerUtil.convertToLayer(timeline, layer);
    var keyFrames = this.getKeyFrames(layer_);

    for (var i = 0; i < frs.length; i++) {
        var fr = frs[i];
        if (keyFrames.includes(fr)) {
            continue;
        }
        timeline.convertToKeyframes(fr);
    }
}

var frUtil = new FrameRangeUtil();