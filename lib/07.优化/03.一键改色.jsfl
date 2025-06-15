/**
 * @file: 03.一键改色.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/28 21:40
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "ElementChecker",
    "FilterDefinitions",
    "random",
    "ElementSelect",
    "ElementQuery",
    "SymbolNameGenerator",
    "FramesSelect"
], function (checkUtil, log, ec, fd, random, es, eq, sng, fms) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { IsGraphic } = ec;
    const { AdjustColorFilter } = fd;
    const { OnlySelectCurrent } = es;
    const { getFrameCount } = eq;
    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { SelectStartFms } = fms;

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
        if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

        var hasNonGraphicSymbol = selection.some(function (item) {
            return !IsGraphic(item);
        });
        if (hasNonGraphicSymbol) {
            alert("您选择的对象有的不是元件！");
        }

        var adjustColorFilter = new AdjustColorFilter();
        adjustColorFilter.set("hue", random.randint(-180, 180));
        log.info("adjustColorFilter:", adjustColorFilter);

        selection.forEach(function (element) {
            OnlySelectCurrent(element);

            // 转为元件
            var symbolName = generateNameUntilUnique("一键改色_");
            doc.convertToSymbol("graphic", symbolName, "center");

            doc.enterEditMode("inPlace");

            var timeline = doc.getTimeline();
            var layers = timeline.layers; //图层
            var curLayerIndex = timeline.currentLayer; //当前图层索引
            var curLayer = layers[curLayerIndex]; //当前图层

            // 调整颜色
            curLayer.setFiltersAtFrame(0, [adjustColorFilter]);

            var frameCount = getFrameCount(element);
            log.info("frameCount:", frameCount);

            timeline.insertFrames(frameCount - 1);

            doc.exitEditMode();
        });

        SelectStartFms(timeline, frs);
    }

    Main();
});
