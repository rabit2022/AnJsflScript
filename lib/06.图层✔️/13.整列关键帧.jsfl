/**
 * @file: 13.整列关键帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/13 20:29
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
require(["checkUtil", "KeyFrameOperation"], function (checkUtil, kfo) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { convertToKeyframesSafety } = kfo;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            timeline.currentLayer = i;

            // 关键帧
            convertToKeyframesSafety(timeline, [curFrameIndex]);
        }
    }

    Main();
});
