// 这个文件由脚本 左腿.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator", "ElementSelect", "SAT", "KeyFrameOperation", "JSFLConstants", "EaseCurve", "lodash"], function (require, exports, checkUtil_1, SymbolNameGenerator_1, ElementSelect_1, SAT_1, KeyFrameOperation_1, JSFLConstants, EaseCurve_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_5 = _a.FRAME_5, FRAME_15 = _a.FRAME_15, FRAME_20 = _a.FRAME_20;
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "Only one", "请选中 左腿 元件")) {
        return;
    }
    var KEY_FRAMES = [FRAME_1, FRAME_5, FRAME_15, FRAME_20];
    function EditDynamic(rotationAngle) {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        {
            (0, ElementSelect_1.SelectAll)();
            var firstElement = doc.selection[0];
            var size = SAT_1.Size.from(firstElement);
            var y = 0.2 * size.width - 0.5 * size.height;
            var trPoint = new SAT_1.Vector(0, y);
            doc.setTransformationPoint(trPoint);
        }
        {
            timeline.insertFrames(_.last(KEY_FRAMES));
            (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
            {
                timeline.setSelectedFrames(KEY_FRAMES[1], KEY_FRAMES[1] + 1);
                doc.rotateSelection(-rotationAngle);
            }
            {
                timeline.setSelectedFrames(KEY_FRAMES[2], KEY_FRAMES[2] + 1);
                doc.rotateSelection(rotationAngle);
            }
            (0, EaseCurve_1.setEaseCurveEx)(timeline, KEY_FRAMES, "Classic Ease");
        }
        doc.exitEditMode();
    }
    function Main() {
        var ROTATION_ANGLE = 30;
        var WALK_SPEED = 4;
        {
            var n = parseInt(String(20 / WALK_SPEED));
            KEY_FRAMES = [FRAME_1, n - 1, 3 * n - 1, 4 * n - 1];
        }
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("一键走路_左腿静_");
        doc.convertToSymbol("graphic", symbolName, "center");
        symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("一键走路_左腿动_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditDynamic(ROTATION_ANGLE);
    }
    Main();
});
