// 这个文件由脚本 LayerChecker.define.ts 自动生成，任何手动修改都将会被覆盖.
define(["require", "exports", "FrameChecker", "KeyFrameQuery", "SoundChecker"], function (require, exports, FrameChecker_1, KeyFrameQuery_1, SoundChecker_1) {
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
    function IsLayerBlank(layers, layer) {
        if ((0, SoundChecker_1.hasSound)(layers, layer).length > 0) {
            return false;
        }
        var keyFrameRanges = (0, KeyFrameQuery_1.getKeyFrameRanges)(layers, layer);
        for (var _i = 0, keyFrameRanges_1 = keyFrameRanges; _i < keyFrameRanges_1.length; _i++) {
            var kfr = keyFrameRanges_1[_i];
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
    exports.IsLayerExists = IsLayerExists;
    exports.IsLayerBlank = IsLayerBlank;
});
