/**
 * @file: 00.选择颜色.design.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 23:44
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

require(["checkUtil", "loglevel","XUL","chroma-js"],
    function(checkUtil, log, XUL, chroma) {
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

// 获取颜色名称数据库
            const colorNames = chroma.colors;
            console.log(colorNames);


// // 遍历并打印颜色名称及其对应的十六进制代码
//             for (var name in colorNames) {
//                 const hexCode = colorNames[name];
//                 console.log(name + " : " + hexCode);
//             }
        }

        Main();
    });
