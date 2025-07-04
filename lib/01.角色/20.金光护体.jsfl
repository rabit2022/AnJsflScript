/**
 * @file: 20.金光护体.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/4 21:33
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
    "FilterDefinitions",
    "JSFLConstants",
    "EaseCurve",
    "ElementAnim"
], function (checkUtil, log, kfo, sng, fd, JSFLConstants, ec, ea) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { convertToKeyframesSafety, KFrameOnlyOne } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    const { DropShadowFilterBuilder, GlowFilterBuilder } = fd.BUILDERS;
    const { FRAME_1, FRAME_16, FRAME_30 } = JSFLConstants.Numerics.frame.frameList;

    const { setEaseCurveEx } = ec;
    const { playLoop } = ea;

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
    // const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    const FILTER_1 = [
        new DropShadowFilterBuilder()
            .setBlur(50)
            .setColor("#FFFF00")
            .setQuality("low")
            .setStrength(100)
            .build(),
        new GlowFilterBuilder()
            .setColor("#FF3300")
            .setQuality("low")
            .setStrength(100)
            .setBlur(50)
            .build()
    ];
    const FILTER_2 = [
        new DropShadowFilterBuilder()
            .setBlur(100)
            .setColor("#FFFF00")
            .setQuality("low")
            .setStrength(100)
            .build(),
        new GlowFilterBuilder()
            .setColor("#FF3300")
            .setQuality("low")
            .setStrength(100)
            .setBlur(100)
            .build()
    ];
    // log.info("FILTER_1", FILTER_1);
    // log.info("FILTER_2", FILTER_2);

    const KEY_FRAMES = [FRAME_1, FRAME_16, FRAME_30];

    function Main() {
        var symbolName = generateNameUntilUnique("金光护体_");
        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        timeline.insertFrames(FRAME_30, true);
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        curLayer.setFiltersAtFrame(KEY_FRAMES[0], FILTER_1);
        curLayer.setFiltersAtFrame(KEY_FRAMES[1], FILTER_2);
        curLayer.setFiltersAtFrame(KEY_FRAMES[2], FILTER_1);

        setEaseCurveEx(timeline, KEY_FRAMES, "Classic Ease");
        doc.exitEditMode();

        playLoop();
    }

    Main();
});
