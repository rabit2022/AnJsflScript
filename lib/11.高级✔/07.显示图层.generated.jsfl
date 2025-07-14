// 这个文件由脚本 07.显示图层.ts 自动生成，任何手动修改都将会被覆盖.
require([
    "require",
    "_exports",
    "checkUtil",
    "KeyFrameQuery",
    "FrameChecker",
    "loglevel"
], function (require, exports, checkUtil_1, KeyFrameQuery_1, FrameChecker_1, log) {
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
    var selectedFrames = (0, checkUtil_1.CheckSelectedFrames)(timeline);
    if (!selectedFrames) {
        return;
    }
    var firstSlLayerIndex = selectedFrames.firstSlLayerIndex,
        firstSlFrameIndex = selectedFrames.firstSlFrameIndex,
        firstSlLayer = selectedFrames.firstSlLayer,
        firstSlFrame = selectedFrames.firstSlFrame;
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    function findPreviousNotEmptyFrame(timeline, frameIndex) {
        var layers = timeline.layers;
        var curLayerIndex = timeline.currentLayer;
        var curLayer = layers[curLayerIndex];
        var keyFrameRanges = (0, KeyFrameQuery_1.getKeyFrameRanges)(layers, curLayer);
        var SlKeyFrameIndex = keyFrameRanges.findIndex(function (fr) {
            return fr.contain(frameIndex);
        });
        if (SlKeyFrameIndex === 0) return;
        var previousKeyFrameIndex = keyFrameRanges[SlKeyFrameIndex - 1].startFrame;
        log.info("上一个关键帧", previousKeyFrameIndex);
        var _frames = curLayer.frames;
        var previousKeyFrame = _frames[previousKeyFrameIndex];
        if ((0, FrameChecker_1.IsEmptyFrame)(previousKeyFrame)) {
            return findPreviousNotEmptyFrame(timeline, previousKeyFrameIndex);
        }
        return previousKeyFrameIndex;
    }
    function Main() {
        var previousNotEmptyFrame = findPreviousNotEmptyFrame(
            timeline,
            firstSlFrameIndex
        );
        timeline.copyFrames(previousNotEmptyFrame);
        timeline.pasteFrames(firstSlFrameIndex);
    }
    Main();
});
