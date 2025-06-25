/**
 * @file: 13.取消父子级.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 10:14
 * @project: AnJsflScript
 * @description:
 * @see https://community.adobe.com/t5/animate-discussions/unparent-layers-with-jsfl/m-p/14851064
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "SAT"], function (checkUtil, log, SAT) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { FrameRangeList } = SAT;

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
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // 检查选择的图层
    var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    if (!selectedLayers) return;
    // endregion doc

    function Main() {
        log.info("selectedLayers:", selectedLayers);

        for (var i = 0; i < selectedLayers.length; i++) {
            var layerIndex = selectedLayers[i];
            var layer = layers[layerIndex];

            log.info("layer", layer.name, "frameIndex:", curFrameIndex);
            // layer.setRigParentAtFrame(layer, curFrameIndex);
            layer.setRigParentAtFrame(layerIndex, curFrameIndex);
        }
    }

    Main();
});
