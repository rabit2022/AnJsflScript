// 这个文件由脚本 00.元件同步.ts 自动生成，任何手动修改都将会被覆盖.
require([
    "require",
    "_exports",
    "checkUtil",
    "ElementChecker",
    "KeyFrameOperation",
    "ElementQuery",
    "ElementAnim",
    "ElementSelect"
], function (
    require,
    exports,
    checkUtil_1,
    ElementChecker_1,
    KeyFrameOperation_1,
    ElementQuery_1,
    ElementAnim_1,
    ElementSelect_1
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
    if (
        !(0, checkUtil_1.CheckSelection)(
            selection,
            "selectElement",
            "Not Zero",
            "请先在舞台上选中至少一个图形元件!"
        )
    ) {
        return;
    }
    var FRAME_COUNT = timeline.frameCount;
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
        var newSelection = [];
        var selectedFrame;
        for (
            var _i = 0, selectedFrames_1 = selectedFrames;
            _i < selectedFrames_1.length;
            _i++
        ) {
            selectedFrame = selectedFrames_1[_i];
            timeline.setSelectedFrames(selectedFrame.toArray());
            var layerIndex = selectedFrame.layerIndex,
                startFrame = selectedFrame.startFrame,
                endFrame = selectedFrame.endFrame;
            (0, KeyFrameOperation_1.convertToKeyframesSafety)(
                timeline,
                startFrame,
                curLayer
            );
            var selection_1 = doc.selection;
            var symbols_2 = selection_1.filter(ElementChecker_1.IsSymbol);
            if (symbols_2.length === 0) return;
            newSelection.push(symbols_2);
            for (var _a = 0, symbols_1 = symbols_2; _a < symbols_1.length; _a++) {
                var symbol = symbols_1[_a];
                var symbolFrameCount = (0, ElementQuery_1.getFrameCount)(symbol);
                if (symbolFrameCount < FRAME_COUNT) {
                    var symbolTimeline = symbol.libraryItem.timeline;
                    symbolTimeline.insertFrames(
                        FRAME_COUNT - symbolFrameCount,
                        true,
                        symbolFrameCount
                    );
                    (0, ElementAnim_1.playLoop)();
                    symbol.firstFrame = curFrameIndex;
                }
            }
        }
        (0, ElementSelect_1.SelectAll)(newSelection);
    }
    Main();
});
