/**
 * @file: 09.一键转场.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/16 15:33
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
// "undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "xmlPanelUtil",
    "LayerOperation",
    "JSFLConstants",
    "SymbolNameGenerator",
    "ElementOperation",
    "SAT",
    "DrawRectangle",
    "KeyFrameOperation",
    "linqUtil",
    "FramesSelect",
    "lodash",
    "EaseCurve",
    "chroma-js","COMPATIBILITY"
], function (
    checkUtil,
    log,
    xmlPanelUtil,
    lo,
    JSFLConstants,
    sng,
    eo,
    SAT,
    dr,
    kfo,
    linqUtil,
    fms,
    _,
    ec,
    chroma,COMPATIBILITY
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { getXMLPanel } = xmlPanelUtil;
    const { addNewLayerSafety } = lo;
    const { FRAME_1, FRAME_9, FRAME_17, FRAME_18 } =
        JSFLConstants.Numerics.frame.frameList;
    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { convertToSymbolWithBlanks } = eo;
    const { drawRectangleWithoutLine } = dr;
    const { convertToKeyframesSafety } = kfo;
    const { $addOffset } = linqUtil;
    const { SelectStartFms } = fms;
    const { setClassicEaseCurve } = ec;

    const { getStageRect } = SAT.GLOBALS;

    const {__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__}=COMPATIBILITY;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // endregion doc

    const FirstFrame = firstFrame - 8;
    // 当前0，[-8,0,8]
    var KEY_FRAMES = [FRAME_1, FRAME_9, FRAME_17];
    var BLANK_FRAMES = [FRAME_18];
    KEY_FRAMES = $addOffset(KEY_FRAMES, FirstFrame);
    BLANK_FRAMES = $addOffset(BLANK_FRAMES, FirstFrame);
    /**
     *
     * @type {number[]}
     */
    var ALPHA_FRAMES = [_.first(KEY_FRAMES), _.last(KEY_FRAMES)];

    function checkXMLPanel() {
        // var panel = getXMLPanel();
        var panel = ./09.一键转场.xml;
        if (panel === null) return null;

        return { transitionMode: panel.transitionModeGroup };
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // k首帧，-8
        // 当前0，[-8,0,8]
        if (FirstFrame < FRAME_1) {
            alert("当前位置前后帧数不够！请保证当前位置前后帧数至少为9帧！");
            return;
        }

        // 检查XML面板
        var config = checkXMLPanel();
        if (config === null) return;
        const { transitionMode } = config;
        log.info("transitionMode", transitionMode);

        const TRANSITION_COLOR = chroma(transitionMode).hex();
        log.info("CLOLR", TRANSITION_COLOR);

        // 1.添加一键转场图层
        var layerName = "一键转场";
        var newLayerIndex = addNewLayerSafety(timeline, layerName);

        // k首帧，-8
        convertToKeyframesSafety(timeline, FirstFrame);

        // 2.转场 元件
        // 矩形
        log.info("FirstFrame", FirstFrame);
        timeline.setSelectedFrames(FirstFrame, FirstFrame + 1);

        var symbolName = generateNameUntilUnique("一键转场_");
        convertToSymbolWithBlanks(symbolName);

        doc.enterEditMode("inPlace");

        // 比舞台大400的范围
        var stageRect = getStageRect();
        var newRect = stageRect.expand(400);
        log.info("newRect", newRect.toString());
        drawRectangleWithoutLine(newRect, TRANSITION_COLOR);

        doc.exitEditMode();

        // 3.关键帧
        convertToKeyframesSafety(timeline, KEY_FRAMES);
        timeline.convertToBlankKeyframes(BLANK_FRAMES[0]);

        // 4.alpha 关键帧
        ALPHA_FRAMES.forEach(function (frame) {
            timeline.setSelectedFrames(frame, frame + 1);
            doc.setInstanceAlpha(0);
        });

        // 5.转场动画
        timeline.setSelectedFrames(_.first(KEY_FRAMES), _.last(KEY_FRAMES));
        setClassicEaseCurve(timeline);

        // 6.reset selected frames
        SelectStartFms(timeline, frs);
    }

    Main();
});
