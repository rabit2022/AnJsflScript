/**
 * @file: 08.智能交换.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/6 19:37
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "SAT"], function (checkUtil, sat) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { Vector } = sat;

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
    if (!CheckSelection(selection, "selectElement", "Only two")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function Main() {
        var elem1 = selection[0];
        var elem1Positon = new Vector(elem1.x, elem1.y);
        var elem2 = selection[1];
        var elem2Positon = new Vector(elem2.x, elem2.y);

        elem1.x = elem2Positon.x;
        elem1.y = elem2Positon.y;
        elem2.x = elem1Positon.x;
        elem2.y = elem1Positon.y;
    }

    Main();
});
