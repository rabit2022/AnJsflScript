/**
 * @file: 05.批量选中.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/8 22:55
 * @project: AnJsflScript
 * @description:选中  selection 中 与 当前选中的元件 相同的元件
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === "undefined") {
    var msg =
        "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
    var msg = "【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}
require(["checkUtil", "loglevel", "ElementSelect"], function (checkUtil, log, es) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { SelectSameName } = es;

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
    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        var firstElement = selection[0];
        SelectSameName(firstElement);
    }

    Main();
});
