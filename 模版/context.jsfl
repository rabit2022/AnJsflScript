/**
 * @file: ${FILE_NAME}
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: ${DATE} ${TIME}
 * @project: ${PROJECT_NAME}
 * @description: ${END}
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === "undefined") {
    var msg =
        "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if (\$ProjectFileDir$.includes('AppData/Local/Temp')) {
    var msg = '【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔';
    fl.trace(msg);
    throw new Error(msg);
}

require(["checkUtil", "loglevel", "SymbolNameGenerator", "KeyFrameOperation", "EaseCurve", "Context", "JSFLConstants"],
    function(checkUtil, log, sng, kfo, ec, Context, JSFLConstants) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { convertToKeyframesSafety } = kfo;
    const { setClassicEaseCurve } = ec;

    const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;

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

    // // region Context
    // // 这个用于 变量 经常update的地方，例如：doc.enterEditMode("inPlace");
    // // 否则，建议使用 doc 方案，减少 库 的依赖
    // const context = new Context();
    // context.update();
    // const {
    //     doc,
    //     selection,
    //     library,
    //     timeline,
    //     AllLayers,
    //     curLayerIndex,
    //     curLayer,
    //     curFrameIndex,
    //     curFrame
    // } = context;
    // const { firstSlLayerIndex, firstSlFrameIndex } = context;
    //
    // // endregion Context


    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;


    }

    Main();
});
