// 这个文件由脚本 创建随机水印元件.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "ElementAnim", "SAT", "COMPATIBILITY", "KeyFrameOperation", "LayerOperation", "JSFLConstants", "store-js", "JSFLInterface"], function (require, exports, checkUtil_1, ElementAnim_1, SAT_1, COMPATIBILITY_1, KeyFrameOperation_1, LayerOperation_1, JSFLConstants, store, JSFLInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_2 = _a.FRAME_2, FRAME_3 = _a.FRAME_3, FRAME_4 = _a.FRAME_4, FRAME_5 = _a.FRAME_5;
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
    var RANDOM_WATERMARK = "AnJsflScript-随机水印";
    function getFilters() {
        var filtersStr = (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__)("./水印滤镜.json");
        var filters = JSON.parse(filtersStr);
        return filters;
    }
    var KEY_FRAMES = [FRAME_1, FRAME_2, FRAME_3, FRAME_4, FRAME_5];
    function EditWatermark() {
        var filters = getFilters();
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        var layers = timeline.layers;
        var watermarkLayer = layers[WATERMARK_LAYER_INDEX];
        timeline.insertFrames(KEY_FRAMES.length - 1);
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
        KEY_FRAMES.forEach(function (frameIndex, index) {
            var filter = [filters[index]];
            watermarkLayer.setFiltersAtFrame(frameIndex, filter);
        });
        doc.exitEditMode();
    }
    var WATERMARK_LAYER_INDEX = 0;
    var WATERMARK_LAYER_NAME = "随机水印";
    var ns_store = store.namespace("04-走路-短腿");
    function Main() {
        var cookieStr = ns_store.get("WATERMARK_TEXT");
        var WATERMARK_TEXT = (0, JSFLInterface_1.decodeUnicode)(cookieStr) || "随机水印";
        var WATERMARK_ALPHA = ns_store.get("WATERMARK_ALPHA") || 30;
        WATERMARK_LAYER_INDEX = (0, LayerOperation_1.addNewLayerSafety)(timeline, WATERMARK_LAYER_NAME);
        ns_store.set("WATERMARK_LAYER_INDEX", WATERMARK_LAYER_INDEX);
        timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, 0, 1]);
        if (library.itemExists(RANDOM_WATERMARK)) {
            var ORIGINAL_POSITION = new SAT_1.Vector();
            library.addItemToDocument(ORIGINAL_POSITION, RANDOM_WATERMARK);
            (0, ElementAnim_1.playSingleFrame)();
        }
        else {
            var rect = new SAT_1.Rectangle(0, 0, 100, 100);
            doc.addNewText(rect, WATERMARK_TEXT);
            timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, 0, 1]);
            var curTextAttrs = fl.getDocumentDOM().selection[0].textRuns[0].textAttrs;
            curTextAttrs.fillColor = "#FFFFFF";
            curTextAttrs.bold = true;
            curTextAttrs.size = 26;
            doc.convertToSymbol("graphic", RANDOM_WATERMARK, "center");
            (0, ElementAnim_1.playSingleFrame)();
            EditWatermark();
        }
        doc.setInstanceAlpha(WATERMARK_ALPHA);
    }
    Main();
});
