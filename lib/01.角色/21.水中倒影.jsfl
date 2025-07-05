/**
 * @file: 21.水中倒影.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/5 18:26
 * @project: AnJsflScript
 * @description:
 * @see: BV16W411Z7HS
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "SymbolNameGenerator",
    "ElementQuery",
    "ElementSelect",
    "LayerOperation",
    "ColorTransformDefinitions",
    "FilterDefinitions"
], function (checkUtil, log, sng, eq, es, lo, ctd, fd) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { getName } = eq;
    const { SelectAll } = es;

    const { setParentLayer } = lo;

    const { setInstanceBrightness } = ctd.INSTANCES;
    const { BlurFilterBuilder } = fd.BUILDERS;

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

    function addLayer(timeline) {
        var layerName = getName(firstSlLayer);
        log.info("layer name: ", layerName);

        doc.clipCopy();

        var newLayerName = layerName + "_水中倒影";
        var newLayerIndex = timeline.addNewLayer(newLayerName, "normal", false);

        // @note true参数可以保证 复制的元件 与原来的位置 相同
        doc.clipPaste(true);

        return newLayerIndex;
    }

    const ElEMENT_LAYER_INDEX = curLayerIndex;
    var SHADOW_LAYER_INDEX = curLayerIndex + 1; // 倒影图层

    var INNER_ElEMENT_LAYER_INDEX = 1;
    var INNER_WATER_LAYER_INDEX = 0; // 水波纹图层

    function addLayerInner(timeline) {
        SelectAll();

        doc.clipCopy();

        var newLayerName = "水波纹";
        var newLayerIndex = timeline.addNewLayer(newLayerName, "normal", true);

        // @note: 水波纹 素材需要替换为合适的素材，这里暂时使用原来的元件替代
        doc.clipPaste(true);

        return newLayerIndex;
    }

    function EditInnerWater() {
        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline(); //时间轴
        INNER_WATER_LAYER_INDEX = addLayerInner(timeline);

        setParentLayer(
            timeline,
            INNER_ElEMENT_LAYER_INDEX,
            INNER_WATER_LAYER_INDEX,
            "mask"
        );
        doc.exitEditMode();
    }

    const FILTERS = [new BlurFilterBuilder().setBlur(8).setQuality("high").build()];

    function setLayer(timeline) {
        var layers = timeline.layers; //图层
        var elementLayer = layers[ElEMENT_LAYER_INDEX];
        var shadowLayer = layers[SHADOW_LAYER_INDEX];

        var element = doc.selection[0];

        setInstanceBrightness(element, -50);

        doc.setFilters(FILTERS);
        // shadowLayer.setFiltersAtFrame(firstSlFrameIndex, FILTER);
        // shadowLayer.setColorTransformAtFrame(firstSlFrameIndex, COLOR_TRANSFORM);

        shadowLayer.setRigParentAtFrame(elementLayer, firstSlFrameIndex);
        shadowLayer.locked = true;
    }

    function Main() {
        var newLayerIndex = addLayer(timeline);
        SHADOW_LAYER_INDEX = newLayerIndex;

        // 翻转，压缩
        doc.scaleSelection(1, -0.618, "bottom center");

        var symbolName = generateNameUntilUnique("水中倒影_");
        doc.convertToSymbol("movie clip", symbolName, "center");

        EditInnerWater();

        setLayer(timeline);

        alert("如果需要更好的效果，请把 水波纹 换成 更加合适的素材。 ");
    }

    Main();
});
