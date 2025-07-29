// 这个文件由脚本 #03.随机水印.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "COMPATIBILITY", "StringPaser", "store-js", "COMPATIBILITY", "JSFLConstants", "loglevel", "linq"], function (require, exports, checkUtil_1, COMPATIBILITY_1, StringPaser_1, store, COMPATIBILITY_2, JSFLConstants, log, Enumerable) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FPS = JSFLConstants.Numerics.frame.frameRate.FPS;
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    function checkXMLPanel() {
        var panel = (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__)("./03.随机水印/03.随机水印.xml");
        if (panel === null)
            return;
        var text = panel.text;
        if (!text)
            return null;
        var alpha = (0, StringPaser_1.parseNumber)(panel.alpha, "请输入合法的透明度值。", {
            start: 1,
            end: 100
        });
        if (alpha === null)
            return null;
        var size = (0, StringPaser_1.parseNumber)(panel.size, "请输入合法的字体大小。", { start: 0, end: 10 });
        if (size === null)
            return null;
        var speed = (0, StringPaser_1.parseNumber)(panel.speed, "请输入合法的速度值。", { start: 1, end: 100 });
        if (speed === null)
            return null;
        var interval = (0, StringPaser_1.parseNumber)(panel.interval, "请输入合法的间隔值。");
        if (interval === null)
            return null;
        return {
            text: text,
            alpha: alpha,
            size: size,
            speed: speed,
            interval: interval
        };
    }
    var ns_store = store.namespace("04-走路-短腿");
    function generateSegments(totalFrameCount, intervalFrames) {
        return Enumerable
            .range(0, Math.ceil(totalFrameCount / intervalFrames))
            .select(function (i) {
            var start = i * intervalFrames;
            var end = Math.min(start + intervalFrames - 1, totalFrameCount - 1);
            return [start, end];
        });
    }
    function Main() {
        var config = checkXMLPanel();
        if (!config)
            return;
        var WATERMARK_TEXT = config.text, WATERMARK_ALPHA = config.alpha, size = config.size, speed = config.speed, interval = config.interval;
        var WATERMARK_LAYER_INDEX = 0;
        {
            ns_store.set("WATERMARK_TEXT", WATERMARK_TEXT);
            ns_store.set("WATERMARK_ALPHA", WATERMARK_ALPHA);
            (0, COMPATIBILITY_2.__WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__)("./03.随机水印/创建随机水印元件.generated.jsfl");
            WATERMARK_LAYER_INDEX = ns_store.get("WATERMARK_LAYER_INDEX");
            timeline.setSelectedLayers(WATERMARK_LAYER_INDEX);
        }
        {
            var intervalFrames = interval * FPS;
            var layers = timeline.layers;
            var watermarkLayer = layers[WATERMARK_LAYER_INDEX];
            var totalFrameCount = watermarkLayer.frameCount;
            var segments_1 = generateSegments(totalFrameCount, intervalFrames);
            segments_1.forEach(function (_a) {
                var start = _a[0], end = _a[1];
                log.info("\u6DFB\u52A0\u5173\u952E\u5E27\uFF1A".concat(start, " - ").concat(end));
            });
        }
    }
    var segments = generateSegments(1000, 150);
    segments.forEach(function (_a) {
        var start = _a[0], end = _a[1];
        log.info("\u6DFB\u52A0\u5173\u952E\u5E27\uFF1A".concat(start, " - ").concat(end));
    });
});
