// 这个文件由脚本 10.一键羽化.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "loglevel", "ElementChecker"], function (require, exports, checkUtil_1, log, ElementChecker_1) {
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
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "Only two", "请同时选中两个对象!(羽化形状,羽化对象）")) {
        return;
    }
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
    function Main() {
        var shapeAndElement = checkShapeAndElement(selection);
        if (!shapeAndElement)
            return;
        var shape = shapeAndElement.shape, element = shapeAndElement.element;
        log.info("shape: ".concat(shape, ", element: ").concat(element.libraryItem.name));
    }
    Main();
});
