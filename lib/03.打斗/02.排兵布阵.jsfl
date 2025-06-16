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
(function(){const m=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1];;if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);;typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require(["checkUtil", "xmlPanelUtil", "os", "loglevel"], function (
    checkUtil,
    xmlPanelUtil,
    os,
    log
) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;

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

    var [folder_name, basename] = os.path.split(fl.scriptURI);
    // console.log(folder_name);
    // console.log(basename);
    var onlyName = os.path.$basenameWithoutExt(fl.scriptURI);
    var XMLFOLDER = "02.排兵布阵";

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Not Zero")) return;

        var XMLPANEL = os.path.join(folder_name, XMLFOLDER, onlyName + ".xml");
        // console.log(XMLPANEL);

        var panel = xmlPanelUtil.getXMLPanel(XMLPANEL);
        if (panel == null) return;

        var radioGroup = panel.layoutRadioGroup;
        switch (radioGroup) {
            case "neat":
                // fl.trace("整齐排布");
                var SCRIPT_PATH = os.path.join(
                    folder_name,
                    XMLFOLDER,
                    onlyName + "_neat.jsfl"
                );
                fl.runScript(SCRIPT_PATH);
                break;
            case "staggered":
                // fl.trace("交错排布");
                var SCRIPT_PATH = os.path.join(
                    folder_name,
                    XMLFOLDER,
                    onlyName + "_staggered.jsfl"
                );
                fl.runScript(SCRIPT_PATH);
                break;
            case "random":
                // fl.trace("随机排布");
                var SCRIPT_PATH = os.path.join(
                    folder_name,
                    XMLFOLDER,
                    onlyName + "_random.jsfl"
                );
                fl.runScript(SCRIPT_PATH);
                break;
            case "ascii_art":
                var SCRIPT_PATH = os.path.join(
                    folder_name,
                    XMLFOLDER,
                    onlyName + "_ascii_art.jsfl"
                );
                log.info(SCRIPT_PATH);
                fl.runScript(SCRIPT_PATH);
                break;
            default:
                throw new Error("未知排布方式");
        }
    }

    Main();
});
