/**
 * @file: #04.辅助相机.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/9 20:24
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

require(["checkUtil", "loglevel", "LayerOperation"], function (checkUtil, log, lo) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { addNewLayerSafety } = lo;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var frs = CheckSelectedFrames(timeline);
    // if (!frs) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 禁用相机
        if (timeline.camera.cameraEnabled === true) {
            timeline.camera.cameraEnabled = false;
        }

        // 查找或创建“摄像机”图层
        var cameraLayerIndex = addNewLayerSafety(timeline, "摄像机");

        // TODO:是否库中存在摄像机元件
        if (library.itemExists("辅助相机")) {
            throw new Error("Not implemented yet");
        }

        // 画线

        // 画矩形框

        // 添加as代码
    }

    Main();
});
