/**
 * @file: 13.拆分到文件.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/13 11:53
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "COMPATIBILITY", "os", "store-js"], function (
    checkUtil,
    log,
    COMPATIBILITY,
    os,
    store
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    const {
        __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__,
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__
    } = COMPATIBILITY;

    // const getBaseName = os.path.$basenameWithoutExt;

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
        // var panel = getXMLPanel();
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__(
            "./12.拆分到文件/12.拆分到文件.xml"
        );
        if (panel === null) return null;

        var split_mode = panel.split_mode; //拆分模式
        if (!split_mode) return null;

        return {
            split_mode: split_mode
        };
    }

    // const docBaseName = getBaseName(doc.pathURI);
    const [docBaseName] = os.path.splitext(doc.pathURI);
    log.info("docBaseName:", docBaseName);

    const ns_store = store.namespace("13-拆分到文件");

    function Main() {
        const config = checkXMLPanel();
        if (!config) return;

        ns_store.set("BASE_NAME", docBaseName);

        const { split_mode } = config;
        log.info("split_mode:", split_mode);
        switch (split_mode) {
            case "objects":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
                    "./12.拆分到文件/12.拆分到文件_objects.jsfl"
                );
                break;
            case "keyframes":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
                    "./12.拆分到文件/12.拆分到文件_keyframes.jsfl"
                );
                break;
            default:
                throw new Error("未知的拆分模式：" + split_mode);
        }
    }

    Main();
});
