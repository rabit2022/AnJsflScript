/**
 * @file: 09.一键转场.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/16 15:33
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

require([
    "checkUtil",
    "loglevel",
    "xmlPanelUtil",
    "LayerOperation",
    "JSFLConstants",
    "SymbolNameGenerator",
    "ElementOperation",
    "SAT"
], function (checkUtil, log, xmlPanelUtil, lo, JSFLConstants, sng, eo, SAT) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { getXMLPanel } = xmlPanelUtil;
    const { addNewLayerSafety } = lo;
    const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;
    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { convertToSymbolWithBlanks } = eo;

    const {} = SAT.GLOBALS;

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

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;

    // endregion doc

    const FirstFrame = firstFrame - 8;

    function checkXMLPanel() {
        var panel = getXMLPanel();
        if (panel === null) return null;

        return { transitionMode: panel.transitionModeGroup };
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // k首帧，-8
        // 当前0，[-8,0,8]
        if (FirstFrame < FRAME_1) {
            alert("当前位置前后帧数不够！请保证当前位置前后帧数至少为9帧！");
            return;
        }

        // 检查XML面板
        var config = checkXMLPanel();
        if (config === null) return;
        const { transitionMode } = config;

        // 1.添加一键转场图层
        var layerName = "一键转场";
        var newLayerIndex = addNewLayerSafety(timeline, layerName);

        // 2.转场 元件
        // 矩形
        timeline.setSelectedFrames(FirstFrame);

        var symbolName = generateNameUntilUnique("一键转场_");
        convertToSymbolWithBlanks(symbolName);

        doc.enterEditMode("inPlace");

        // 比舞台大400的范围

        // 3.关键帧

        // 4.alpha 关键帧

        // 5.reset selected frames
    }

    Main();
});
