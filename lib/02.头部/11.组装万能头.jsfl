/**
 * @file: #
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 19:50
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
    "xmlPanelUtil",
    "ElementChecker",
    "ElementQuery",
    "numpy",
    "COMPATIBILITY",
    "SAT",
    "store-js",
    "FramesSelect"
], function(checkUtil, log, xmlPanelUtil, ec, eq, np, COMPATIBILITY, sat, store, fms) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { IsSymbol } = ec;
    const { getName, getFrameCount } = eq;

    const { isMultiple } = np;

    const { parseNumber, parseString } = xmlPanelUtil;
    const { SelectStartFms } = fms;

    const {
        __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__,
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__
    } = COMPATIBILITY;

    const { Vector } = sat;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    // 获取第一帧
    var selectedFrames = CheckSelectedFrames(timeline);
    if (!selectedFrames) return;
    const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // prettier-ignore
    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "Only two", "请确保同时选中了头和万能表情！")) return;

    // // 检查选择的图层
    // if (!CheckSelectedLayers(timeline, "No limit")) return;
    // endregion doc

    // log.setLevel(log.levels.TRACE);
    const ns_store = store.namespace("11-组装万能头");

    // const ns_store = store;

    function checkXMLPanel() {
        // var panel = getXMLPanel();
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__(
            "./11.组装万能头/11.组装万能头.xml"
        );
        if (panel === null) return null;

        var shakeIntensity = parseNumber(
            panel.shakeIntensity,
            "摇头强度只能输入数字，请重新输入。"
        );
        if (shakeIntensity === null) return null;
        var motionFrameCount = parseNumber(
            panel.motionFrameCount,
            "表情帧数只能输入数字，请重新输入。"
        );
        if (motionFrameCount === null) return null;
        var headDirection = parseNumber(
            panel.headDirection,
            "头部朝向只能输入数字，请重新输入。"
        );
        if (headDirection === null) return null;
        var shakeMode = parseString(
            panel.shakeMode,
            "摇头模式只能输入 (传统摇头 丝滑摇头)，请重新输入。"
        );
        if (shakeMode === null) return null;

        // frameSelector
        var frameSelector = parseString(
            panel.frameSelector,
            "帧选择器只能输入 (keyFrame,label)，请重新输入。"
        );
        if (frameSelector === null) return null;

        return {
            shakeIntensity: shakeIntensity,
            motionFrameCount: motionFrameCount,
            headDirection: headDirection,
            shakeMode: shakeMode,
            frameSelector: frameSelector
        };
    }

    /**
     * 分开 头部 和 万能表情
     * @note 认为 万能表情 的帧数最多
     * @param {Element[]} selection
     * @returns {{head: Element, expression: Element}}
     */
    function checkHeadAndExpression(selection) {
        var isAllSymbol = selection.every(IsSymbol);
        if (!isAllSymbol) {
            alert("请确保选择的元件都是 元件！");
            return null;
        }

        var frameCounts = selection.map(getFrameCount);
        log.debug("frameCounts:", frameCounts);

        // 找到最大值
        // var maxFrameCount = Math.max(...frameCounts);
        var maxFrameCount = Math.max.apply(null, frameCounts);

        // 找到最大值的索引
        var maxIndex = frameCounts.indexOf(maxFrameCount);

        log.debug("最大帧数的索引是：", maxIndex); // 输出最大帧数的索引

        var expression = selection[maxIndex];
        var head = selection[1 - maxIndex];
        return {
            head: head,
            expression: expression
        };
    }

    function getExpressionDuration(expression) {
        var itemTimeline = expression.libraryItem.timeline;
        var firstExpression = itemTimeline.layers[0].frames[0];
        return firstExpression.duration;
    }

    function checkMotionFrameCount(expression, motionFrameCount) {
        const MAX_MOTION_FRAME_COUNT = getFrameCount(expression);
        const EXPRESSION_DURATION = getExpressionDuration(expression);
        // log.debug("MAX_MOTION_FRAME_COUNT:", MAX_MOTION_FRAME_COUNT);
        // log.debug("EXPRESSION_DURATION:", EXPRESSION_DURATION);

        // 检查表情帧数是否为持续时间的倍数
        if (!isMultiple(EXPRESSION_DURATION, motionFrameCount)) {
            fl.trace(
                "[ERROR] 优化建议：万能表情中单个表情持续了" +
                EXPRESSION_DURATION +
                "帧，但输入的表情帧数为" +
                motionFrameCount +
                "帧，两者不是倍数关系，建议检查..."
            );
            return;
        }
        return {
            MAX_MOTION_FRAME_COUNT: MAX_MOTION_FRAME_COUNT,
            EXPRESSION_DURATION: EXPRESSION_DURATION
        };
    }

    function Main() {
        // 分开 头部 和 万能表情
        var headconfig = checkHeadAndExpression(selection);
        if (!headconfig) return;
        const { head, expression } = headconfig;

        // 读取XML面板配置
        var config = checkXMLPanel();
        if (config === null) return;
        const {
            shakeIntensity,
            motionFrameCount,
            headDirection,
            shakeMode,
            frameSelector
        } = config;

        var motionConfig = checkMotionFrameCount(expression, motionFrameCount);
        if (!motionConfig) return;
        const { MAX_MOTION_FRAME_COUNT, EXPRESSION_DURATION } = motionConfig;

        ns_store.set("config", config);
        ns_store.set("ElementPosition", Vector.from(selection[0]));
        ns_store.set("MAX_MOTION_FRAME_COUNT", MAX_MOTION_FRAME_COUNT);
        ns_store.set("EXPRESSION_DURATION", EXPRESSION_DURATION);


        switch (frameSelector) {
            case "keyFrame":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
                    "./11.组装万能头/帧选择器-关键帧.jsfl"
                );
                break;
            case "label":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
                    "./11.组装万能头/帧选择器-标签.jsfl"
                );
                break;
            default:
                throw new Error("帧选择器只能输入 (keyFrame,label)！");
        }

        SelectStartFms(timeline, selectedFrames);
    }

    Main();
});
