/**
 * @file: 20.打电话.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/26 22:23
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "KeyFrameOperation",
    "SymbolNameGenerator",
    "LayerList",
    "LayerOperation",
    "ElementSelect",
    "FillDefinitions",
    "StrokeDefinitions",
    "ColorPanel",
    "SAT",
    "FilterDefinitions",
    "FilterOperation",
    "JSFLConstants",
    "ElementAnim"
], function (
    checkUtil,
    log,
    kfo,
    sng,
    LayerList,
    lo,
    es,
    fd,
    sd,
    panel,
    sat,
    flt,
    fo,
    JSFLConstants,
    ea
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { convertToKeyframesSafety, KFrameOnlyOne } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { setParentLayer } = lo;
    const { SelectNone } = es;

    const { SolidFillBuilder, RadialGradientFillBuilder } = fd.BUILDERS;
    const { NoStroke } = sd;
    const { setCustomPanel, resetCustomPanel } = panel;
    const { GlowFilterBuilder } = flt.BUILDERS;
    const { addFilterToFrame } = fo;

    const { Size, Circle, Vector } = sat;
    const getSymbolBounds = sat.ENTITY.SYMBOL.getBounds;

    const { FRAME_1, FRAME_30 } = JSFLConstants.Numerics.frame.frameList;

    const { playOnce } = ea;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    // "打电话","人物", "显示圆" 图层
    const PHONE_LAYER_NAME = "打电话";
    const PERSON_LAYER_NAME = "人物";
    const SHOW_LAYER_NAME = "显示圆";

    const PHONE_LAYER = 0;
    const PERSON_LAYER = 1;
    const SHOW_LAYER = 2;

    function addLayer(timeline) {
        // 添加图层
        var layerlist = new LayerList(timeline);

        layerlist.insert(0, PHONE_LAYER_NAME, "mask");
        layerlist.append(SHOW_LAYER_NAME, "normal");

        setParentLayer(timeline, PERSON_LAYER, PHONE_LAYER, "mask");

        SelectNone();
    }

    /**
     * 获取圆的半径
     * @param {Timeline}timeline
     * @returns {number}
     */
    function getRadius(timeline) {
        // 383.05,440.45    286.3
        // 383.05,500       325
        // 600,500           390
        // 500,600           390
        // max(w,h)*0.65
        // log.debug(timeline.layers, timeline.layers.length);
        // log.debug(timeline.layers[PERSON_LAYER],timeline.layers[PERSON_LAYER].name);
        var person = timeline.layers[PERSON_LAYER].frames[0].elements[0];
        var size = Size.from(person);
        var max_size = size.max_size;
        return (max_size * 0.65) / 2;
    }

    function getCenter(element) {
        // log.info("getCenter: ", element);
        // top 向下 1/4
        var elementRect = getSymbolBounds(element);
        var top = elementRect.getCorner("top center");

        var height = elementRect.height;
        var offset = new Vector(0, height / 4);

        var finalPosition = top.clone().add(offset);

        return finalPosition;
    }

    function drawPhoneCircle(timeline) {
        timeline.currentLayer = PHONE_LAYER;

        var customFill = new SolidFillBuilder().setColor("white").build();
        // log.info(customFill);
        var customStroke = new NoStroke();
        // log.info(customStroke);
        setCustomPanel(customStroke, customFill);

        var radius = getRadius(timeline);
        // log.info(radius);
        var center = getCenter(selection[0]);
        // log.info("center", center);
        var rect = new Circle(center, radius).getBounds();
        // log.info("rect", rect);
        doc.addNewOval(rect.toObj(), false, true);

        resetCustomPanel();
    }

    function drawShowCircle(timeline) {
        timeline.currentLayer = SHOW_LAYER;

        var customFill = new RadialGradientFillBuilder()
            .addColorStop(26, "#FFFFFF7F")
            .addColorStop(255, "#000000CC")
            .build();
        // log.info(customFill);
        var customStroke = new NoStroke();
        // log.info(customStroke);
        setCustomPanel(customStroke, customFill);

        var radius = getRadius(timeline);
        // log.info(radius);
        var center = getCenter(selection[0]);
        // log.info("center", center);
        var rect = new Circle(center, radius).getBounds();
        // log.info("rect", rect);
        doc.addNewOval(rect.toObj(), false, true);

        resetCustomPanel();
    }

    function addFilter(timeline) {
        timeline.currentLayer = SHOW_LAYER;

        var glowFilter = new GlowFilterBuilder()
            .setBlur(61)
            .setColor("#0066FF")
            .setStrength(100)
            .setQuality("low")
            .build();
        log.info(glowFilter);

        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        addFilterToFrame(curLayer, FRAME_1, glowFilter);
    }

    function setLayer(timeline) {
        timeline.insertFrames(FRAME_30, true); // 插入帧

        // 设置遮罩圆图层为不可见
        // 锁定遮罩圆图层,显示圆图层
        timeline.layers[PHONE_LAYER].visible = false;

        timeline.layers[PHONE_LAYER].locked = true;
        timeline.layers[SHOW_LAYER].locked = true;
    }

    function Main() {
        var symbolName = generateNameUntilUnique("打电话_");
        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline(); // 获取时间轴对象

        addLayer(timeline);

        drawPhoneCircle(timeline);

        drawShowCircle(timeline);

        addFilter(timeline);

        setLayer(timeline);

        doc.exitEditMode();

        // 播放一次
        playOnce();
    }

    Main();
});
