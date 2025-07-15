// 这个文件由脚本 12.分离万能头.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "ElementChecker", "ElementQuery", "KeyFrameQuery", "SAT", "SAT", "loglevel"], function (require, exports, checkUtil_1, ElementChecker_1, ElementQuery_1, KeyFrameQuery_1, SAT_1, sat, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getStageSize = sat.ENTITY.STAGE.getSize;
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
    function getAllSymbolNames() {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        var layers = timeline.layers;
        var curLayerIndex = timeline.currentLayer;
        var curLayer = layers[curLayerIndex];
        var keyFrames = (0, KeyFrameQuery_1.getKeyFrameRanges)(layers, curLayer);
        var keyFrameSymbolNames = keyFrames.map(function (kfr) {
            var keyFrameLayerIndex = kfr.layerIndex;
            var keyFrameIndex = kfr.startFrame;
            var keyFrameElement = layers[keyFrameLayerIndex].frames[keyFrameIndex].elements[0];
            return (0, ElementQuery_1.getName)(keyFrameElement);
        });
        var uniqueSymbolNames = Array.from(new Set(keyFrameSymbolNames));
        doc.enterEditMode();
        return uniqueSymbolNames;
    }
    var ROW_SYMBOL_COUNT = 10;
    function getPosition(count) {
        function parseRowColumn(count) {
            var row = Math.floor(count / ROW_SYMBOL_COUNT);
            var column = count % ROW_SYMBOL_COUNT;
            return { row: row, column: column };
        }
        var stageSize = getStageSize();
        var rowSpace = stageSize.width / ROW_SYMBOL_COUNT;
        var columnSpace = stageSize.height / ROW_SYMBOL_COUNT;
        var _a = parseRowColumn(count), row = _a.row, column = _a.column;
        var topleft = new SAT_1.Vector(rowSpace * column, columnSpace * row);
        var center = topleft.add(new SAT_1.Vector(rowSpace, columnSpace).clone().scale(0.5));
        return center;
    }
    function Main() {
        var element = selection[0];
        if (!(0, ElementChecker_1.IsSymbol)(element)) {
            alert("请选择 元件 类型 的元素！");
            return;
        }
        var symbolNames = getAllSymbolNames();
        log.info(symbolNames);
        for (var i = 0; i < symbolNames.length; i++) {
            var symbolName = symbolNames[i];
            var position = getPosition(i);
            library.addItemToDocument(position, symbolName);
        }
    }
    Main();
});
