// 这个文件由脚本 04.背景循环.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "COMPATIBILITY", "SAT", "SAT", "SymbolNameGenerator", "MoreElement", "ElementSelect", "JSFLConstants", "KeyFrameOperation", "EaseCurve", "loglevel", "lodash"], function (require, exports, checkUtil_1, COMPATIBILITY_1, SAT_1, sat, SymbolNameGenerator_1, MoreElement, ElementSelect_1, JSFLConstants, KeyFrameOperation_1, EaseCurve_1, log, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_90 = _a.FRAME_90;
    var getSymbolSize = sat.ENTITY.SYMBOL.getSize;
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
        var xmlPanel = (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__)("./04.背景循环.xml");
        if (xmlPanel === null)
            return null;
        var direction = xmlPanel.direction;
        if (!direction)
            return null;
        var moveME = [];
        switch (direction) {
            case "left":
                moveME = [new SAT_1.Vector(-1, 0), new SAT_1.Vector(-2, 0)];
                break;
            case "right":
                moveME = [new SAT_1.Vector(1, 0), new SAT_1.Vector(2, 0)];
                break;
            case "top":
                moveME = [new SAT_1.Vector(0, -1), new SAT_1.Vector(0, -2)];
                break;
            case "bottom":
                moveME = [new SAT_1.Vector(0, 1), new SAT_1.Vector(0, 2)];
                break;
            default:
                throw new Error("无效的方向：" + direction);
        }
        return {
            direction: direction,
            moveME: moveME
        };
    }
    var KEY_FRAMES = [FRAME_1, FRAME_90];
    log.info("KEY_FRAMES:".concat(KEY_FRAMES));
    function EditDynamic(moveME) {
        function getMoveOffset() {
            var moveDirection = _.last(moveME);
            var originSize = getSymbolSize(innerElement);
            var moveOffset = moveDirection.clone().scale(originSize.width, originSize.height);
            return moveOffset;
        }
        doc.enterEditMode('inPlace');
        (0, ElementSelect_1.SelectAll)();
        var innerElement = doc.selection[0];
        for (var _i = 0, moveME_1 = moveME; _i < moveME_1.length; _i++) {
            var me = moveME_1[_i];
            var mo = new MoreElement(innerElement, me);
            mo.gridSelection();
        }
        doc.selectAll();
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)("背景循环_静_");
        doc.convertToSymbol('graphic', symbolName, 'center');
        var timeline = doc.getTimeline();
        timeline.insertFrames(_.last(KEY_FRAMES));
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
        timeline.setSelectedFrames(FRAME_90, FRAME_90 + 1);
        var moveOffset = getMoveOffset();
        doc.moveSelectionBy(moveOffset);
        timeline.setSelectedFrames(_.first(KEY_FRAMES), _.last(KEY_FRAMES));
        (0, EaseCurve_1.setClassicEaseCurve)(timeline);
        doc.exitEditMode();
        alert('动作已生成!');
    }
    function Main() {
        var config = checkXMLPanel();
        if (!config)
            return;
        var direction = config.direction, moveME = config.moveME;
        var symbolName = (0, SymbolNameGenerator_1.generateNameUntilUnique)('背景循环_动_');
        doc.convertToSymbol('graphic', symbolName, 'center');
        EditDynamic(moveME);
    }
    Main();
});
