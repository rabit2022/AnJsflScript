/**
 * @file: 04.裙带飘动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 21:31
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require([
    "checkUtil",
    "ElementTransform",
    "SymbolNameGenerator",
    "xmlPanelUtil",
    "JSFLConstants",
    "EaseCurve",
    "Tween",
    "FramesSelect",
    "KeyFrameOperation",
    "COMPATIBILITY"
], function (
    checkUtil,
    et,
    sng,
    xmlPanelUtil,
    JSFLConstants,
    curve,
    twn,
    fms,
    kfo,
    COMPATIBILITY
) {
    const { CheckDom: checkDom, CheckSelection: checkSelection } = checkUtil;

    const { FRAME_15, FRAME_30 } = JSFLConstants.Numerics.frame.frameList;
    const { setTransformationPointWithCorner } = et;
    const { setEaseCurve } = curve;
    const { createTween } = twn;
    const { SelectAllFms } = fms;
    const { convertToKeyframesSafety } = kfo;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    const { parseNumber, parseDirection } = xmlPanelUtil;

    const { __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__ } = COMPATIBILITY;

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

    const KEY_FRAMES = [FRAME_15, FRAME_30]; //关键帧
    function checkXMLPanel() {
        // var panel = getXMLPanel();
        var panel =
            __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./04.裙带飘动.xml");
        if (panel === null) return null;

        var angle = parseNumber(panel.angle, "角度只能输入数字，请重新输入。");
        if (angle === null) return null;
        // 检查输入角度是否在1~10之间
        if (angle < 1 || angle > 10) {
            alert("角度只能输入1~10之间的数字，请重新输入。");
            return null;
        }

        var direction = parseDirection(panel.direction, {
            右: -1,
            左: 1,
            " ": 1
        });

        return { angle: angle, direction: direction };
    }

    function KFrames(angle, direction) {
        // k 帧
        doc.enterEditMode("inPlace");
        doc.selectAll();

        var timeline1 = doc.getTimeline(); //时间轴

        // 删除所有帧
        timeline1.removeFrames(1, timeline1.frameCount);

        // 创建帧  30
        timeline1.currentFrame = 0;
        // var _30_frame = 31 - 1;
        // var _15_frame = _30_frame / 2 - 1;

        timeline1.insertFrames(FRAME_30);

        // 创建关键帧,15,30
        // timeline1.convertToKeyframes(FRAME_15);
        // timeline1.convertToKeyframes(FRAME_30);
        convertToKeyframesSafety(timeline1, KEY_FRAMES);

        // 更改第15帧的旋转
        timeline1.currentFrame = FRAME_15;
        doc.selectAll();

        var element1 = doc.selection[0];
        // fl.trace("angle:" + angle + " direction:" + direction + " element1" + 2 * angle * direction);
        element1.rotation += 2 * angle * direction;

        // // 选中所有帧
        // timeline1.setSelectedFrames(0, _30_frame);
        SelectAllFms(timeline1);

        // 创建动效
        // timeline1.createMotionTween();
        createTween(timeline1, "motion tween");
        setEaseCurve(timeline1, "Sine Ease-In-Out");

        doc.exitEditMode();
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 获取输入值
        var config = checkXMLPanel();
        if (config === null) return;
        var angle = config.angle;
        var direction = config.direction;

        // 包装元件
        var symbolName = generateNameUntilUnique("裙带飘动_静_");
        doc.convertToSymbol("graphic", symbolName, "center");

        // 获取元件
        var element = doc.selection[0];

        // // 重置注册点,到中心
        // ele.resetRegisterPoint(element);

        // 变形点 到右上角
        setTransformationPointWithCorner(element, "top right");

        // 包装元件
        var symbolName1 = generateNameUseLast("裙带飘动_动_");
        doc.convertToSymbol("graphic", symbolName1, "center");

        // k 帧
        KFrames(angle, direction);
    }

    Main();
});
