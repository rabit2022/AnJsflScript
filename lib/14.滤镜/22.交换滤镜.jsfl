/**
 * @file: 22.交换滤镜.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/4 20:57
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel"], function (checkUtil, log) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

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
    const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc
    /**
     * 获取两个选中帧的滤镜
     * @param {Timeline} timeline 时间轴
     * @param {FrameRange} selectedFrame 选中的帧
     */
    function getFilters(timeline, selectedFrame) {
        const { layerIndex, startFrame, endFrame } = selectedFrame;

        var layers = timeline.layers; //图层
        var slLayer = layers[layerIndex]; //当前图层

        var frames = curLayer.frames; //当前图层的帧列表
        var slFrame = frames[startFrame]; //当前帧
        var slStartFrame = slFrame.startFrame; //当前帧的起始帧
        // log.info("slStartFrame: ", slStartFrame);

        var filters = slLayer.getFiltersAtFrame(slStartFrame);
        return filters;
    }

    function setFilters(timeline, selectedFrame, filters) {
        const { layerIndex, startFrame, endFrame } = selectedFrame;

        var layers = timeline.layers; //图层
        var slLayer = layers[layerIndex]; //当前图层

        var frames = curLayer.frames; //当前图层的帧列表
        var slFrame = frames[startFrame]; //当前帧
        var slStartFrame = slFrame.startFrame; //当前帧的起始帧
        // log.info("slStartFrame: ", slStartFrame);

        slLayer.setFiltersAtFrame(slStartFrame, filters || []);
    }

    function Main() {
        var selectedFrame1 = selectedFrames[0];
        var selectedFrame2 = selectedFrames[1];
        log.info("selectedFrame1: ", selectedFrame1);
        log.info("selectedFrame2: ", selectedFrame2);

        var filters1 = getFilters(timeline, selectedFrame1);
        var filters2 = getFilters(timeline, selectedFrame2);

        log.info("filters1: ", filters1);
        log.info("filters2: ", filters2);

        setFilters(timeline, selectedFrame1, filters2);
        setFilters(timeline, selectedFrame2, filters1);
    }

    Main();
});
