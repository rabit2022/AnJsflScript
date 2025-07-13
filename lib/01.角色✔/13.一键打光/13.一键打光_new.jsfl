/**
 * @file: 13.一键打光.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/10 19:37
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "store-js", "FilterDefinitions"], function (
    checkUtil,
    log,
    store,
    fd
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { GradientGlowFilterBuilder } = fd.BUILDERS;

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

    const ns_store = store.namespace("13-一键打光");

    function Main() {
        const shadow_offset = ns_store.get("shadow_offset");
        const direction = ns_store.get("direction");

        // log.info("shadow_offset: " + shadow_offset);
        // log.info("direction: " + direction);
        var filter = new GradientGlowFilterBuilder()
            .setBlur(10)
            .setStrength(100)
            .setQuality("medium")
            .setAngle(direction === -1 ? 45 : 135)
            .setDistance(shadow_offset)
            .addColorStop(0, "#00000000")
            .addColorStop(255, "#00000099")
            .build();
        const FILTER = [filter];
        log.info("filter: ", FILTER);

        firstSlLayer.setFiltersAtFrame(firstSlFrameIndex, FILTER);
    }

    Main();
});
