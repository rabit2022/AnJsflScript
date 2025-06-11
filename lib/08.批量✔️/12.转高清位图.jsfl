/**
 * @file: 12.转高清位图.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/18 16:50
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

require(["checkUtil", "loglevel", "SymbolNameGenerator"], function (checkUtil, log, sng) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { generateNameUntilUnique, generateNameUseLast } = sng;

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

    var SCALE_FACTOR = 6; // 缩放因子
    var ANTI_SCALE_FACTOR = 1 / SCALE_FACTOR; // 反向缩放因子

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

        // 放大6倍，转为位图，缩小6倍
        var symbolName = generateNameUntilUnique("高清位图_辅助_");
        doc.convertToSymbol("movie clip", symbolName, "center");

        doc.scaleSelection(SCALE_FACTOR, SCALE_FACTOR);

        doc.convertSelectionToBitmap();

        doc.scaleSelection(ANTI_SCALE_FACTOR, ANTI_SCALE_FACTOR);

        // 删除辅助线
        doc.library.deleteItem(symbolName);
    }

    Main();
});
