/**
 * @file: 01.虾仁摇头.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/22 19:50
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require([
    "checkUtil",
    "xmlPanelUtil",
    "SymbolNameGenerator",
    "satUtil",
    "JSFLConstants",
    "EaseCurve",
    "FramesSelect",
    "KeyFrameOperation"
], function (checkUtil, xmlPanelUtil, sng, satUtil, JSFLConstants, curve, fms, kfo) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { getShakeHeadTrPoint } = satUtil;
    const { FRAME_1, FRAME_4, FRAME_7 } = JSFLConstants.Numerics.frame.frameList;
    const { setClassicEaseCurve } = curve;
    const { SelectNoneFms } = fms;
    const { convertToKeyframesSafety } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    var descriptions = {
        file: "01.虾仁摇头.jsfl",
        "file description": "输出 摇头动作的元件,没有说话时的头部动作",
        selection: "仅一个元件",
        "selection description": "选中头部",
        XMLPanel: true,
        "input parameters": {
            摇头力度: 6,
            头部朝向: null
        },
        detail: "包装元件",
        "detail description": "",
        steps: ["包装元件", "设置变形点", "更改旋转", "设置传统补间"]
    };

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return null;

        var shakeIntensity = xmlPanelUtil.parseNumber(
            panel.shakeIntensity,
            "摇头力度只能输入数字，请重新输入。"
        );
        if (shakeIntensity === null) return null;

        var headDirection = xmlPanelUtil.parseNumber(
            panel.headDirection,
            "头部朝向只能输入数字，请重新输入。"
        );
        if (headDirection === null) return null;

        return { shakeIntensity: shakeIntensity, headDirection: headDirection };
    }

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

    const KEY_FRAMES = [FRAME_1, FRAME_4, FRAME_7];

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 配置参数
        var config = checkXMLPanel();
        if (config === null) return;
        var shakeIntensity = config.shakeIntensity;
        var headDirection = config.headDirection;

        var symbolName = generateNameUntilUnique("虾仁摇头_");
        doc.convertToSymbol("graphic", symbolName, "center");
        // var trPoint = getTrPoint(selection[0]);

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline();

        // 设置变形点
        var element1 = timeline.layers[0].frames[0].elements[0];
        var trPoint = getShakeHeadTrPoint(selection[0], 0.9);
        element1.setTransformationPoint(trPoint.toObj());

        // 给所有图层加帧
        timeline.insertFrames(FRAME_7, true);
        // 关键帧 1,4,7
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        var frame4_element = timeline.layers[0].frames[FRAME_4].elements[0];
        frame4_element.rotation = headDirection * shakeIntensity;

        SelectNoneFms(timeline);

        setClassicEaseCurve(timeline);

        doc.exitEditMode();
    }

    Main();
});
