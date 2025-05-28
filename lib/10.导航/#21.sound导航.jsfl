/**
 * @file: #01.sound导航.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/28 21:56
 * @project: AnJsflScript
 * @description:
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

require(["checkUtil", "loglevel"],
    function(checkUtil, log) {
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

        // // 获取第一帧
        // var frs = CheckSelectedFrames(timeline);
        // if (frs === null) return;
        // var firstLayer = layers[frs[0].layerIndex];
        // var firstFrame = frs[0].startFrame;

        // endregion doc

        function Main() {
            // 检查选择的元件
            if (!CheckSelection(selection, "selectElement", "No limit")) return;


        }

        Main();
    });
