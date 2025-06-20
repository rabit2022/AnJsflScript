/**
 * @file: 帧选择器-关键帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/20 00:40
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require(["checkUtil", "loglevel", "SymbolNameGenerator", "COMPATIBILITY"], function (
    checkUtil,
    log,
    sng,
    COMPATIBILITY
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { generateNameUntilUnique, generateNameUseLast } = sng;

    const { __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__ } = COMPATIBILITY;

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

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // if (!CheckSelectedLayers(timeline, "No limit")) return;
    // endregion doc

    function Main() {
        console.log("开始组装万能头...");
        var symbolName = generateNameUntilUnique("组装万能头_"); // 生成符号名称
        doc.convertToSymbol("graphic", symbolName, "center"); // 将选中的元素转换为符号

        var symbolName = generateNameUseLast("组装万能头_分层_"); // 生成分层符号名称
        doc.convertToSymbol("graphic", symbolName, "center"); // 将选中的元素转换为分层符号

        doc.enterEditMode("inPlace");
        doc.enterEditMode("inPlace");

        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./组装万能头-内部.jsfl");

        doc.exitEditMode();
        doc.exitEditMode();
    }
    Main();
});
