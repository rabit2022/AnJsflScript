/**
 * @file: 00.选择颜色.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 23:44
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function exit(msg) {
        fl.trace(msg);
        throw new Error(msg);
    }

    // bug,FirstRun.jsfl 未运行
    if (typeof require === "undefined") {
        exit(
            "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔"
        );
    }

    // bug,Temp 未解压
    if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
        exit("【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔");
    }
})();

require(["checkUtil", "loglevel", "xmlPanelUtil"], function (
    checkUtil,
    log,
    xmlPanelUtil
) {
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

    // var [folder_name, basename] = os.path.split(fl.scriptURI);
    // var XMLPANEL = os.path.join(folder_name, "11.一键描边", "00.选择颜色.xml");
    // var XMLPANEL = os.path.join(folder_name, "00.选择颜色.xml");
    // log.info("XMLPANEL：" + XMLPANEL);

    // 直接获取同级即可
    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        var select_color = panel.select_color;
        return {
            select_color: select_color
        };
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 整齐排布
        var config = checkXMLPanel();
        if (config === null) return;
        const { select_color } = config;
        log.info("选择颜色：" + select_color);

        // 更新xul ui的属性
        fl.xmlui.set("color", select_color);
    }

    Main();
});
