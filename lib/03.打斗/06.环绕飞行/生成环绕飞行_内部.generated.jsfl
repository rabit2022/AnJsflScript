// 这个文件由脚本 生成环绕飞行_内部.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator", "SAT"], function (require, exports, checkUtil_1, SymbolNameGenerator_1, SAT_1) {
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
    function getRect(radius) {
        var elementPos = SAT_1.Vector.from(selection[0]);
        var size = new SAT_1.Size(radius * 2, radius * 0.8);
        var center = new SAT_1.Vector(size.width / 2, 0);
        var rect = SAT_1.Rectangle.fromCenter(center, size);
        return rect.addOffset(elementPos);
    }
    function Main() {
        var RADIUS = 400;
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("环绕飞行_飞行物");
        doc.convertToSymbol("graphic", symbolName, "center");
        {
            var motionGuideLayerIndex = timeline.addMotionGuide();
            var layers = timeline.layers;
            var motionGuideLayer = layers[motionGuideLayerIndex];
            motionGuideLayer.name = "运动曲线";
            var rect = getRect(RADIUS);
            doc.addNewOval(rect, true);
        }
    }
    Main();
});
