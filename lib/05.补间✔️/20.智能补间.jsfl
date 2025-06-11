/**
 * @file: 20.智能补间.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/24 23:47
 * @project: AnJsflScript
 * @description:
 * @see : https://community.adobe.com/t5/animate-discussions/intelligent-tween-jsfl/m-p/12875796
 */

(function () {
    function exit(msg) {
        fl.trace(msg);
        throw new Error(msg);
    }

    // bug,FirstRun.jsfl 未运行
    if (typeof require === "undefined") {
        exit(
            "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔"
        );
    }

    // bug,Temp 未解压
    if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
        exit("【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔");
    }
})();
require(["checkUtil", "loglevel", "KeyFrameChecker", "Tween"], function (
    checkUtil,
    log,
    kfc,
    tween
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
    const { IsKeyFrame } = kfc;
    const { createTweenIntelligent } = tween;

    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

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

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var selectedLayers = frs.map(function (fr) {
            return timeline.layers[fr.layerIndex];
        });
        var startEndFrames = frs.map(function (fr) {
            return [fr.startFrame, fr.endFrame];
        });
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            var [startFrame, endFrame] = startEndFrames[i];

            // Skip timeline folders
            if (layer.layerType === "folder") continue;

            // Loop through the selected frames
            for (var j = startFrame; j <= endFrame; j++) {
                var frame = layer.frames[j];

                // Skip empty frames
                if (!frame) continue;

                // Call our function on keyframes only
                if (IsKeyFrame(layer, j)) {
                    createTweenIntelligent(frame);
                }
            }
        }
    }

    Main();
});
