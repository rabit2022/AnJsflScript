/**
 * @file: #20.一键分屏-三分屏.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/24 20:58
 * @project: AnJsflScript
 * @description:
 */

(function () {
    function getProjectPath() {
        const index = fl.scriptURI.lastIndexOf("AnJsflScript");
        if (index !== -1) return fl.scriptURI.substring(0, index + "AnJsflScript".length);
        throw new Error("Can't find project path.");
    }
    fl.runScript(getProjectPath() + "/config/require/CheckEnvironment.jsfl");
})();

require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "SymbolNameGenerator",
    "Context",
    "SAT",
    "DrawParallelogram",
    "LayerOperation"
], function (checkUtil, log, promptUtil, sng, Context, SAT, dp, lo) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { parseDirection } = promptUtil;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    const { Vector, FrameRange } = SAT;
    const { getStageRect } = SAT.GLOBALS;

    const { drawParallelogramWithoutLine, drawParallelogramWithoutFill } = dp;
    const { setParentLayer } = lo;

    // region Context
    // 这个用于 变量 经常update的地方，例如：doc.enterEditMode("inPlace");
    // 否则，建议使用 doc 方案，减少 库 的依赖
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
    if (CheckDom(doc) === null) return;

    // endregion Context

    function getExpandRect(direction) {
        var stageRect = getStageRect();
        if (direction === 1) {
            var rightCenter = stageRect.getPart("right center", 0.5, 1);
            var expandRect = rightCenter
                .expand(200, "top")
                .expand(200, "bottom")
                .expand(600, "right");
            log.info("expandRect", expandRect);
            return expandRect;
        } else if (direction === -1) {
            var leftCenter = stageRect.getPart("left center", 0.5, 1);
            var expandRect = leftCenter
                .expand(200, "top")
                .expand(200, "bottom")
                .expand(600, "left");
            log.info("expandRect", expandRect);
            return expandRect;
        } else {
            log.error("direction error", direction);
            return null;
        }
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // var userInput = prompt("请输入生成右屏/左屏（默认为右，空格为左）:", "右");
        var direction = parseDirection("请输入生成右屏/左屏（默认为右，空格为左）:");
        if (!direction) return;

        log.info("direction", direction);

        var symbolName = generateNameUntilUnique(
            "一键分屏_" + (direction === 1 ? "右屏" : "左屏")
        );
        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

        context.update();
        const { timeline, curLayer } = context;

        curLayer.name = "背景层";

        timeline.addNewLayer("遮罩层");

        // context.update();
        // var fr = new FrameRange(
        //     context.curLayerIndex,
        //     context.curFrameIndex,
        //     context.curFrameIndex + 1
        // );

        var expandRect = getExpandRect(direction);
        if (!expandRect) return;

        var skew = new Vector(20, 0);

        drawParallelogramWithoutLine(expandRect, "green", skew);
        // drawParallelogramWithAll(expandRect, "green", skew);

        timeline.addNewLayer("边框层");
        // fixedbug:边框 无法画出
        drawParallelogramWithoutFill(expandRect, "black", skew);

        setParentLayer(timeline, 2, 1, "mask");

        doc.exitEditMode();
    }

    Main();
});
