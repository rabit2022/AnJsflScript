/**
 * @file: 02.排兵布阵.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 12:23
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "xmlPanelUtil", "os", "loglevel", "COMPATIBILITY"], function(
    checkUtil,
    xmlPanelUtil,
    os,
    log,
    COMPATIBILITY
) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

    const {
        __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__,
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__
    } = COMPATIBILITY;

    // region doc
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
// endregion doc

    function checkXMLPanel() {
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./02.排兵布阵/02.排兵布阵.xml");
        if (panel == null) return null;

        var radioGroup = panel.layoutRadioGroup;
        if (radioGroup == null) return null;

        return { radioGroup: radioGroup };
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Not Zero")) return;

        var config = checkXMLPanel();
        if (config == null) return;
        var radioGroup = config.radioGroup;

        switch (radioGroup) {
            case "neat":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./02.排兵布阵/02.排兵布阵_neat.TD.jsfl");
                break;
            case "staggered":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./02.排兵布阵/02.排兵布阵_staggered.TD.jsfl");
                break;
            case "random":
                __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./02.排兵布阵/02.排兵布阵_random.TD.jsfl");
                break;
            case "ascii_art":
                // __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__("./02.排兵布阵/02.排兵布阵_ascii_art.TD.jsfl");
                break;
            default:
                throw new Error("未知排布方式");
        }
    }

    Main();
});
