/**
 * @file: 07.批量库清理.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/31 19:21
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
    "xmlPanelUtil",
    "ElementQuery",
    "ElementChecker"
], function (checkUtil, log, xmlPanelUtil, eq, ec) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { getName } = eq;
    const { IsBitmap, IsSound, IsSymbol } = ec;

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

    var items = library.items; // 库中的项

    function checkXMLPanel() {
        var panel = xmlPanelUtil.getXMLPanel();
        if (panel === null) return;

        var cleanMode = panel.cleanMode; // 清理模式
        if (!cleanMode) return;

        return {
            cleanMode: cleanMode
        };
    }

    /**
     * 确保删除干净，删除未使用的项
     */
    function processDeleteUnused() {
        var isClean = confirm(
            "该操作会清理库中所有未使用的文件，是否继续？\n" +
                "@穹的兔兔  提醒您：请谨慎操作，避免误删重要文件！尽量有备份文件。"
        );
        if (!isClean) {
            return;
        }
        // while (library.unusedItems.length > 0) {
        var unusedItems = library.unusedItems; // 获取未使用的项
        unusedItems.forEach(function (item) {
            var itemName = getName(item); // 获取项的名称
            log.info("删除未使用的项：" + itemName); // 记录日志
            library.deleteItem(itemName); // 删除项
        });
        library.updateItem(); // 更新库
        // }
    }

    function processDeleteAudio() {
        var unusedItems = library.unusedItems;
        var usedAudio = unusedItems.filter(function (item) {
            return IsSound(item);
        });
        usedAudio.forEach(function (item) {
            var itemName = getName(item); // 获取项的名称
            log.info("删除音频：" + itemName); // 记录日志
            library.deleteItem(itemName); // 删除项
        });
    }

    function processDeleteImage() {
        var unusedItems = library.unusedItems;
        var usedImages = unusedItems.filter(function (item) {
            return IsBitmap(item);
        });
        usedImages.forEach(function (item) {
            var itemName = getName(item); // 获取项的名称
            log.info("删除图片：" + itemName); // 记录日志
            library.deleteItem(itemName); // 删除项
        });
    }

    function processDeleteSymbol() {
        var unusedItems = library.unusedItems;
        var usedSymbols = unusedItems.filter(function (item) {
            return IsSymbol(item);
        });
        usedSymbols.forEach(function (item) {
            var itemName = getName(item); // 获取项的名称
            log.info("删除元件：" + itemName); // 记录日志
            library.deleteItem(itemName); // 删除项
        });
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 检查XML面板
        var config = checkXMLPanel();
        if (!config) return;
        var { cleanMode } = config; // 清理模式
        log.info("cleanMode: " + cleanMode);

        switch (cleanMode) {
            case "deleteUnused":
                processDeleteUnused();
                break;
            case "deleteAudio":
                processDeleteAudio();
                break;
            case "deleteImage":
                processDeleteImage();
                break;
            case "deleteSymbol":
                processDeleteSymbol();
                break;
            default:
                log.error("未知的清理模式：" + cleanMode);
                break;
        }
    }

    Main();
});
