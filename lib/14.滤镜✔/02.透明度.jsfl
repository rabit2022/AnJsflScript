/**
 * @file: 00.调改色.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/5 21:17
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "promptUtil", "ColorTransformDefinitions"], function (
    checkUtil,
    log,
    promptUtil,
    ctd
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    // const { BlurFilterBuilder } = fd.BUILDERS;

    const { parseNumber } = promptUtil;
    // const { addFilterToFrame } = fo;
    const { AlphaColorTransformBuilder } = ctd.BUILDERS;

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

    function Main() {
        const alpha = parseNumber(
            "请输入透明度（0~100）：",
            0,
            "请重新输入合法的数字。(0~100)",
            { start: 0, end: 100, step: 1 }
        );
        if (alpha === null) return;

        log.info("alpha:", alpha);

        // const FILTER = new BlurFilterBuilder().setBlur(alpha).build();
        // log.info("FILTER:", FILTER);
        // addFilterToFrame(firstSlLayer, firstSlFrameIndex, FILTER);
        const COLOR_TRANSFORM = new AlphaColorTransformBuilder()
            .setAlphaPercent(alpha)
            .build();
        log.info("COLOR_TRANSFORM:", COLOR_TRANSFORM);

        firstSlLayer.setColorTransformAtFrame(firstSlFrameIndex, COLOR_TRANSFORM);
    }

    Main();
});
