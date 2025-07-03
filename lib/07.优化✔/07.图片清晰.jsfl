/**
 * @file: 07.图片清晰.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 23:09
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "BitmapOperation"], function (checkUtil, log, bo) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { BitmapLossless, BitmapSmoothing } = bo;

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

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        /**
         * @type {BitmapItem[]}
         */
        var bitmaps = selection.filter(IsBitmap);
        if (bitmaps.length === 0) {
            alert("你选中的所有对象中没有位图。 ");
            return;
        }

        BitmapSmoothing(bitmaps);
    }

    Main();
});
