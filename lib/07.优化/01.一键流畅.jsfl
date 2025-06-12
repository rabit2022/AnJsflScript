/**
 * @file: 01.一键流畅.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 22:01
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
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
    var items = library.items;

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        BitmapLossless(items);

        alert("已优化当前文档内所有图片，播放更流畅！");
    }

    Main();
});
