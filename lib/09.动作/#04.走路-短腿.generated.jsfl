// 这个文件由脚本 #04.走路-短腿.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil"], function (require, exports, checkUtil_1) {
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
    var info = "\n\u60A8\u9009\u62E9\u7684\u90E8\u4EF6\u6570\u91CF\u4E0D\u5BF9\uFF01\u53EF\u8BC6\u522B\uFF1A\n2\u90E8\u4EF6\uFF1A\u5DE6\u817F+\u53F3\u817F\n4\u90E8\u4EF6\uFF1A\u5DE6\u817F+\u53F3\u817F\u3001\u5DE6\u624B+\u53F3\u624B\n5\u90E8\u4EF6\uFF1A\u5DE6\u817F+\u53F3\u817F\u3001\u5DE6\u624B+\u53F3\u624B\u3001\u5934\u8EAB\u7EC4\u5408\u4F53\n";
    if (!(0, checkUtil_1.CheckSelectionAny)(selection, ["==2", "==4", "==5"], info)) {
        return;
    }
    function Main() { }
    Main();
});
