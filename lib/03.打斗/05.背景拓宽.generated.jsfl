// 这个文件由脚本 05.背景拓宽.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SAT", "MoreElement", "ElementSelect"], function (require, exports, checkUtil_1, SAT_1, MoreElement, ElementSelect_1) {
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
    function getNeighborVectors() {
        var points = Array.from({ length: 9 }, function (_, i) { return ({
            x: (i % 3) - 1,
            y: Math.floor(i / 3) - 1
        }); });
        var neighbors = points.filter(function (p) { return p.x !== 0 || p.y !== 0; });
        var neighborVectors = neighbors.map(function (p) { return SAT_1.Vector.from(p); });
        return neighborVectors;
    }
    function Main() {
        var selectedElement = selection[0];
        var neighbors = getNeighborVectors();
        for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
            var neighbor = neighbors_1[_i];
            var mo = new MoreElement(selectedElement, neighbor);
            mo.gridSelection();
        }
        (0, ElementSelect_1.SelectStart)(selection);
    }
    Main();
});
