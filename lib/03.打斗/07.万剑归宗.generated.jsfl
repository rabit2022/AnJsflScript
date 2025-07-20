// 这个文件由脚本 07.万剑归宗.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator", "ElementSelect", "SAT", "SAT", "JSFLConstants", "KeyFrameOperation", "EaseCurve", "Tween", "promptUtil", "lodash"], function (require, exports, checkUtil_1, SymbolNameGenerator_1, ElementSelect_1, SAT_1, sat, JSFLConstants, KeyFrameOperation_1, EaseCurve_1, Tween_1, promptUtil_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getSymbolSize = sat.ENTITY.SYMBOL.getSize;
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_45 = _a.FRAME_45;
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
    var KEY_FRAMES = [FRAME_1, FRAME_45];
    var BASE_LAYER = 0;
    function EditDynamic(SwordCount) {
        function getTrPoint(selectionElement) {
            var position = SAT_1.Vector.from(selectionElement);
            var size = getSymbolSize(selectionElement);
            var trPoint = position.add(size.toVector().scale(0, 0.8));
            return trPoint;
        }
        doc.enterEditMode("inPlace");
        (0, ElementSelect_1.SelectAll)();
        var selectionElement = doc.selection[0];
        var trPoint = getTrPoint(selectionElement);
        doc.setTransformationPoint(trPoint);
        var timeline = doc.getTimeline();
        timeline.insertFrames(_.last(KEY_FRAMES));
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
        (0, EaseCurve_1.setEaseCurveEx)(timeline, KEY_FRAMES, "Cubic Ease-Out");
        (0, Tween_1.setTweenRotation)(timeline, "clockwise", 0);
        timeline.setSelectedLayers(BASE_LAYER);
        for (var i = 0; i < SwordCount - 1; i++) {
            timeline.duplicateLayers();
            timeline.setSelectedFrames(_.last(KEY_FRAMES), _.last(KEY_FRAMES) + 1);
            var angle = 360 / SwordCount;
            doc.rotateSelection(angle);
        }
        doc.exitEditMode();
    }
    function Main() {
        var SwordCount = (0, promptUtil_1.parseNumber)("输入剑柄数量:", 12, "请输入合法的剑柄数量(1-12)", {
            start: 1,
            end: 12,
            step: 1
        });
        if (!SwordCount)
            return;
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("万剑归宗_静_");
        doc.convertToSymbol("graphic", symbolName, "center");
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("万剑归宗_动_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditDynamic(SwordCount);
        alert("动效已生成!");
    }
    Main();
});
