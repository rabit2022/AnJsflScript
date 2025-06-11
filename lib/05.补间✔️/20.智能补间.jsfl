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
    function getProjectPath() {
        const index = fl.scriptURI.lastIndexOf("AnJsflScript");
        if (index !== -1) return fl.scriptURI.substring(0, index + "AnJsflScript".length);
        throw new Error("Can't find project path.");
    }
    fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
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
