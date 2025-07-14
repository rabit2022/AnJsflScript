// 这个文件由脚本 01.元件重置.ts 自动生成，任何手动修改都将会被覆盖.
require([
    "require",
    "_exports",
    "checkUtil",
    "ElementOperation",
    "ElementChecker",
    "FramesSelect"
], function (
    require,
    exports,
    checkUtil_1,
    ElementOperation_1,
    ElementChecker_1,
    FramesSelect_1
) {
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
    var selectedFrames = (0, checkUtil_1.CheckSelectedFrames)(timeline);
    if (!selectedFrames) {
        return;
    }
    var firstSlLayerIndex = selectedFrames.firstSlLayerIndex,
        firstSlFrameIndex = selectedFrames.firstSlFrameIndex,
        firstSlLayer = selectedFrames.firstSlLayer,
        firstSlFrame = selectedFrames.firstSlFrame;
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    function Main() {
        var symbols = selection.filter(ElementChecker_1.IsSymbol);
        if (
            !(0, checkUtil_1.CheckSelection)(
                symbols,
                "selectElement",
                "Not Zero",
                "选中的对象中没有图形元件!"
            )
        ) {
            return;
        }
        for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
            var symbol = symbols_1[_i];
            var newItem = (0, ElementOperation_1.CopySymbol)(symbol, "skip");
            var symbolTimeline = newItem.timeline;
            var symbolLayers = symbolTimeline.layers;
            var symbolFrameCount = symbolTimeline.frameCount;
            var _loop_1 = function (symbolLayer) {
                var layerIndex = symbolLayers.findIndex(function (layer) {
                    return layer === symbolLayer;
                });
                symbolTimeline.setSelectedLayers(layerIndex, true);
                symbolTimeline.removeFrames(1, symbolFrameCount);
            };
            for (
                var _a = 0, symbolLayers_1 = symbolLayers;
                _a < symbolLayers_1.length;
                _a++
            ) {
                var symbolLayer = symbolLayers_1[_a];
                _loop_1(symbolLayer);
            }
        }
        (0, FramesSelect_1.SelectStartFms)(timeline, selectedFrames);
    }
    Main();
});
