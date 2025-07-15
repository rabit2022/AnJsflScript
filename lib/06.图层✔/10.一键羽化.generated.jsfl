// 这个文件由脚本 10.一键羽化.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "ElementChecker", "SymbolNameGenerator", "ElementSelect", "LayerOperation", "SAT", "FillDefinitions", "ColorPanel", "FilterDefinitions", "loglevel", "lodash"], function (require, exports, checkUtil_1, ElementChecker_1, SymbolNameGenerator_1, ElementSelect_1, LayerOperation_1, sat, fd, ColorPanel_1, fld, log, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getSymbolBounds = sat.ENTITY.SYMBOL.getBounds;
    var SolidFillBuilder = fd.BUILDERS.SolidFillBuilder;
    var BlurFilterBuilder = fld.BUILDERS.BlurFilterBuilder;
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "Only two", "请同时选中两个对象!(羽化形状,羽化对象）")) {
        return;
    }
    function _getMaskBounds(symbol_feather) {
        var feather_bounds = getSymbolBounds(symbol_feather);
        var final_bounds = feather_bounds.expand(50);
        return final_bounds;
    }
    var getMaskBounds = _.curry(_getMaskBounds);
    var mask_bounds = getMaskBounds;
    var MASK_LAYER_INDEX = 0;
    var SYMBOLS_LAYER_INDEX = 1;
    function Edit_mask() {
        doc.enterEditMode("inPlace");
        doc.group();
        var fill = new SolidFillBuilder().setColor('#FFFFFF00').build();
        (0, ColorPanel_1.setCustomPanel)(undefined, fill);
        doc.addNewRectangle(mask_bounds, 0);
        (0, ColorPanel_1.resetCustomPanel)();
        var filter = new BlurFilterBuilder()
            .setBlur(40)
            .setQuality("high")
            .build();
        log.info(filter);
        var timeline = doc.getTimeline();
        var layers = timeline.layers;
        var maskLayer = layers[MASK_LAYER_INDEX];
        maskLayer.setFiltersAtFrame(0, [filter]);
        doc.exitEditMode();
    }
    function Edit_feather() {
        function maskIsZero(timeline) {
            var maskLayer = timeline.layers[MASK_LAYER_INDEX];
            var maskElement = maskLayer.frames[0].elements[0];
            if (!(0, ElementChecker_1.IsShape)(maskElement)) {
                (0, LayerOperation_1.swapLayers)(timeline, MASK_LAYER_INDEX, SYMBOLS_LAYER_INDEX);
            }
            var newMaskLayer = timeline.layers[MASK_LAYER_INDEX];
            newMaskLayer.name = "遮罩层";
            return newMaskLayer;
        }
        doc.enterEditMode("inPlace");
        (0, ElementSelect_1.SelectAll)();
        doc.distributeToLayers();
        var timeline = doc.getTimeline();
        var maskLayer = maskIsZero(timeline);
        timeline.setSelectedFrames([MASK_LAYER_INDEX, 0, 1]);
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("羽化遮罩_");
        doc.convertToSymbol("graphic", symbolName, "center");
        Edit_mask();
        doc.convertSelectionToBitmap();
        maskLayer.setBlendModeAtFrame(0, "alpha");
        doc.exitEditMode();
    }
    function Main() {
        function checkShapeAndElement(selection) {
            var shape = null;
            var element = null;
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if ((0, ElementChecker_1.IsShape)(item)) {
                    shape = item;
                }
                else {
                    element = item;
                }
            }
            if (!shape || !element) {
                alert("\u68C0\u6D4B\u5230\u60A8\u6CA1\u6709\u9009\u62E9\u5F62\u72B6,\u8BF7\u9009\u62E9\"\u7FBD\u5316\u5F62\u72B6+\u7FBD\u5316\u5BF9\u8C61\"\uFF01");
                return null;
            }
            return {
                shape: shape,
                element: element
            };
        }
        var shapeAndElement = checkShapeAndElement(selection);
        if (!shapeAndElement)
            return;
        var shape = shapeAndElement.shape, element = shapeAndElement.element;
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("一键羽化_");
        doc.convertToSymbol("graphic", symbolName, "center");
        var symbol_feather = doc.selection[0];
        mask_bounds = mask_bounds(symbol_feather);
        Edit_feather();
        var timeline = doc.getTimeline();
        var layers = timeline.layers;
        var maskLayer = layers[MASK_LAYER_INDEX];
        maskLayer.setBlendModeAtFrame(firstSlFrameIndex, "layer");
    }
    Main();
});
