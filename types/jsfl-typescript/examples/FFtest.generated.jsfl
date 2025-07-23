// 这个文件由脚本 FFtest.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "FFramework", "rxjs"], function (require, exports, checkUtil_1, FFramework_1, rxjs_1) {
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
    var fw = new FFramework_1.FFramework(timeline);
    fw.gotoLayer("background")
        .pipe((0, rxjs_1.switchMap)(function () {
        console.log("切图层");
        return fw.gotoFrame(15);
    }), (0, rxjs_1.tap)(function () {
        console.log("切帧");
        fw.SelectAll();
    }))
        .subscribe();
});
