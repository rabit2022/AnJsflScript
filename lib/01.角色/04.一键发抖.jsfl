/**
 * @file: 04.一键发抖.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/13 23:04
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "ElementAnim",
    "SymbolNameGenerator",
    "KeyFrameOperation",
    "JSFLConstants",
    "FramesSelect",
    "random",
    "SAT"
], function (checkUtil, log, promptUtil, ea, sng, kfo, JSFLConstants, fms, random, SAT) {
    const { CheckDom, CheckSelection } = checkUtil;

    const { Vector, Transform } = SAT;
    const { wrapPosition } = SAT.GLOBALS;

    const { playSingleFrame } = ea;
    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { convertToKeyframesSafety } = kfo;
    const { SelectAllFms } = fms;

    const { FRAME_1, FRAME_2, FRAME_3, FRAME_4, FRAME_5 } =
        JSFLConstants.Numerics.frame.frameList;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    /**
     *
     * @type {number[]}
     */
    var KEY_FRAMES = [FRAME_1, FRAME_2, FRAME_3, FRAME_4, FRAME_5];

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Only one")) return;

        // var userInput = parseInt(prompt("输入抖动力度（1~10):", "1"));
        var shackIndensity = promptUtil.parseNumber(
            "输入抖动力度（1~10）",
            1,
            "请输入合法的数字",
            {
                start: 1,
                end: 10,
                step: 1
            }
        );
        if (!shackIndensity) return;

        // log.info("shackIndensity", shackIndensity);
        playSingleFrame();

        var symbolName = generateNameUntilUnique("一键发抖_");
        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

        doc.group();

        var timeline = doc.getTimeline();

        // 5帧 关键帧
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        KEY_FRAMES.forEach(function (frame) {
            // 选中当前帧
            SelectAllFms(timeline, frame);

            var element = doc.selection[0];

            // 随机抖动
            // width/100*shackIntensity*[-1,1]
            // rotation=shackIntensity/4*[-1,1]
            var randomX = (element.width / 100) * shackIndensity * random.uniform(-1, 1);
            var moveVector = new Vector(randomX, 0);

            var elementPosition = wrapPosition(element);
            var newPosition = elementPosition.add(moveVector);

            var rotate = (shackIndensity / 4) * random.uniform(-1, 1);

            log.info("newPosition", newPosition);
            log.info("rotate", rotate);

            var transform = new Transform(element)
                .setPosition(newPosition)
                .setRotation(rotate);
            log.info("transform", transform);
        });

        doc.exitEditMode();
    }

    Main();
});
