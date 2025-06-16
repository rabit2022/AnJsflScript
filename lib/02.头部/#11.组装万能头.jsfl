/**
 * @file: #11.组装万能头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 19:50
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1];;if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);;typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require([
    "checkUtil",
    "loglevel",
    "xmlPanelUtil",
    "ElementChecker",
    "ElementQuery",
    "numpy"
], function (checkUtil, log, xmlPanelUtil, ec, eq, np) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { IsSymbol } = ec;
    const { getName } = eq;

    const { isMultiple } = np;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    // endregion doc

    log.setLevel(log.levels.INFO);

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        var shakeIntensity = xmlPanelUtil.parseNumber(
            panel.shakeIntensity,
            "摇头强度只能输入数字，请重新输入。"
        );
        if (shakeIntensity === null) return null;
        var motionFrameCount = xmlPanelUtil.parseNumber(
            panel.motionFrameCount,
            "表情帧数只能输入数字，请重新输入。"
        );
        if (motionFrameCount === null) return null;
        var headDirection = xmlPanelUtil.parseNumber(
            panel.headDirection,
            "头部朝向只能输入数字，请重新输入。"
        );
        if (headDirection === null) return null;
        var shakeMode = xmlPanelUtil.parseString(
            panel.shakeMode,
            "摇头模式只能输入 (传统摇头 丝滑摇头)，请重新输入。"
        );
        if (shakeMode === null) return null;

        // frameSelector
        var frameSelector = xmlPanelUtil.parseString(
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
            alert("请确保选择的元件都是符号！");
            return null;
        }

        var frameCounts = selection.map(function (element) {
            return element.libraryItem.timeline.frameCount;
        });
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

    function getElementInfo(element) {
        var itemTimeline = element.libraryItem.timeline;

        var frameCount = itemTimeline.frameCount;
        var duration = itemTimeline.layers[0].frames[0].duration;
        return {
            frameCount: frameCount,
            duration: duration
        };
    }

    function checkMotionFrameCount(expression, motionFrameCount) {
        const { frameCount: EXPRESSION_FRAME_COUNT, duration: EXPRESSION_DURATION } =
            getElementInfo(expression);
        log.debug("frameCount:", EXPRESSION_FRAME_COUNT);
        log.debug("duration:", EXPRESSION_DURATION);

        // 检查表情帧数是否为持续时间的倍数
        if (!isMultiple(EXPRESSION_DURATION, motionFrameCount)) {
            console.trace(
                "优化建议：万能表情中单个表情持续了" +
                    EXPRESSION_DURATION +
                    "帧，但输入的表情帧数为" +
                    motionFrameCount +
                    "帧，两者不是倍数关系，建议检查..."
            );
        }
    }

    function Main() {
        // prettier-ignore
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only two", "请确保同时选中了头和万能表情！")) return;

        // 分开 头部 和 万能表情
        var headconfig = checkHeadAndExpression(selection);
        if (!headconfig) return;
        const { head, expression } = headconfig;
        log.log("head:", getName(head));
        log.log("expression:", getName(expression));

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
        log.debug("shakeIntensity:", shakeIntensity);
        log.debug("motionFrameCount:", motionFrameCount);
        log.debug("headDirection:", headDirection);
        log.debug("shakeMode:", shakeMode);
        log.debug("frameSelector:", frameSelector);

        checkMotionFrameCount(expression, motionFrameCount);
    }

    Main();
});
