/**
 * @file: 00.选择颜色.design.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/25 23:44
 * @project: AnJsflScript
 * @description:生成00.选择颜色.xml文件
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

require(["checkUtil", "loglevel", "XUL", "chroma-js"], function (
    checkUtil,
    log,
    XUL,
    chroma
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

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 获取颜色名称数据库
        const colorNames = chroma.colors;
        log.info(colorNames);

        var menuItems = [];
        Object.entries(colorNames).forEach(function ([colorName, hex]) {
            // log.info("key: ", key, "value: ", value);
            var item = {
                label: colorName,
                value: hex
            };
            menuItems.push(item);
        });
        log.info(menuItems);

        var xul = new XUL("选择颜色")
            .addMenuList("bug", "bug", [
                {
                    label: "只能tab选中,第一个无法被鼠标选中,",
                    value: "bug"
                }
            ])
            .addMenuList("选择颜色", "select_color", menuItems);
        xul.show();

        log.info(xul.settings.select_color);

        fl.runScript();
    }

    Main();
});
