/**
 * @file: 13.一键打光.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/10 19:37
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "COMPATIBILITY", "StringPaser", "store-js"], function (
    checkUtil,
    log,
    COMPATIBILITY,
    strp,
    store
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const {
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__,
        __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__
    } = COMPATIBILITY;

    const { parseNumber, parseDirection, parseColor } = strp;

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
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex,firstSlLayer, firstSlFrame } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function checkXMLPanel() {
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__(
            "./13.一键打光/13.一键打光.xml"
        );
        if (panel === null) return null;

        var shadow_offset = parseNumber(
            panel.shadow_offset,
            "请输入合法的阴影偏移量。阴影偏移量(1~100)",
            { start: 1, end: 100, step: 1 }
        );
        if (!shadow_offset) return null;

        var direction = parseDirection(panel.direction, {
            left: -1,
            right: 1
        });
        if (!direction) return null;

        var shadow_mode = panel.shadow_mode;
        if (!shadow_mode) return null;

        return {
            shadow_offset: shadow_offset,
            direction: direction,
            shadow_mode: shadow_mode
        };
    }

    const ns_store = store.namespace("13-一键打光");

    function Main() {
        const config = checkXMLPanel();
        if (!config) return;
        const { shadow_offset, direction, shadow_mode } = config;

        // log.info("shadow_offset:", shadow_offset);
        // log.info("direction:", direction);
        // log.info("shadow_mode:", shadow_mode);

        ns_store.remove("shadow_offset");
        ns_store.remove("direction");

        ns_store.set("shadow_offset", shadow_offset);
        ns_store.set("direction", direction);

        switch (shadow_mode) {
            case "new":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
                    "./13.一键打光/13.一键打光_new.jsfl"
                );
                break;
            case "old":
                // __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./13.一键打光/13.一键打光_old.jsfl");
                alert("没有实现，请用新版");
                break;
            default:
                throw new Error("未知的阴影模式：" + shadow_mode);
                break;
        }
    }

    Main();
});
