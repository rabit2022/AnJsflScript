/**
 * @file: 11.一键描边.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 23:31
 * @project: AnJsflScript
 * @description:
 * @see:https://gitee.com/ninge/WindowSWF/tree/master/
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "xmlPanelUtil",
    "os",
    "chroma-js",
    "lodash",
    "ElementOperation",
    "ElementSelect",
    "COMPATIBILITY"
], function (checkUtil, log, xmlPanelUtil, os, chroma, _, eo, es, COMPATIBILITY) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { processElements } = eo;

    const { SelectAll, OnlySelectCurrent, SelectNone, InvertSelection } = es;
    const {parseNumber, parseString, parseColor}=xmlPanelUtil;

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

    // // 获取第一帧
    // var frs = CheckSelectedFrames(timeline);
    // if (frs === null) return;
    // var firstLayer = layers[frs[0].layerIndex];
    // var firstFrame = frs[0].startFrame;

    // endregion doc

    // var [folder_name, basename] = os.path.split(fl.scriptURI);
    // var XMLPANEL = os.path.join(folder_name, "11.一键描边", "11.一键描边.xml");
    // log.info("XMLPANEL: " + XMLPANEL);

    function checkXMLPanel() {
        // var panel = getXMLPanel(XMLPANEL);
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./11.一键描边/11.一键描边.xml");
        if (panel === null) return null;

        var size = parseNumber(panel.size, "描边大小 应该使用数字");
        if (size === null) return null;

        var color = parseColor(
            panel.color,
            "请输入描边颜色，如 #FFFFFF，black等"
        );
        if (color === null) return null;

        var alphaMode = panel.alpha_mode;
        var alphaValue = panel.alpha_value; // 用户输入的原始值
        var normalizedAlpha = 0.0; // 最终0-1范围的透明度
        var parsedValue = 0; // 用于存储解析后的值

        switch (alphaMode) {
            case "percent": // 0-100 → 0-1
                parsedValue = parseNumber(alphaValue, "透明度应为0-100", {
                    start: 0,
                    end: 100
                });
                if (parsedValue === null) return null;
                normalizedAlpha = parsedValue / 100;
                break;

            case "byte": // 0-255 → 0-1
                parsedValue = parseNumber(alphaValue, "透明度应为0-255", {
                    start: 0,
                    end: 255
                });
                if (parsedValue === null) return null;
                normalizedAlpha = parsedValue / 255;
                break;

            case "decimal": // 0-1（直接使用）
                parsedValue = parseNumber(alphaValue, "透明度应为0-1", {
                    start: 0,
                    end: 1
                });
                if (parsedValue === null) return null;
                normalizedAlpha = parsedValue;
                break;

            default:
                throw new Error(
                    "不支持的透明度模式: " +
                        alphaMode +
                        "（可选: percent、byte、decimal）"
                );
        }

        // 确保最终值在0-1范围内（防御性编程）
        // normalizedAlpha = Math.max(0, Math.min(1, normalizedAlpha));
        normalizedAlpha = _.clamp(normalizedAlpha, 0, 1);

        // chroma直接使用0-1范围（不再额外除255）
        var colorWithAlpha = chroma(color).alpha(normalizedAlpha).hex();
        log.info("最终颜色（带透明度）: " + colorWithAlpha);

        // var stroke_type = panel.stroke_type;
        var stroke_type = parseString(
            panel.stroke_type, // hairline|solid|dashed|dotted|ragged|stipple|
            "请输入正确的描边类型。 如 hairline(细线), solid(实线), dashed(虚线), dotted(点线), ragged(不规则), stipple(斑马线)"
        );
        return {
            size: size,
            colorWithAlpha: colorWithAlpha,
            stroke_type: stroke_type
        };
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        // 检查XML面板
        var config = checkXMLPanel();
        if (config === null) return;
        const { size, colorWithAlpha, stroke_type } = config;
        log.info("size: ", size, "colorWithAlpha: ", colorWithAlpha);

        function setStroke(elements) {
            // doc.selectAll();
            SelectAll(elements);
            // doc.setStroke(colorWithAlpha, size, "solid");
            doc.setStroke(colorWithAlpha, size, stroke_type);
        }

        processElements(selection[0], setStroke, "一键描边_");
    }

    Main();
});
