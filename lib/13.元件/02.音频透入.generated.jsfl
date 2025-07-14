// 这个文件由脚本 02.音频透入.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "LayerChecker", "LayerOperation"], function (require, exports, checkUtil_1, LayerChecker_1, LayerOperation_1) {
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
            var layer_name = soundInfo.LAYER.layerName;
            var targetLayerIndex = (0, LayerOperation_1.addNewLayerSafetyEx)(symbolTimeline, layer_name);
        }
    }
    Main();
});
