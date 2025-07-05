/**
 * @file: 12.一键阴影.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/5 15:14
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
    "COMPATIBILITY",
    "StringPaser",
    "ElementQuery",
    "ColorTransformDefinitions",
    "FilterDefinitions",
    "SAT"
], function (checkUtil, log, COMPATIBILITY, strp, eq, ctd, fd, sat) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__ } = COMPATIBILITY;

    const { parseDirection } = strp;
    const { getName } = eq;

    const { setInstanceBrightness } = ctd.INSTANCES;
    const { AlphaColorTransformBuilder } = ctd.BUILDERS;
    const { AdjustColorFilter } = fd;

    const { Transform, Scale, Vector, Size, Skew } = sat;

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

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "Only one")) return;

    // 获取第一帧
    var selectedFrames = CheckSelectedFrames(timeline);
    if (!selectedFrames) return;
    const { firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame } =
        selectedFrames;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function checkXMLPanel() {
        var panel =
            __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./12.一键阴影.xml");
        if (panel === null) return null;

        var direction = parseDirection(panel.direction, {
            left: -1,
            right: 1
        });
        if (!direction) return null;

        return {
            direction: direction
        };
    }

    function addLayer(timeline) {
        var layerName = getName(firstSlLayer);
        log.info("layer name: ", layerName);

        doc.clipCopy();

        var newLayerName = layerName + "_影子";
        var newLayerIndex = timeline.addNewLayer(newLayerName, "normal", false);

        doc.clipPaste(true);

        return newLayerIndex;
    }

    const ElEMENT_LAYER_INDEX = curLayerIndex;
    var SHADOW_LAYER_INDEX = 0;

    function setLayer(direction) {
        var layers = timeline.layers; //图层
        var shadowLayer = layers[SHADOW_LAYER_INDEX]; //新图层
        var elementLayer = layers[ElEMENT_LAYER_INDEX]; //元素图层

        var element = doc.selection[0];

        setInstanceBrightness(element, -100);

        shadowLayer.setFiltersAtFrame(firstSlFrameIndex, FILTER);
        shadowLayer.setColorTransformAtFrame(firstSlFrameIndex, COLOR_TRANSFORM);

        // region 调整位置
        // var scale = new Scale(1, 0.565);
        // var skew = new Skew(direction * 42, 0);
        // var tr=new Transform(element).setScale(scale).setSkew(skew);
        // bug: tr类 设置scale和skew后，不能确定位置，导致最后的效果不对

        doc.scaleSelection(1, 0.565, "bottom center");
        doc.skewSelection(direction * 42, 0, "bottom center");
        // bug:似乎上面两个方法 互相影响，导致最后的效果不对，所以暂时 重新设置
        // element.scaleY=0.75  与预期效果不符，只能重新设置scaleY
        element.scaleY = 0.565;
        // endregion 调整位置

        shadowLayer.setRigParentAtFrame(elementLayer, firstSlFrameIndex);
        shadowLayer.locked = true;
    }

    const FILTER = [new AdjustColorFilter()];
    const COLOR_TRANSFORM = new AlphaColorTransformBuilder().setAlphaPercent(50).build();
    // log.info("filter: ", FILTER);
    // log.info("color transform: ", COLOR_TRANSFORM);

    function Main() {
        const config = checkXMLPanel();
        if (!config) return;
        const { direction } = config;

        log.info("direction: ", direction);

        var newLayerIndex = addLayer(timeline);
        SHADOW_LAYER_INDEX = newLayerIndex;

        setLayer(direction);
    }

    Main();
});
