/**
 * @file: 09.解除剪影.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/14 18:05
 * @project: AnJsflScript
 * @description:
 */

(function () {
    const match = fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);
    if (!match) throw new Error("Can't find project path [" + fl.scriptURI + "]");
    const index = fl.scriptURI.lastIndexOf(match[0]);
    const projectPath = fl.scriptURI.substring(0, index + match[0].length);
    if (typeof require === "undefined")
        fl.runScript(projectPath + "/config/require/CheckEnvironment.jsfl");
})();
require(["checkUtil", "loglevel", "promptUtil"], function (checkUtil, log, promptUtil) {
    const { CheckDom, CheckSelection } = checkUtil;

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

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        doc.setElementProperty("colorMode", "none");
    }

    Main();
});
