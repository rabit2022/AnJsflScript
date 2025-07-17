// 这个文件由脚本 08.音画同步.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SoundChecker", "os", "SoundQuery", "loglevel"], function (require, exports, checkUtil_1, SoundChecker_1, os, SoundQuery_1, log) {
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
    var HAS_FIXED = false;
    function Main() {
        var soundInfos = (0, SoundChecker_1.hasSoundAll)(timeline);
        if (soundInfos.length === 0) {
            log.info("当前没有声音");
            return;
        }
        for (var _i = 0, soundInfos_1 = soundInfos; _i < soundInfos_1.length; _i++) {
            var soundInfo = soundInfos_1[_i];
            var _a = soundInfo.FRAME, frame = _a.frame, frameIndex = _a.frameIndex;
            var _b = soundInfo.LAYER, layer = _b.layer, layerIndex = _b.layerIndex, layerName = _b.layerName;
            if (frame.soundSync !== "stream") {
                frame.soundSync = "stream";
                var info = "\u3010\u95EE\u9898\u3011  \u5728\u672C\u573A\u666F\u7B2C [".concat(layerIndex + 1, "] \u4E2A\u56FE\u5C42 : [").concat(layerName, "]  \uFF0C\u7B2C [").concat(frameIndex + 1, "] \u5E27\u5904\uFF0C\u97F3\u9891\u540C\u6B65\u4E0D\u662F\"\u6570\u636E\u6D41\" --- \u5DF2\u81EA\u52A8\u4FEE\u590D\uFF01");
                fl.trace(info);
                HAS_FIXED = true;
            }
            var _c = soundInfo.ITEM, item = _c.item, itemName = _c.itemName, path = _c.path;
            if (path) {
                var _d = os.path.splitext(path), _1 = _d[0], ext = _d[1];
                if (ext === ".mp3" || ext === ".wav") {
                    (0, SoundQuery_1.getAudioDurations)(soundInfo);
                }
            }
        }
        if (!HAS_FIXED) {
            var info = "\u3010\u63D0\u793A\u3011  \u5F53\u524D\u573A\u666F\u672A\u53D1\u73B0\u97F3\u753B\u4E0D\u540C\u6B65\u95EE\u9898\u3002\u82E5\u4ECD\u4E0D\u540C\u6B65\uFF0C\u5EFA\u8BAE\u4F7F\u7528AN\u7684 [\u6587\u4EF6-\u5BFC\u51FA-\u5BFC\u51FA\u5F71\u7247] \u6765\u5BFC\u51FA\u5E8F\u5217\u5E27\uFF0C\u7ED3\u5408\u4F7F\u7528\u63D2\u4EF6\u7684 [\u9AD8\u9636\u9762\u677F-\u5BFC\u51FA\u97F3\u8F68] \u5BFC\u51FA\u97F3\u9891";
            fl.trace(info);
        }
        else {
            var info = "\u3010\u63D0\u793A\u3011  \u97F3\u9891\u540C\u6B65\u5B8C\u6210\uFF01";
            fl.trace(info);
        }
    }
    Main();
});
