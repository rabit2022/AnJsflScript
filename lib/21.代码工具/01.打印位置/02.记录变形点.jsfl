/**
 * @file: 02.记录变形点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 20:41
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
require(["checkUtil", "SAT", "loglevel"], function (checkUtil, sat, log) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle,
        wrapPosition = sat.GLOBALS.wrapPosition;

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

        var element = selection[0];
        var transformPoint = wrapPosition(doc.getTransformationPoint());
        // print('变形点坐标：' + transformPoint.toString());
        log.info("变形点坐标：" + transformPoint.toString());

        var rect = new Rectangle(element);
        // print('元件矩形：' + rect.toString());
        log.info("元件矩形：" + rect.toString());
    }

    Main();
});
