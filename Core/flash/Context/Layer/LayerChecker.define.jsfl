// 这个文件由脚本 LayerChecker.define.ts 自动生成，任何手动修改都将会被覆盖.
define(["require", "exports", "FrameChecker", "KeyFrameQuery"], function (require, exports, FrameChecker_1, KeyFrameQuery_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function IsLayerExists(layers, layerName) {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].name === layerName) {
                return true;
            }
        }
        return false;
    }
    var SoundInfo = (function () {
        function SoundInfo(layer, frameRange, frame, frameIndex) {
            var limits = frame.getSoundEnvelopeLimits();
            this.LAYER = {
                layer: layer,
                layerName: layer.name,
                layerIndex: frameRange.layerIndex,
                frameCount: layer.frameCount
            };
            this.FRAME = {
                frame: frame,
                frameIndex: frameIndex,
                start: frameRange.startFrame,
                end: frameRange.endFrame
            };
            this.SOUND = {
                soundName: frame.soundName,
                start: limits.start
            };
        }
        return SoundInfo;
    }());
    function hasSound(layers, layer) {
        var results = [];
        var keyFrameRanges = (0, KeyFrameQuery_1.getKeyFrameRanges)(layers, layer);
        for (var _i = 0, keyFrameRanges_1 = keyFrameRanges; _i < keyFrameRanges_1.length; _i++) {
            var kfr = keyFrameRanges_1[_i];
            var keyFrameIndex = kfr.startFrame;
            var keyFrame = layer.frames[keyFrameIndex];
            if (keyFrame === undefined)
                continue;
            if (keyFrame.soundName) {
                var result = new SoundInfo(layer, kfr, keyFrame, keyFrameIndex);
                results.push(result);
            }
        }
        return results;
    }
    function IsLayerBlank(layers, layer) {
        if (hasSound(layers, layer).length > 0) {
            return false;
        }
        var keyFrameRanges = (0, KeyFrameQuery_1.getKeyFrameRanges)(layers, layer);
        for (var _i = 0, keyFrameRanges_2 = keyFrameRanges; _i < keyFrameRanges_2.length; _i++) {
            var kfr = keyFrameRanges_2[_i];
            var keyFrameIndex = kfr.startFrame;
            var keyFrame = layer.frames[keyFrameIndex];
            if (keyFrame === undefined)
                continue;
            if (!(0, FrameChecker_1.IsFrameBlank)(keyFrame)) {
                return false;
            }
        }
        return true;
    }
    function hasSoundAll(timeline) {
        var layers = timeline.layers;
        var soundInfos = [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerSoundInfos = hasSound(layers, layer);
            soundInfos.push.apply(soundInfos, layerSoundInfos);
        }
        return soundInfos;
    }
    exports.IsLayerExists = IsLayerExists;
    exports.IsLayerBlank = IsLayerBlank;
    exports.hasSoundAll = hasSoundAll;
    exports.SoundInfo = SoundInfo;
});
