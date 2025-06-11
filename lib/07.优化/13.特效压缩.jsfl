/**
 * @file: 13.特效压缩.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/28 19:33
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

require([
    "checkUtil",
    "loglevel",
    "xmlPanelUtil",
    "ElementSelect",
    "ElementChecker",
    "ElementQuery",
    "lodash",
    "SymbolNameGenerator"
], function (checkUtil, log, xmlPanelUtil, es, ec, eq, _, sng) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { SelectAll } = es;
    const { IsBitmap, IsSymbol } = ec;
    const { getName } = eq;
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

    // // 获取第一帧
    // var frs = CheckSelectedFrames(timeline);
    // if (frs === null) return;
    // var firstLayer = layers[frs[0].layerIndex];
    // var firstFrame = frs[0].startFrame;

    // endregion doc

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        var frameSkipInterval = 0;
        var frameSkipCount = 0;
        var pixelCompressionRatio = 1.0;

        var frameCompressionGroup = panel.frameCompressionGroup;
        var pixelCompressionGroup = panel.pixelCompressionGroup;

        switch (frameCompressionGroup) {
            case "none":
                break;
            case "skip2delete1":
                frameSkipInterval = 2;
                frameSkipCount = 1;
                break;
            case "skip1delete1":
                frameSkipInterval = 1;
                frameSkipCount = 1;
                break;
            case "skip1delete2":
                frameSkipInterval = 1;
                frameSkipCount = 2;
                break;
            default:
                throw new Error(
                    "invalid frame compression group: " + frameCompressionGroup
                );
        }

        pixelCompressionRatio = xmlPanelUtil.parseNumber(
            pixelCompressionGroup,
            "请重新输入合法的压缩比率。(0.0-1.0)"
        );

        return {
            frameSkipInterval: frameSkipInterval,
            frameSkipCount: frameSkipCount,
            pixelCompressionRatio: pixelCompressionRatio
        };
    }

    function FrameCompression(needFrameCompression, frameSkipInterval, frameSkipCount) {
        // 提前返回，不执行抽帧压缩
        if (!needFrameCompression) return;

        var timeline = doc.getTimeline();

        var frameCount = timeline.frameCount;
        var layerCount = timeline.layerCount;
        for (
            var frameIndex = 0;
            frameIndex < frameCount;
            frameIndex += frameSkipInterval
        ) {
            for (var layerIndex = 0; layerIndex < layerCount; layerIndex++) {
                timeline.currentLayer = layerIndex;
                timeline.removeFrames(frameIndex, frameIndex + frameSkipCount);
            }
        }
    }

    function PixelCompression(needPixelCompression, pixelCompressionRatio) {
        // 提前返回，不执行像素压缩
        if (!needPixelCompression) return;

        SelectAll();
        var element = doc.selection[0];

        if (!IsBitmap(element)) {
            alert("像素压缩未启用！只有序列帧特效（位图）可采用像素压缩");
            return;
        }

        var bitmapName = getName(element);
        var bitmapBaseName = _.nth(bitmapName.split("/"), -1);
        log.info("bitmapName:", bitmapName, "bitmapBaseName:", bitmapBaseName);

        var timeline = doc.getTimeline();

        var frameCount = timeline.frameCount;
        var layerCount = timeline.layerCount;
        for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
            timeline.setSelectedFrames(frameIndex, frameIndex + 1);
            doc.scaleSelection(pixelCompressionRatio, pixelCompressionRatio);
            doc.convertSelectionToBitmap();

            library.selectItem(bitmapName);
            var newItemName = bitmapBaseName + "_像素压缩_" + (frameIndex + 1);
            log.info("newItemName:", newItemName);
            library.renameItem(newItemName);
        }
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        if (!IsSymbol(selection[0])) {
            alert("您选择的对象 不是元件，请重新选择！");
            return;
        }

        var config = checkXMLPanel();
        if (config === null) return;
        const { frameSkipInterval, frameSkipCount, pixelCompressionRatio } = config;
        log.info(
            "frameSkipInterval:",
            frameSkipInterval,
            "frameSkipCount:",
            frameSkipCount,
            "pixelCompressionRatio:",
            pixelCompressionRatio
        );

        var needFrameCompression = frameSkipInterval > 0 || frameSkipCount > 0;
        var needPixelCompression = pixelCompressionRatio !== 1.0;

        // 提前返回，不执行压缩
        if (!needFrameCompression && !needPixelCompression) return;

        doc.enterEditMode("inPlace");

        FrameCompression(needFrameCompression, frameSkipInterval, frameSkipCount);

        PixelCompression(needPixelCompression, pixelCompressionRatio);

        doc.exitEditMode();

        alert("压缩完成！");
    }

    Main();
});
