// 这个文件由脚本 #04.走路-短腿.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "COMPATIBILITY", "StringPaser", "ElementSelect", "store-js"], function (require, exports, checkUtil_1, COMPATIBILITY_1, StringPaser_1, ElementSelect_1, store) {
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
    function checkXMLPanel() {
        var panel = (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__)("./04.走路-短腿/04.走路-短腿.xml");
        if (panel === null)
            return null;
        var angle = (0, StringPaser_1.parseNumber)(panel.angle, "角度只能输入数字，请重新输入。");
        if (angle === null)
            return null;
        var speed = (0, StringPaser_1.parseNumber)(panel.speed, "速度只能输入数字，请重新输入。");
        if (speed === null)
            return null;
        return { angle: angle, speed: speed };
    }
    var ns_store = store.namespace("04-走路-短腿");
    function Main() {
        var config = checkXMLPanel();
        if (config === null)
            return;
        var ROTATION_ANGLE = config.angle, WALK_SPEED = config.speed;
        ns_store.set("ROTATION_ANGLE", ROTATION_ANGLE);
        ns_store.set("WALK_SPEED", WALK_SPEED);
        switch (selection.length) {
            case 2:
                selection.sort(function (a, b) { return b.left - a.left; });
                var leftLeg = selection[0], rightLeg = selection[1];
                (0, ElementSelect_1.OnlySelectCurrent)(leftLeg);
                (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__)("./04.走路-短腿/左腿.generated.jsfl");
                (0, ElementSelect_1.OnlySelectCurrent)(rightLeg);
                (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__)("./04.走路-短腿/右腿.generated.jsfl");
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                throw new Error(info);
        }
    }
    Main();
});
