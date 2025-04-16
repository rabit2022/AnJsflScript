const Context = require("../Context");

Context.prototype.setKeyframe = function(keyframeIndex, layer) {
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
    get: function() {
        if (!this.layer) return [];

        var keyframes = [];
        var frameIndex = 0;
        var keyframeIndex = 0;

        while (frameIndex < this.layer.frameCount) {
            var frame = this.layer.frames[frameIndex];
            if (frame.startFrame === frameIndex) { // 是关键帧
                keyframes[keyframeIndex++] = frame;
                frameIndex += frame.duration;
            } else {
                frameIndex++;
            }
        }

        return keyframes;
    }
});
