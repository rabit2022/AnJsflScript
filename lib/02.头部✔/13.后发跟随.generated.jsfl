// 这个文件由脚本 13.后发跟随.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "ElementChecker", "ElementSelect", "SymbolNameGenerator", "JSFLConstants", "FramesSelect"], function (require, exports, checkUtil_1, ElementChecker_1, ElementSelect_1, SymbolNameGenerator_1, JSFLConstants, FramesSelect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FRAME_1 = JSFLConstants.Numerics.frame.frameList.FRAME_1;
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "Only two", "\u8BF7\u540C\u65F6\u9009\u62E9\"\u540E\u53D1\"\u548C\"\u4E07\u80FD\u5934\"\u4E24\u4E2A\u5BF9\u8C61\uFF01")) {
        return;
    }
    function IsKeyFrameHead(symbol) {
        (0, ElementSelect_1.OnlySelectCurrent)(symbol);
        if (doc.selection.length === 0) {
            return null;
        }
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        var layers = timeline.layers;
        var headLayerIndex = layers.findIndex(function (layer) {
            return layer.name === "摇头动作";
        });
        var result = null;
        if (headLayerIndex === -1) {
        }
        else {
            timeline.setSelectedLayers(headLayerIndex);
            timeline.copyLayers();
            result = true;
        }
        doc.exitEditMode();
        return result;
    }
    function IsLabelHead(symbol) {
        (0, ElementSelect_1.OnlySelectCurrent)(symbol);
        if (doc.selection.length === 0) {
            return null;
        }
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        var layers = timeline.layers;
        var headLayerIndex = layers.findIndex(function (layer) {
            return layer.name === "摇头动作";
        });
        var result = null;
        if (headLayerIndex === -1) {
            (0, ElementSelect_1.SelectAll)();
            var selection = doc.selection;
            if (selection.length === 1 && (0, ElementChecker_1.IsSymbol)(selection[0])) {
                result = IsKeyFrameHead(selection[0]);
            }
        }
        else {
            timeline.setSelectedLayers(headLayerIndex);
            timeline.copyLayers();
            result = true;
        }
        doc.exitEditMode();
        return result;
    }
    function checkHeadAndFair(selection) {
        var symbol1 = selection[0];
        var symbol2 = selection[1];
        var head = null;
        var fair = null;
        if (IsLabelHead(symbol1)) {
            head = symbol1;
            fair = symbol2;
        }
        else if (IsLabelHead(symbol2)) {
            head = symbol2;
            fair = symbol1;
        }
        else {
            alert("\u76EE\u524D\u4EC5\u652F\u6301 \u672C\u63D2\u4EF6  \"11.\u7EC4\u88C5\u4E07\u80FD\u5934.jsfl\"  \u529F\u80FD\u751F\u6210\u7684\u4E07\u80FD\u5934\uFF01");
            return;
        }
        return { head: head, fair: fair };
    }
    var SHACK_ACTION_LAYER = 0;
    var MOTION_LAYER = 1;
    var MOTION_NAME = "表情";
    function EditInner() {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        timeline.pasteLayers();
        var layers = timeline.layers;
        var motionLayer = layers[MOTION_LAYER];
        var shackActionLayer = layers[SHACK_ACTION_LAYER];
        var frameCount = shackActionLayer.frames.length;
        motionLayer.name = MOTION_NAME;
        timeline.setSelectedFrames([MOTION_LAYER, FRAME_1, FRAME_1 + 1]);
        timeline.insertFrames(frameCount - 1);
        motionLayer.setRigParentAtFrame(shackActionLayer, FRAME_1);
        doc.exitEditMode();
    }
    function Main() {
        if (!(0, ElementChecker_1.IsSymbol)(selection[0]) || !(0, ElementChecker_1.IsSymbol)(selection[1])) {
            alert("请选择两个 元件 类型！");
            return;
        }
        var headAndFair = checkHeadAndFair(selection);
        if (!headAndFair)
            return;
        var head = headAndFair.head, fair = headAndFair.fair;
        (0, ElementSelect_1.OnlySelectCurrent)(fair);
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("后发跟随_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditInner();
        (0, FramesSelect_1.SelectStartFms)(timeline, selectedFrames);
    }
    Main();
});
