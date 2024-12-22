/**
 * @file: FrameRange.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:56
 * @project: AnJsflScript
 * @description:
 */


/**
 * 帧范围类
 * @param {number} layerIndex 图层索引
 * @param {number} startFrame 开始帧
 * @param {number} endFrame 结束帧
 */
function FrameRange(layerIndex, startFrame, endFrame) {
    this.layerIndex = layerIndex;
    this.startFrame = startFrame;
    this.endFrame = endFrame;
    
    this.duration = endFrame - startFrame + 1;
}

/**
 * 输出字符串
 * @return {string} 字符串
 */
FrameRange.prototype.toString = function () {
    return "LayerIndex: " + this.layerIndex + ", StartFrame: " + this.startFrame + ", EndFrame: " + this.endFrame;
}

/**
 * 判断 FrameRange 是否包含在 selectedFrameRanges 中
 * @param {FrameRange} fr2 选中范围数组
 * @return {boolean} 是否包含
 */
FrameRange.prototype.Contain = function (fr2) {
    if (this.layerIndex !== fr2.layerIndex) {
        return false;
    }
    return this.startFrame >= fr2.startFrame && this.endFrame <= fr2.endFrame;
}

/**
 * 判断 FrameRange 是否包含在 selectedFrameRanges 中
 * @param {FrameRange[]} frs 选中范围数组
 */
FrameRange.prototype.Contains = function (frs) {
    for (var i = 0; i < frs.length; i++) {
        if (this.Contain(frs[i])) {
            return frs[i];
        }
    }
    return null;
}


/**
 * 获取选中元件的帧范围
 * var selectedFrames = timeline.getSelectedFrames();
 * @return {FrameRange[]} 帧范围数组
 */
function wrapSelectedFrames(timeline) {
    var selectedFrames = timeline.getSelectedFrames();
    // if (selectedFrames.length < 1) {
    //     alert("请选择要调整长度的关键帧或图层！");
    //     return;
    // }
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
 * 快速抽取关键帧索引-注意是索引， 不是frame对象
 * @param {Layer} layer 图层
 * @return {number[]} 关键帧索引数组
 */
function getKeyFrames(layer) {
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
 * @param {number} layerIndex 图层
 * @param {number[]} keyFrames 关键帧索引数组
 * @return {FrameRange[]} 帧范围数组
 */
function wrapKeyFrames(layerIndex, keyFrames) {
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




