// 这个文件由脚本 生成环绕飞行_内部.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "SymbolNameGenerator", "SAT", "JSFLConstants", "KeyFrameOperation", "EaseCurve", "ElementAnim"], function (require, exports, checkUtil_1, SymbolNameGenerator_1, SAT_1, JSFLConstants, KeyFrameOperation_1, EaseCurve_1, ElementAnim_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = JSFLConstants.Numerics.frame.frameList, FRAME_1 = _a.FRAME_1, FRAME_15 = _a.FRAME_15, FRAME_30 = _a.FRAME_30;
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
    function getRect(radius) {
        var size = new SAT_1.Size(radius * 2, radius * 0.8);
        var center = new SAT_1.Vector(size.width / 2, 0);
        var rect = SAT_1.Rectangle.fromCenter(center, size);
        return rect;
    }
    function getOffsets(radius) {
        var rect = getRect(radius);
        var rightCenter = rect.getCorner("right center");
        var leftCenter = rect.getCorner("left center");
        var offset = new SAT_1.Vector(0, 2);
        var top = leftCenter.clone().sub(offset);
        var bottom = leftCenter.clone().add(offset);
        var offsets = [top, rightCenter, bottom];
        return offsets;
    }
    var KEY_FRAMES = [FRAME_1, FRAME_15, FRAME_30];
    var MOTION_GUIDE_LAYER_INDEX = 0;
    var AROUND_LAYER_INDEX = 1;
    function Main() {
        var layers;
        var RADIUS = 400;
        doc.enterEditMode("inPlace");
        var timeline = doc.getTimeline();
        var symbolName = (0, SymbolNameGenerator_1.generateNameUseLast)("环绕飞行_飞行物");
        doc.convertToSymbol("graphic", symbolName, "center");
        {
            MOTION_GUIDE_LAYER_INDEX = timeline.addMotionGuide();
            layers = timeline.layers;
            var motionGuideLayer = layers[MOTION_GUIDE_LAYER_INDEX];
            motionGuideLayer.name = "运动曲线";
            var rect = getRect(RADIUS);
            var elementPos = SAT_1.Vector.from(selection[0]);
            var finalRect = rect.addOffset(elementPos);
            doc.addNewOval(finalRect, true);
        }
        timeline.insertFrames(FRAME_30, true);
        timeline.setSelectedLayers(AROUND_LAYER_INDEX);
        (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, KEY_FRAMES);
        {
            layers = timeline.layers;
            var aroundLayer = layers[AROUND_LAYER_INDEX];
            var offsets_1 = getOffsets(RADIUS);
            function setPosition(frame, position) {
                timeline.setSelectedFrames([AROUND_LAYER_INDEX, frame, frame + 1]);
                var FRAME_1_Element = aroundLayer.frames[frame].elements[0];
                FRAME_1_Element.x = position.x;
                FRAME_1_Element.y = position.y;
            }
            KEY_FRAMES.forEach(function (frame, index) {
                setPosition(frame, offsets_1[index]);
            });
            (0, EaseCurve_1.setEaseCurveEx)(timeline, KEY_FRAMES, "Classic Ease");
        }
        doc.exitEditMode();
        (0, ElementAnim_1.playLoop)();
    }
    Main();
});
