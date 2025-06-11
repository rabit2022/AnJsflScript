/**
 * @file: 13.取消父子级.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 10:14
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function getProjectPath() {
        const index = fl.scriptURI.lastIndexOf("AnJsflScript");
        if (index !== -1) return fl.scriptURI.substring(0, index + "AnJsflScript".length);
        throw new Error("Can't find project path.");
    }
    fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
})();

require(["checkUtil", "loglevel", "SAT"], function (checkUtil, log, SAT) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

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

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 获取所有选中的图层

        // var frList = FrameRangeList.from(frs);
        // log.info("frList:", frList);

        var layerList = frs.getUniqueLayerIndexes();
        log.info("layerList:", layerList);

        layerList.forEach(function (layerIndex) {
            var layer = layers[layerIndex];
            layer.layerType = "normal";
        });

        var rect = new SAT.Rectangle(0, 0, 10, 10);
        var size = rect.getSize();
    }

    Main();
});
