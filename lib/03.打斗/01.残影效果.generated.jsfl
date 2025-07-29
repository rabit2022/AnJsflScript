// 这个文件由脚本 01.残影效果.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "promptUtil", "SymbolNameGenerator", "KeyFrameOperation", "SAT", "FramesSelect", "EaseCurve", "ElementAnim", "JSFLConstants", "FilterDefinitions", "loglevel"], function (require, exports, checkUtil_1, promptUtil_1, SymbolNameGenerator_1, KeyFrameOperation_1, SAT_1, FramesSelect_1, EaseCurve_1, ElementAnim_1, JSFLConstants, fd, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_16 = _a.FRAME_16;
    var BlurFilterBuilder = fd.BUILDERS.BlurFilterBuilder;
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
    var KEY_FRAMES = [FRAME_1, FRAME_16];
    function EditInner() {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        timeline.insertFrames(FRAME_16);
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
        timeline.setSelectedFrames(FRAME_16, FRAME_16 + 1);
        var moveOffset = new SAT_1.Vector(300, 0);
        doc.moveSelectionBy(moveOffset);
        (0, FramesSelect_1.SelectAllFms)(timeline);
        (0, EaseCurve_1.setEaseCurveEx)(timeline, KEY_FRAMES, "Sine Ease-In-Out");
        doc.exitEditMode();
    }
    function EditOuter(shadowCount) {
        function getAlpha(shadowCount, i) {
            var MAX_ALPHA = 80;
            var alphaStep = Math.floor(MAX_ALPHA / shadowCount);
            var alpha = 100 - (i + 1) * alphaStep;
            return alpha;
        }
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        {
            timeline.setSelectedLayers(0);
            var layers_1 = timeline.layers;
            var curLayerIndex_1 = timeline.currentLayer;
            var curLayer_1 = layers_1[curLayerIndex_1];
            curLayer_1.name = "图层1";
            (0, ElementAnim_1.playOnce)();
            timeline.copyFrames(FRAME_1, FRAME_1 + 1);
        }
        for (var i = 0; i < shadowCount; i++) {
            var layerName = "\u56FE\u5C42".concat(i + 2);
            timeline.addNewLayer(layerName, "normal", false);
            var FRAME = i + 1;
            timeline.pasteFrames(FRAME, FRAME + 1);
        }
        {
            var FRAMES_COUNT = 20 + shadowCount;
            timeline.insertFrames(FRAMES_COUNT - 1, true, shadowCount);
            (function () {
                var layers = timeline.layers;
                var lastLayerIndex = layers.length - 1;
                var lastLayer = layers[lastLayerIndex];
                var frames = lastLayer.frames;
                var lastFrameIndex = frames.length - 1;
                var lastFrame = frames[lastFrameIndex];
                timeline.removeFrames(lastFrameIndex, lastFrameIndex + 1);
            })();
        }
        var filter = new BlurFilterBuilder().setBlur(3).setQuality("medium").build();
        for (var i = 0; i < shadowCount; i++) {
            var layerIndex = i + 1;
            var frameIndex = i + 1;
            var layers_2 = timeline.layers;
            var curLayer_2 = layers_2[layerIndex];
            curLayer_2.setFiltersAtFrame(frameIndex, [filter]);
            timeline.setSelectedFrames([layerIndex, frameIndex, frameIndex + 1]);
            var alpha = getAlpha(shadowCount, i);
            doc.setInstanceAlpha(alpha);
        }
        doc.exitEditMode();
    }
    function Main() {
        var shadowCount = (0, promptUtil_1.parseNumber)("输入残影数量（1~10）:", "3", "请输入合法的数字。(1~10)", { start: 1, end: 10, step: 1 });
        log.info("shadowCount", shadowCount);
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("一键残影_内部_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditInner();
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("一键残影_外部_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditOuter(shadowCount);
        (0, ElementAnim_1.playOnce)();
        alert("动作已生成,请元件内部调整运动轨迹！");
        (0, FramesSelect_1.SelectStartFms)(timeline, selectedFrames);
    }
    Main();
});
