/**
 * @file: 05.阵法波动.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/30 22:31
 * @project: AnJsflScript
 * @description:心脏跳动效果，阵法波动效果
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

require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "FilterDefinitions",
    "SymbolNameGenerator",
    "JSFLConstants",
    "KeyFrameOperation",
    "EaseCurve"
], function (checkUtil, log, promptUtil, fd, sng, JSFLConstants, kfo, EaseCurve) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
    const { parseNumber } = promptUtil;

    const { GlowFilter } = fd;
    const { GlowFilterBuilder } = fd.BUILDERS;

    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { FRAME_1, FRAME_15, FRAME_30 } = JSFLConstants.Numerics.frame.frameList;
    const { convertToKeyframesSafety } = kfo;

    const { setEaseCurveEx } = EaseCurve;

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

    // 1,15,30
    const KEY_FRAMES = [FRAME_1, FRAME_15, FRAME_30];

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Not Zero", "请选择波动对象！"))
            return;

        // parseInt(prompt("输入波动幅度（1~10）:", "3"));
        var amplitude = parseNumber(
            "输入波动幅度（1~10）:",
            3,
            "请重新输入合法的数字。(1~10)",
            {
                start: 1,
                end: 11,
                step: 1
            }
        );
        if (amplitude === null) return;
        log.info("amplitude:", amplitude);

        // 放大倍数
        var SCALE_FACTOR = 1 + 0.05 * amplitude;
        log.info("SCALE_FACTOR:", SCALE_FACTOR);

        var glowFilter = new GlowFilterBuilder()
            .blurX(30)
            .blurY(30)
            .strength(100)
            .build();
        log.info("glowFilter:", glowFilter);

        var symbolName = generateNameUntilUnique("阵法波动_静_");
        doc.convertToSymbol("graphic", symbolName, "center");

        var symbolName = generateNameUseLast("阵法波动_动_");
        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

        var timeline = doc.getTimeline(); //时间轴

        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        timeline.insertFrames(FRAME_30);

        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 放大
        timeline.setSelectedFrames(FRAME_15, FRAME_15 + 1);
        doc.scaleSelection(SCALE_FACTOR, SCALE_FACTOR);

        curLayer.setFiltersAtFrame(FRAME_15, [glowFilter]);

        setEaseCurveEx(timeline, KEY_FRAMES, "Sine Ease-In-Out");

        doc.exitEditMode();

        alert("动效已生成!");
    }

    Main();
});
