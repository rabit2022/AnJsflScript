/**
 * @file: 03.打印矩形的数据.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/13 18:07
 * @project: AnJsflScript
 * @description:
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

        var selectedRect = new Rectangle(doc.getSelectionRect());
        log.info("Selected rectangle: " + selectedRect.toString());
        var selectedCenter = selectedRect.getCenterVector();
        log.info("Selected center: " + selectedCenter.toString());
        // 宽高
        var width = selectedRect.width;
        var height = selectedRect.height;
        log.info("Selected size: " + width + " x " + height);

        // var radius = Math.min(width, height) / 2;
        // print("Selected radius: " + radius);
    }

    Main();
});
