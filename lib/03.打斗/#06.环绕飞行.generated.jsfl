// 这个文件由脚本 #06.环绕飞行.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator", "ElementSelect", "LayerOperation", "JSFLConstants", "KeyFrameOperation"], function (require, exports, checkUtil_1, SymbolNameGenerator_1, ElementSelect_1, LayerOperation_1, JSFLConstants, KeyFrameOperation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_15 = _a.FRAME_15, FRAME_30 = _a.FRAME_30;
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "Only two", "必须同时选择两个元件！（默认左边环绕，右边飞行）")) {
        return;
    }
    function checkAroundAndFly(selectedElements) {
        selectedElements.sort(function (a, b) {
            return a.left - b.left;
        });
        var AroundElement = selectedElements[0];
        var FlyElement = selectedElements[1];
        return { AroundElement: AroundElement, FlyElement: FlyElement };
    }
    function EditDynamic() {
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        {
            (0, ElementSelect_1.SelectAll)();
            var selection_1 = doc.selection;
            var _a = checkAroundAndFly(selection_1), AroundElement = _a.AroundElement, FlyElement = _a.FlyElement;
            (0, ElementSelect_1.OnlySelectCurrent)(AroundElement);
            var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("环绕飞行_内_");
            doc.convertToSymbol("graphic", symbolName, "center");
            (0, ElementSelect_1.OnlySelectCurrent)(FlyElement);
            symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("环绕飞行_环绕轴_");
            doc.convertToSymbol("graphic", symbolName, "center");
        }
        {
            (0, ElementSelect_1.SelectAll)();
            var selection_2 = doc.selection;
            var _b = checkAroundAndFly(selection_2), AroundElement = _b.AroundElement, FlyElement = _b.FlyElement;
            var radius = Math.abs(FlyElement.x - AroundElement.x);
            (0, ElementSelect_1.OnlySelectCurrent)(AroundElement);
        }
        {
            (0, ElementSelect_1.SelectAll)();
            var selection_3 = doc.selection;
            var _c = checkAroundAndFly(selection_3), AroundElement = _c.AroundElement, FlyElement = _c.FlyElement;
            (0, ElementSelect_1.OnlySelectCurrent)(FlyElement);
            doc.distributeToLayers();
            timeline.duplicateLayers();
            (0, LayerOperation_1.swapLayers)(timeline, 0, 1);
        }
        {
            var layers_1 = timeline.layers;
            var LAYER_NAMES = ["飞行物_后", "环绕轴", "飞行物_前"];
            for (var i = 0; i < layers_1.length; i++) {
                var layer = layers_1[i];
                var layerName = layer.name;
                layer.name = LAYER_NAMES[i];
            }
        }
        {
            var INSERT_FRAMES = FRAME_30;
            timeline.insertFrames(INSERT_FRAMES, true);
            {
                timeline.setSelectedLayers(0);
                var KEY_FRAMES = [FRAME_1, FRAME_15];
                (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
                timeline.setSelectedFrames(KEY_FRAMES[1], KEY_FRAMES[1] + 1);
                doc.deleteSelection();
            }
            {
                timeline.setSelectedLayers(2);
                var KEY_FRAMES = [FRAME_1, FRAME_15];
                (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
                timeline.setSelectedFrames(KEY_FRAMES[0], KEY_FRAMES[0] + 1);
                doc.deleteSelection();
            }
        }
        doc.exitEditMode();
    }
    function Main() {
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("环绕飞行_动_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditDynamic();
    }
    Main();
});
