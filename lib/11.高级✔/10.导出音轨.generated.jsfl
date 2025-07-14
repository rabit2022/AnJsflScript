// 这个文件由脚本自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "LayerChecker", "KeyFrameQuery", "os", "LayerSelect", "loglevel"], function (require, exports, checkUtil_1, LayerChecker_1, KeyFrameQuery_1, os, LayerSelect_1, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getBaseName = os.path.$basenameWithoutExt;
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
    function selectSoundLayers() {
        var soundInfos = [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerSoundInfos = (0, LayerChecker_1.hasSound)(layers, layer);
            soundInfos.push.apply(soundInfos, layerSoundInfos);
        }
        var hasSoundLayers = soundInfos.map(function (soundInfo) {
            return soundInfo.LAYER.layerIndex;
        });
        (0, LayerSelect_1.SelectAllLayers)(timeline, hasSoundLayers);
    }
    function cleanNonSoundLayers(newDoc) {
        var timeline = newDoc.getTimeline();
        var layers = timeline.layers;
        for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            var layer = layers[layerIndex];
            timeline.setSelectedLayers(layerIndex, true);
            var keyFrameRanges = (0, KeyFrameQuery_1.getKeyFrameRanges)(layers, layer);
            for (var _i = 0, keyFrameRanges_1 = keyFrameRanges; _i < keyFrameRanges_1.length; _i++) {
                var keyFrameRange = keyFrameRanges_1[_i];
                var keyFrameIndex = keyFrameRange.startFrame;
                timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);
                if (newDoc.selection.length > 0) {
                    newDoc.deleteSelection();
                }
            }
        }
    }
    function copytoNewDoc(exportPath) {
        timeline.copyLayers();
        fl.createDocument("timeline");
        var newDoc = fl.getDocumentDOM();
        var timeline1 = newDoc.getTimeline();
        timeline1.pasteLayers();
        cleanNonSoundLayers(newDoc);
        var frameCount = timeline1.frameCount;
        newDoc.exportVideo(exportPath, false, true, true, frameCount);
        newDoc.close(false);
    }
    var docBaseName = getBaseName(doc.pathURI);
    function Main() {
        var folderURL = fl.browseForFolderURL("请选择保存位置");
        if (!folderURL)
            return;
        var exportPath = os.path.join(folderURL, "".concat(docBaseName, "_\u97F3\u8F68.mov"));
        log.info(exportPath);
        selectSoundLayers();
        copytoNewDoc(exportPath);
    }
    Main();
});
