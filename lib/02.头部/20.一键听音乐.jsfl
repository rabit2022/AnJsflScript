/**
 * @file: 20.一键听音乐.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/13 23:05
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "SymbolNameGenerator",
    "ElementAnim",
    "JSFLConstants",
    "KeyFrameOperation",
    "Context",
    "SAT",
    "EaseCurve",
    "FramesSelect"
], function (checkUtil, log, sng, ea, JSFLConstants, kfo, Context, SAT, ec, fms) {
    const { CheckDom, CheckSelection } = checkUtil;

    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { playSingleFrame } = ea;
    const { FRAME_1, FRAME_11, FRAME_31, FRAME_41 } =
        JSFLConstants.Numerics.frame.frameList;
    const { convertToKeyframesSafety } = kfo;
    const { setClassicEaseCurve } = ec;
    const { SelectAllFms } = fms;

    const { Vector } = SAT;

    const context = new Context();
    context.update();
    const {
        doc,
        selection,
        library,
        timeline,
        AllLayers,
        curLayerIndex,
        curLayer,
        curFrameIndex,
        curFrame
    } = context;
    const { firstSlLayerIndex, firstSlFrameIndex } = context;

    const KEY_FRAMES = [FRAME_1, FRAME_11, FRAME_31, FRAME_41];
    const ANGLE = [0, 25, -25, 0];

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        var symbolName = generateNameUntilUnique("一键听音乐_");
        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

        var symbolName = generateNameUseLast("一键听音乐_内部_");
        doc.convertToSymbol("graphic", symbolName, "center");

        // 设置 变形点
        // 0,height * 0.5 * 0.8  中心点向下80%的位置
        var element = selection[0];
        var width = element.width;
        var height = element.height;
        var trPoint = new Vector(0, height * 0.5 * 0.8);

        doc.setTransformationPoint(trPoint.toObj());

        playSingleFrame();
        // var timeline = doc.getTimeline(); //时间轴
        context.update();
        var timeline = context.timeline; //时间轴
        var curLayer = context.curLayer; //当前图层

        convertToKeyframesSafety(timeline, KEY_FRAMES);

        for (var i = 0; i < ANGLE.length; i++) {
            var angle = ANGLE[i];
            var keyframe = KEY_FRAMES[i];

            var KeyFrameElement = curLayer.frames[keyframe].elements[0];
            KeyFrameElement.rotation = angle;
        }

        // 设置 传统补间动画
        SelectAllFms(timeline);
        setClassicEaseCurve(timeline);

        doc.exitEditMode();
    }

    Main();
});
