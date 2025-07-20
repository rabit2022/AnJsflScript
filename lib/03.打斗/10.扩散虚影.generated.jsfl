// 这个文件由脚本 10.扩散虚影.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "LayerOperation", "KeyFrameOperation", "JSFLConstants", "linqUtil", "SymbolNameGenerator", "ElementAnim", "FilterDefinitions", "ColorTransformDefinitions", "EaseCurve", "lodash"], function (require, exports, checkUtil_1, LayerOperation_1, KeyFrameOperation_1, JSFLConstants, linqUtil_1, SymbolNameGenerator_1, ElementAnim_1, fd, ctd, EaseCurve_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_6 = _a.FRAME_6, FRAME_7 = _a.FRAME_7;
    var AdjustColorFilterBuilder = fd.BUILDERS.AdjustColorFilterBuilder;
    var AlphaColorTransformBuilder = ctd.BUILDERS.AlphaColorTransformBuilder;
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
    var firstSlLayerIndex = selectedFrames.firstSlLayerIndex, firstSlFrameIndex = selectedFrames.firstSlFrameIndex, firstSlLayer = selectedFrames.firstSlLayer, firstSlFrame = selectedFrames.firstSlFrame;
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    var KEY_FRAMES = [FRAME_1, FRAME_6];
    var BLANK_FRAMES = [FRAME_7];
    KEY_FRAMES = (0, linqUtil_1.$addOffset)(KEY_FRAMES, firstSlFrameIndex);
    BLANK_FRAMES = (0, linqUtil_1.$addOffset)(BLANK_FRAMES, firstSlFrameIndex);
    var SCALE_FACTORS = [1.8, 2.8];
    function MultiSymbol() {
        var selectedElements = doc.selection;
        if (selectedFrames.length > 1) {
            var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("扩散虚影_");
            doc.convertToSymbol("graphic", symbolName, "center");
        }
        (0, ElementAnim_1.playSingleFrame)();
    }
    var filter = new AdjustColorFilterBuilder().build();
    var FILTERS = [filter];
    var ALPHA_TRANSFORM_1 = new AlphaColorTransformBuilder().setAlphaPercent(80).build();
    var ALPHA_TRANSFORM_2 = new AlphaColorTransformBuilder().setAlphaPercent(0).build();
    function scaleFrame(shadowLayerIndex) {
        timeline.setSelectedFrames([
            shadowLayerIndex,
            _.last(KEY_FRAMES),
            _.last(KEY_FRAMES) + 1
        ]);
        var scale = _.last(SCALE_FACTORS);
        doc.scaleSelection(scale, scale);
        timeline.setSelectedFrames([
            shadowLayerIndex,
            _.first(KEY_FRAMES),
            _.first(KEY_FRAMES) + 1
        ]);
        var scale2 = _.first(SCALE_FACTORS);
        doc.scaleSelection(scale2, scale2);
    }
    function setFilters(shadowLayerIndex) {
        var layers = timeline.layers;
        var ShadowLayer = layers[shadowLayerIndex];
        ShadowLayer.setFiltersAtFrame(KEY_FRAMES[0], FILTERS);
        ShadowLayer.setColorTransformAtFrame(KEY_FRAMES[0], ALPHA_TRANSFORM_1);
        ShadowLayer.setFiltersAtFrame(KEY_FRAMES[1], FILTERS);
        ShadowLayer.setColorTransformAtFrame(KEY_FRAMES[1], ALPHA_TRANSFORM_2);
    }
    function Main() {
        doc.clipCopy();
        var shadowLayerIndex = (0, LayerOperation_1.addNewLayerSafety)(timeline, "扩散虚影");
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES[0], shadowLayerIndex);
        timeline.convertToBlankKeyframes(BLANK_FRAMES[0]);
        timeline.setSelectedFrames([
            shadowLayerIndex,
            _.first(KEY_FRAMES),
            _.first(KEY_FRAMES) + 1
        ]);
        doc.clipPaste(true);
        MultiSymbol();
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES[1], shadowLayerIndex);
        scaleFrame(shadowLayerIndex);
        setFilters(shadowLayerIndex);
        (0, EaseCurve_1.setEaseCurveEx)(timeline, KEY_FRAMES, "Classic Ease");
    }
    Main();
});
