/**
 * @file: 09.一键等高.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 21:30
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "ElementQuery"], function (checkUtil, eq) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { getMaxRight } = eq;
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
    if (!CheckSelection(selection, "selectElement", "More")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function Main() {
        var maxElement = getMaxRight(selection);

        // 获取高度
        var height = maxElement.height;

        // 设置元件的高度
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            if (element === maxElement) {
                continue;
            }
            var ratio = element.width / element.height;

            element.height = height;
            element.width = height * ratio;
        }
    }

    Main();
});
