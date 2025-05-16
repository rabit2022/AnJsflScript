/**
 * @file: 06.交换元件-XUL.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/9 22:47
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
require(["checkUtil", "loglevel", "ElementChecker", "XUL"], function (
    checkUtil,
    log,
    ec,
    XUL
) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { IsSymbol } = ec;

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
    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "Not Zero")) return;

        var allElements = library.items; // 所有元件

        var symbolElements = []; // 符号元件
        for (var i = 0; i < allElements.length; i++) {
            var element1 = allElements[i];
            // log.info(element1.name,element1.elementType,element1.instanceType,element1.symbolType);
            if (IsSymbol(element1)) {
                symbolElements.push(element1);
                // log.info("symbol: " + element1.name);
            }
        }

        // log.info('symbolElements: ', symbolElements.length);

        var symbolNames = symbolElements.map(function (element) {
            return element.name;
        });

        log.info("symbolNames: ", symbolNames);

        var menuItems = symbolNames.map(function (name) {
            return {
                label: name,
                value: name
            };
        });

        var xul = new XUL("选择元件")
            .addMenuList("bug", "bug", [
                {
                    label: "只能tab选中,第一个无法被鼠标选中,",
                    value: "bug"
                }
            ])
            .addMenuList("选择元件", "selectedSymbol", menuItems);
        xul.show();
        var dialog = xul.settings;

        // 如果点击的是“取消”按钮，直接返回，不执行后续代码，确保功能符合需求
        if (dialog.dismiss === "cancel") {
            alert("取消修改");
            return;
        }

        log.info("dialog:", dialog);

        var selectedSymbol = dialog["selectedSymbol"];
        log.info("selectedSymbol:", selectedSymbol);

        doc.swapElement(selectedSymbol);
    }

    Main();
});
