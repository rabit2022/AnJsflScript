// 这个文件由脚本 02.音频透入.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "LayerChecker", "LayerOperation", "KeyFrameOperation"], function (require, exports, checkUtil_1, LayerChecker_1, LayerOperation_1, KeyFrameOperation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var doc = fl.getDocumentDOM();
    if (!(0, checkUtil_1.CheckDom)(doc)) {
        return;
    }
    var selection = doc.selection;
    var library = doc.library;
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var curLayerIndex = timeline.currentLayer;
    var curLayer = layers[curLayerIndex];
    var _frames = curLayer.frames;
    var curFrameIndex = timeline.currentFrame;
    var curFrame = _frames[curFrameIndex];
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    function Main() {
        var _a = (0, checkUtil_1.CheckSymbolTimeline)(), symbolTimeline = _a.symbolTimeline, stageTimeline = _a.stageTimeline;
        if (!symbolTimeline || !stageTimeline)
            return;
        var stageInfos = (0, LayerChecker_1.hasSoundAll)(stageTimeline);
        if (stageInfos.length === 0)
            return;
        symbolTimeline.insertFrames(stageTimeline.frameCount - symbolTimeline.frameCount, true, symbolTimeline.frameCount);
        for (var _i = 0, stageInfos_1 = stageInfos; _i < stageInfos_1.length; _i++) {
            var soundInfo = stageInfos_1[_i];
            var layerName = soundInfo.LAYER.layerName;
            var _b = soundInfo.FRAME, soundFrameIndex = _b.frameIndex, keyframeStart = _b.start, keyframeEnd = _b.end;
            var soundName = soundInfo.SOUND.soundName;
            var targetLayerIndex = (0, LayerOperation_1.addNewLayerSafetyEx)(symbolTimeline, layerName);
            var timeline_1 = symbolTimeline;
            var layers_1 = timeline_1.layers;
            var curLayerIndex_1 = timeline_1.currentLayer;
            var curLayer_1 = layers_1[curLayerIndex_1];
            var frames_1 = curLayer_1.frames;
            var curFrameIndex_1 = timeline_1.currentFrame;
            var curFrame_1 = frames_1[curFrameIndex_1];
            var layerFrameCount = curLayer_1.frameCount;
            (0, KeyFrameOperation_1.convertToKeyframesSafety)(symbolTimeline, soundFrameIndex, targetLayerIndex);
            curFrame_1.soundName = soundName;
            curFrame_1.soundSync = "stream";
            curFrame_1.setSoundEnvelopeLimits({ start: keyframeStart });
            if (keyframeEnd > layerFrameCount - 1) {
                (0, KeyFrameOperation_1.convertToKeyframesSafety)(symbolTimeline, keyframeEnd, targetLayerIndex);
            }
        }
    }
    Main();
});
