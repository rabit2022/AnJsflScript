// 这个文件由脚本 #06.环绕飞行.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator", "ElementSelect"], function (require, exports, checkUtil_1, SymbolNameGenerator_1, ElementSelect_1) {
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
        }
    }
    function Main() {
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("环绕飞行_动_");
        doc.convertToSymbol("graphic", symbolName, "center");
        EditDynamic();
    }
    Main();
});
