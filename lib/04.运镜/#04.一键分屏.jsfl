/**
 * @file: 04.一键分屏.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/19 23:21
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

require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "SymbolNameGenerator",
    "Context"
], function(checkUtil, log, promptUtil, sng, Context) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { parseDirection } = promptUtil;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

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

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // var userInput = prompt("请输入生成右屏/左屏（默认为右，空格为左）:", "右");
        var direction = parseDirection("请输入生成右屏/左屏（默认为右，空格为左）:");
        if (!direction) return;

        log.info("direction", direction);

        var symbolName = generateNameUntilUnique("一键分屏_右_");
        doc.convertToSymbol("graphic", symbolName, "center");

        doc.enterEditMode("inPlace");

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

        curLayer.name = "背景层";

        timeline.addNewLayer("遮罩层");
    }

    Main();
});
