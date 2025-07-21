// 这个文件由脚本 13.一键翻滚.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "promptUtil", "FilterDefinitions", "SymbolNameGenerator", "JSFLConstants", "KeyFrameOperation", "ElementSelect"], function (require, exports, checkUtil_1, promptUtil_1, fd, SymbolNameGenerator_1, JSFLConstants, KeyFrameOperation_1, ElementSelect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BlurFilterBuilder = fd.BUILDERS.BlurFilterBuilder;
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_3 = _a.FRAME_3, FRAME_5 = _a.FRAME_5, FRAME_7 = _a.FRAME_7, FRAME_8 = _a.FRAME_8;
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "Only two", "需同时选择  人物正面+人物背面  两个对象！")) {
        return;
    }
    function getFilter() {
        var blurAmount = (0, promptUtil_1.parseNumber)("请输入动态模糊度:", 30, "请输入合法的数字！", {
            min: 0,
            max: 100
        });
        if (blurAmount === null)
            return null;
        var filter = new BlurFilterBuilder()
            .setBlurX(blurAmount)
            .setBlurY(0)
            .setQuality("medium")
            .build();
        return [filter];
    }
    var KEY_FRAMES = [FRAME_1, FRAME_3, FRAME_5, FRAME_7];
    var INSET_FRAMES = FRAME_8;
    function EditFrame(keyFrameIndex) {
        var timeline = doc.getTimeline();
        timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);
        (0, ElementSelect_1.SelectAll)();
        var scaleX = Math.pow((-1), (keyFrameIndex / 2));
        doc.scaleSelection(scaleX, 1);
        timeline.layers[0].setFiltersAtFrame(keyFrameIndex, filters);
        timeline.setSelectedFrames(0, 1);
    }
    var SYMBOL_1 = selection[0];
    var SYMBOL_2 = selection[1];
    function EditEnter() {
        function deleteSymbol() {
            for (var _i = 0, _a = KEY_FRAMES.slice(0, 2); _i < _a.length; _i++) {
                var keyFrameIndex = _a[_i];
                timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);
                (0, ElementSelect_1.SelectSameName)(SYMBOL_2);
                doc.deleteSelection();
            }
            for (var _b = 0, _c = KEY_FRAMES.slice(2, 4); _b < _c.length; _b++) {
                var keyFrameIndex = _c[_b];
                timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);
                (0, ElementSelect_1.SelectSameName)(SYMBOL_1);
                doc.deleteSelection();
            }
        }
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        timeline.insertFrames(INSET_FRAMES);
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
        deleteSymbol();
        for (var _i = 0, KEY_FRAMES_1 = KEY_FRAMES; _i < KEY_FRAMES_1.length; _i++) {
            var keyFrameIndex = KEY_FRAMES_1[_i];
            EditFrame(keyFrameIndex);
        }
        doc.exitEditMode();
    }
    var filters = getFilter();
    if (!filters) {
        return;
    }
    function Main() {
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("一键翻滚_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditEnter();
    }
    Main();
});
