/**
 * @file: 21.图层解锁.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/20 21:15
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require(["checkUtil", "loglevel"],
    function(checkUtil, log) {
        const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } = checkUtil;

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

        // // 获取第一帧
        // var frs = CheckSelectedFrames(timeline);
        // if (!frs) return;
        // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 检查选择的图层
        var selectedLayers = CheckSelectedLayers(timeline, "Not Zero");
        if (!selectedLayers) return;

        // endregion doc

        function Main() {
            log.info("selectedLayers", selectedLayers);

            selectedLayers.forEach(function(layerIndex) {
                var layer = layers[layerIndex];
                layer.locked = true;
                log.info("lock layer", layer.name);
            });


        }

        Main();
    });
