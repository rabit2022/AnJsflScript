// 这个文件由脚本 #03.随机水印.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "COMPATIBILITY", "StringPaser", "store-js", "COMPATIBILITY", "JSFLConstants", "ElementQuery", "KeyFrameOperation", "random", "SAT", "SAT", "satUtil", "EaseCurve", "linq"], function (require, exports, checkUtil_1, COMPATIBILITY_1, StringPaser_1, store, COMPATIBILITY_2, JSFLConstants, ElementQuery_1, KeyFrameOperation_1, random, sat, SAT_1, satUtil_1, EaseCurve_1, Enumerable) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FPS = JSFLConstants.Numerics.frame.frameRate.FPS;
    var FRAME_1 = JSFLConstants.Numerics.frame.frameList.FRAME_1;
    var getStageBounds = sat.ENTITY.STAGE.getBounds;
    var getStageSize = sat.ENTITY.STAGE.getSize;
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
        var panel = (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__)("./03.随机水印/03.随机水印.xml");
        if (panel === null)
            return;
        var text = panel.text;
        if (!text)
            return null;
        var alpha = (0, StringPaser_1.parseNumber)(panel.alpha, "请输入合法的透明度值。", {
            start: 1,
            end: 100
        });
        if (alpha === null)
            return null;
        var size = (0, StringPaser_1.parseNumber)(panel.size, "请输入合法的字体大小。", { start: 0, end: 10 });
        if (size === null)
            return null;
        var speed = (0, StringPaser_1.parseNumber)(panel.speed, "请输入合法的速度值。", { start: 1, end: 100 });
        if (speed === null)
            return null;
        var interval = (0, StringPaser_1.parseNumber)(panel.interval, "请输入合法的间隔值。");
        if (interval === null)
            return null;
        return {
            text: text,
            alpha: alpha,
            size: size,
            speed: speed,
            interval: interval
        };
    }
    var ns_store = store.namespace("04-走路-短腿");
    function generateSegments(totalFrameCount, intervalFrames) {
        return (Enumerable
            .range(0, Math.ceil(totalFrameCount / intervalFrames))
            .select(function (i) {
            var start = i * intervalFrames;
            var end = Math.min(start + intervalFrames - 1, totalFrameCount - 1);
            return [start, end];
        })
            .toArray());
    }
    function Main() {
        var config = checkXMLPanel();
        if (!config)
            return;
        var WATERMARK_TEXT = config.text, WATERMARK_ALPHA = config.alpha, size = config.size, speed = config.speed, interval = config.interval;
        var WATERMARK_LAYER_INDEX = 0;
        var SYMBOL_FRAME_COUNT = 0;
        {
            ns_store.set("WATERMARK_TEXT", WATERMARK_TEXT);
            ns_store.set("WATERMARK_ALPHA", WATERMARK_ALPHA);
            (0, COMPATIBILITY_2.__WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__)("./03.随机水印/创建随机水印元件.generated.jsfl");
            WATERMARK_LAYER_INDEX = ns_store.get("WATERMARK_LAYER_INDEX");
            timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, FRAME_1, FRAME_1 + 1]);
            var selection_1 = doc.selection;
            SYMBOL_FRAME_COUNT = (0, ElementQuery_1.getFrameCount)(selection_1[0]);
        }
        var segments = [];
        {
            var intervalFrames = interval * FPS;
            var layers = timeline.layers;
            var watermarkLayer = layers[WATERMARK_LAYER_INDEX];
            var totalFrameCount = watermarkLayer.frameCount;
            segments = generateSegments(totalFrameCount, intervalFrames);
            segments.forEach(function (_a) {
                var start = _a[0], end = _a[1];
                (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, start);
            });
        }
        {
            for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
                var _a = segments_1[_i], start = _a[0], end = _a[1];
                timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, start, start + 1]);
                {
                    var selection_2 = doc.selection;
                    var selectedElement = selection_2[0];
                    selectedElement.firstFrame = random.randomint(0, SYMBOL_FRAME_COUNT - 1);
                }
                {
                    var MARGIN = 100;
                    var stageBounds = getStageBounds();
                    var shrinkedBounds = stageBounds.shrink(MARGIN);
                    var randomPoint = (0, satUtil_1.generateRandomPointInRect)(shrinkedBounds);
                    var selectedElement = doc.selection[0];
                    selectedElement.x = randomPoint.x;
                    selectedElement.y = randomPoint.y;
                }
                {
                    var scale = size * random.uniform(1, 2);
                    doc.scaleSelection(scale, scale);
                }
                {
                    (0, KeyFrameOperation_1.convertToKeyframesSafety)(timeline, end);
                    timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, end, end + 1]);
                    {
                        var stageSize = getStageSize();
                        var direction = new SAT_1.Vector(random.uniform(-1, 1), random.uniform(-1, 1));
                        var speedFactor = speed / 100;
                        var deltaOffset = direction
                            .normalize()
                            .scale(speedFactor)
                            .scale(stageSize.width, stageSize.height);
                        doc.moveSelectionBy(deltaOffset);
                    }
                }
                {
                    var KEY_FRAMES = [start, end];
                    (0, EaseCurve_1.setEaseCurveEx)(timeline, KEY_FRAMES, "Classic Ease");
                }
            }
        }
        {
            timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, FRAME_1, FRAME_1 + 1]);
            var layers_1 = timeline.layers;
            var watermarkLayer = layers_1[WATERMARK_LAYER_INDEX];
            watermarkLayer.locked = true;
        }
    }
    Main();
});
