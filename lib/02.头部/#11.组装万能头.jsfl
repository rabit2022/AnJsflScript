/**
 * @file: #11.组装万能头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/24 19:50
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
require(["checkUtil", "xmlPanelUtil"], function (checkUtil, xmlPanelUtil) {
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

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        var shakeIntensity = xmlPanelUtil.parseNumber(
            panel.shakeIntensity,
            "摇头强度只能输入数字，请重新输入。"
        );
        if (shakeIntensity === null) return null;
        var motionFrameCount = xmlPanelUtil.parseNumber(
            panel.motionFrameCount,
            "表情帧数只能输入数字，请重新输入。"
        );
        if (motionFrameCount === null) return null;
        var headDirection = xmlPanelUtil.parseNumber(
            panel.headDirection,
            "头部朝向只能输入数字，请重新输入。"
        );
        if (headDirection === null) return null;
        var shakeMode = xmlPanelUtil.parseString(
            panel.shakeMode,
            "摇头模式只能输入 (传统摇头 丝滑摇头)，请重新输入。"
        );
        if (shakeMode === null) return null;

        return {
            shakeIntensity: shakeIntensity,
            motionFrameCount: motionFrameCount,
            headDirection: headDirection,
            shakeMode: shakeMode
        };
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        // 读取XML面板配置
        var config = checkXMLPanel();
        if (config === null) return;
        var shakeIntensity = config.shakeIntensity;
        var motionFrameCount = config.motionFrameCount;
        var headDirection = config.headDirection;
        var shakeMode = config.shakeMode;
    }

    Main();
});
