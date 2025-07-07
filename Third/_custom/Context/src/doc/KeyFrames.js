const Context = require('../Context');

Context.prototype.setKeyframe = function (keyframeIndex, layer) {
    // update the layer, if supplied
    if (layer) {
        this.setLayer(layer);
    }

    // exit early if no timeline
    if (!this.timeline) {
        throw new ReferenceError('ReferenceError: Cannot set Keyframe as Context has no Timeline');
        return this;
    }

    // find the keyframe
    var keyframe = this.keyframes[keyframeIndex];
    if (keyframe) {
        this.setFrame(keyframe);
    }

    // return
    return this;
};

/**
 * 获取当前图层所有关键帧
 * @type {Array.<Frame>}
 */
Object.defineProperty(Context.prototype, 'keyframes', {
    get: function () {
        if (!this.layer) return [];

        var keyframes = [];
        var frameIndex = 0;
        var keyframeIndex = 0;

        while (frameIndex < this.layer.frameCount) {
            var frame = this.layer.frames[frameIndex];
            if (frame.startFrame === frameIndex) {
                // 是关键帧
                keyframes[keyframeIndex++] = frame;
                frameIndex += frame.duration;
            } else {
                frameIndex++;
            }
        }

        return keyframes;
    },
});

/**
 * 快速抽取关键帧索引-注意是索引， 不是frame对象
 * @param {Layer} layer 图层
 * @return {number[]} 关键帧索引数组
 * @see https://gitee.com/ninge/WindowSWF/tree/master/
 * @private
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
        var frame = frames[i]; //i=100
        var startFrame = frame.startFrame; //95
        i = startFrame; // 跳过 100-95序列
        keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
    }
    keyFrames.sort(function (a, b) {
        return a - b;
    });
    return keyFrames;
}

Object.defineProperty(Context.prototype, 'keyframeIndexes', {
    get: function () {
        if (!this.layer) return -1;

        return getKeyFrames(this.layer);
    },
});
