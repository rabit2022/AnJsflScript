// 这个文件由脚本 #03.随机水印.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "COMPATIBILITY", "StringPaser", "loglevel"], function (require, exports, checkUtil_1, COMPATIBILITY_1, StringPaser_1, log) {
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
    function checkXMLPanel() {
        var panel = (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__)("./03.随机水印/03.随机水印.xml");
        if (panel === null)
            return;
        var text = panel.text;
        if (!text)
            return null;
        var alpha = (0, StringPaser_1.parseNumber)(panel.alpha, "请输入合法的透明度值。", { start: 1, end: 100 });
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
    function Main() {
        var config = checkXMLPanel();
        if (!config)
            return;
        var text = config.text, alpha = config.alpha, size = config.size, speed = config.speed, interval = config.interval;
        log.info("text: ".concat(text, ", alpha: ").concat(alpha, ", size: ").concat(size, ", speed: ").concat(speed, ", interval: ").concat(interval));
    }
    Main();
});
