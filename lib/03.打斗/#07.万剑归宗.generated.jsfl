// 这个文件由脚本 #07.万剑归宗.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator"], function (require, exports, checkUtil_1, SymbolNameGenerator_1) {
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
    function EditDynamic() {
        doc.enterEditMode("inPlace");
    }
    function Main() {
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("万剑归宗_静_");
        doc.convertToSymbol("graphic", symbolName, "center");
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("万剑归宗_动_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditDynamic();
        alert("动效已生成!");
    }
    Main();
});
