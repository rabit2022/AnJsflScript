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

require([
    "checkUtil",
    "loglevel",
    "SymbolNameGenerator",
    "COMPATIBILITY",
    "store-js",
    "linqUtil",
    "KeyFrameOperation"
], function (checkUtil, log, sng, COMPATIBILITY, store, linqUtil, kfo) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const { generateNameUntilUnique, generateNameUseLast } = sng;

    const { __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__ } = COMPATIBILITY;

    const { $range } = linqUtil;

    const { convertToKeyframesSafety } = kfo;

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

    const ns_store = store.namespace("11-组装万能头");

    function Main() {
        const MAX_MOTION_FRAME_COUNT = ns_store.get("MAX_MOTION_FRAME_COUNT");
        const EXPRESSION_DURATION = ns_store.get("EXPRESSION_DURATION");
        log.info("MAX_MOTION_FRAME_COUNT:", MAX_MOTION_FRAME_COUNT);
        log.info("EXPRESSION_DURATION:", EXPRESSION_DURATION);
        if (!MAX_MOTION_FRAME_COUNT || !EXPRESSION_DURATION) {
            alert("[帧选择器-关键帧]    请先运行脚本  11.组装万能头.jsfl");
            return;
        }

        var symbolName = generateNameUntilUnique("组装万能头_"); // 生成符号名称
        doc.convertToSymbol("graphic", symbolName, "center"); // 将选中的元素转换为符号

        var symbolName = generateNameUseLast("组装万能头_分层_"); // 生成分层符号名称
        doc.convertToSymbol("graphic", symbolName, "center"); // 将选中的元素转换为分层符号

        doc.enterEditMode("inPlace");
        doc.enterEditMode("inPlace");

        // __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./组装万能头-内部.jsfl");

        doc.exitEditMode();

        // 刷新时间轴
        timeline = doc.getTimeline(); // 时间轴

        timeline.insertFrames(MAX_MOTION_FRAME_COUNT - 1, true);

        // 转换为关键帧
        var KEY_FRAMES = $range(0, MAX_MOTION_FRAME_COUNT, EXPRESSION_DURATION).toArray();
        convertToKeyframesSafety(timeline, KEY_FRAMES); // 将帧转换为关键帧

        doc.exitEditMode();
    }

    Main();
});
