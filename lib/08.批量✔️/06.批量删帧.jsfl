/**
 * @file: 06.批量删帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 13:46
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
require(["checkUtil", "FramesSelect"], function (checkUtil, fms) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    const { SelectNoneFms } = fms;

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

        // var currentFrame = timeline.currentFrame;
        var startFrame = 0;
        var endFrame = timeline.frameCount;

        var direction = prompt("请输入方向：空格-向前删除 右-向后删除", "右");
        if (direction == null || direction === "") {
            alert("请输入正确的方向！");
            return;
        }

        var END_FRAME = 0;
        if (direction === " ") {
            END_FRAME = startFrame;
        } else if (direction === "右") {
            END_FRAME = endFrame;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            timeline.setSelectedLayers(i, true);
            // 删除所有帧
            timeline.removeFrames(curFrameIndex, END_FRAME);
        }

        // 回到最开始选择的帧
        timeline.currentFrame = curFrameIndex;

        // // select None
        SelectNoneFms(timeline);
    }

    Main();
});
