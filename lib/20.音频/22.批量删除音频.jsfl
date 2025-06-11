/**
 * @file: 22.批量删除音频.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/26 16:21
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
require(["checkUtil", "loglevel", "KeyFrameMode"], function (
    checkUtil,
    log,
    KeyFrameMode
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

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

    function clearSound(curFrame) {
        // 清空音频
        curFrame.soundLibraryItem = null;
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var mode = KeyFrameMode();
        if (!mode) return;
        mode.forEach(function (item) {
            var { frame } = item;
            clearSound(frame);
        });
    }

    Main();
});
