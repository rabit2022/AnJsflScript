/**
 * @file: #02.统一线宽.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/3 20:24
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "ElementChecker",
    "ElementSelect",
    "promptUtil"
], function (checkUtil, log, ec, es, promptUtil) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { IsShape } = ec;
    const { OnlySelectCurrent } = es;

    const { parseNumber } = promptUtil;

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
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    /**
     * 更新线宽
     * @param {Shape} shape 要更新线宽的元素
     * @param {number} thickness 线宽
     */
    function updateStrokeThickness(shape, thickness) {
        if (IsShape(shape)) {
            var customStroke = shape.getCustomStroke();
            customStroke.thickness = thickness;
            shape.setCustomStroke(customStroke);
        } else {
            fl.trace("不是Shape元素，无法更新线宽");
        }
    }

    function Main() {
        const thickness = parseNumber("请输入线宽", 1, "请重新输入合法的数字。");

        updateStrokeThickness(selection[0], thickness);
    }

    Main();
});
