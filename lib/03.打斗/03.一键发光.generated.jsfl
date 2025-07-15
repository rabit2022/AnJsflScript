// 这个文件由脚本 03.一键发光.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "FilterDefinitions", "loglevel"], function (require, exports, checkUtil_1, fd, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GlowFilterBuilder = fd.BUILDERS.GlowFilterBuilder;
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    var glowFilter = new GlowFilterBuilder()
        .setBlur(30)
        .setStrength(150)
        .setColor("white")
        .setQuality("medium")
        .build();
    log.info(glowFilter);
    function Main() {
        firstSlLayer.setFiltersAtFrame(firstSlFrameIndex, [glowFilter]);
    }
    Main();
});
