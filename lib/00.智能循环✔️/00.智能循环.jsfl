/**
 * @file: 00.智能循环.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 22:22
 * @project: AnJsflScript
 * @description:
 * @see https://gitee.com/ninge/WindowSWF/tree/master/
 */

(function () {
    const match = fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);
    if (!match) throw new Error("Can't find project path [" + fl.scriptURI + "]");
    const index = fl.scriptURI.lastIndexOf(match[0]);
    const projectPath = fl.scriptURI.substring(0, index + match[0].length);
    if (typeof require === "undefined")
        fl.runScript(projectPath + "/config/require/CheckEnvironment.jsfl");
})();
require(["checkUtil", "KeyFrameOperation"], function (
    {
        CheckDom: checkDom,
        CheckSelection: checkSelection,
        CheckSelectedFrames: checkSelectedFrames
    },
    { KFrameOnlyOne }
) {
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

    // 获取第一帧
    var frs = checkSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // 关键帧
    var KEY_FRAMES = [firstFrame];

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        // 关键帧
        KFrameOnlyOne(timeline);

        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            element.loop = "loop";

            var timeline1 = element.libraryItem.timeline;
            var layer = timeline1.layers[0];
            // 获取关键帧的起始帧
            var startFrame = layer.frames[element.firstFrame].startFrame;
            element.firstFrame = startFrame;
            element.lastFrame = layer.frames[startFrame].duration + startFrame - 1;
        }
    }

    Main();
});
