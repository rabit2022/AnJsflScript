// 这个文件由脚本 SoundChecker.define.ts 自动生成，任何手动修改都将会被覆盖.
define(["require", "exports", "KeyFrameQuery"], function (require, exports, KeyFrameQuery_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasSound = hasSound;
    exports.hasSoundAll = hasSoundAll;
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
            var soundItem = frame.soundLibraryItem;
            this.ITEM = {
                item: soundItem,
                itemName: soundItem.name,
                path: soundItem.sourceFilePath
            };
            this.THIRD = {
                SECONDS: undefined
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
});
