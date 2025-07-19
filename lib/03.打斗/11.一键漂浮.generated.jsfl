// 这个文件由脚本 11.一键漂浮.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator", "JSFLConstants", "KeyFrameOperation", "SAT", "SAT", "EaseCurve", "lodash"], function (require, exports, checkUtil_1, SymbolNameGenerator_1, JSFLConstants, KeyFrameOperation_1, SAT_1, sat, EaseCurve_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_20 = _a.FRAME_20, FRAME_40 = _a.FRAME_40;
    var getSymbolSize = sat.ENTITY.SYMBOL.getSize;
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
    var KEY_FRAMES = [FRAME_1, FRAME_20, FRAME_40];
    var FLOAT_OFFSET = (function () {
        var size = getSymbolSize(selection[0]);
        var offset = new SAT_1.Vector(0, -0.1);
        var FLOAT_OFFSET = offset.scale(size.width, size.height);
        return FLOAT_OFFSET;
    })();
    function EditDynamic() {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        timeline.insertFrames(_.last(KEY_FRAMES));
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
        timeline.setSelectedFrames(KEY_FRAMES[1], KEY_FRAMES[1] + 1);
        doc.moveSelectionBy(FLOAT_OFFSET);
        (0, EaseCurve_1.setEaseCurveEx)(timeline, KEY_FRAMES, "Sine Ease-In-Out");
        doc.exitEditMode();
    }
    function Main() {
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("一键漂浮_静_");
        doc.convertToSymbol("graphic", symbolName, "center");
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("一键漂浮_动_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditDynamic();
        alert("动效已生成!");
    }
    Main();
});
