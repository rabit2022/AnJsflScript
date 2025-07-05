/**
 * @file: 00.调改色.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/5 21:17
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
    "FilterDefinitions",
    "promptUtil",
    "FilterOperation",
    "COMPATIBILITY"
], function (checkUtil, log, fd, promptUtil, fo, COMPATIBILITY) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { GlowFilterBuilder } = fd.BUILDERS;

    const { parseNumber } = promptUtil;
    const { addFilterToFrame } = fo;

    const { __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__ } = COMPATIBILITY;

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

    // 获取第一帧
    var selectedFrames = CheckSelectedFrames(timeline);
    if (!selectedFrames) return;
    const { firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame } =
        selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function getDefaultBlur(layer, frameIndex) {
        // 获取当前帧的滤镜数组，如果不存在则初始化为空数组
        var filters = layer.getFiltersAtFrame(frameIndex) || [];

        // 如果滤镜名称已存在，则替换掉原滤镜
        var index = filters.findIndex(function (item) {
            return item.name === "glowFilter";
        });
        if (index !== -1) {
            var filter = filters[index];
            return {
                blurX: filter.blurX,
                blurY: filter.blurY
            };
        }
    }

    function checkXMLPanel() {
        // var panel = getXMLPanel();
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./04.发光色.xml");
        if (panel === null) return null;

        var color = panel.select_color;
        log.info("color:", color);

        return { color: color };
    }

    function Main() {
        const config = checkXMLPanel();
        if (config === null) return;
        const { color } = config;

        var FILTER = new GlowFilterBuilder().setColor(color);

        const blur = getDefaultBlur(firstSlLayer, firstSlFrameIndex);
        if (blur) {
            const { blurX, blurY } = blur;
            FILTER = FILTER.setBlurX(blurX).setBlurY(blurY);
        }
        FILTER = FILTER.build();

        log.info("FILTER:", FILTER);

        addFilterToFrame(firstSlLayer, firstSlFrameIndex, FILTER);
    }

    Main();
});
