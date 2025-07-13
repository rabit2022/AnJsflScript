/**
 * @file: 02.导出库音频.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/10 00:24
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "os"], function (checkUtil, log, os) {
    const {
        CheckDom,
        CheckSelection,
        CheckSelectedFrames,
        CheckSelectedLayers,
        CheckSelectedItems
    } = checkUtil;

    // const getBaseName=os.path.$basenameWithoutExt;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex,firstSlLayer, firstSlFrame } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;

    var selectedItems = CheckSelectedItems(library, "Not Zero");
    if (!selectedItems) return;

    // endregion doc

    function Main() {
        log.info("selectedItems", selectedItems);
        // selectedItems[i].exportToFile(savePath);
        // BitmapItem,SoundItem
        var canExportItems = selectedItems.filter(function (selectedItem) {
            return typeof selectedItem.exportToFile === "function";
        });
        if (canExportItems.length === 0) {
            log.info("No items can be exported.");
            return;
        }

        // 弹出文件夹选择对话框
        var saveFolderURL = fl.browseForFolderURL("请选择保存位置");
        canExportItems.forEach(function (selectedItem) {
            var localPath = selectedItem.sourceFilePath;
            // log.info("path",path);
            // "file:///H|/project/沙雕动画/AnJsflScript/test/flash/Bitmap%201.png"
            const [dir, base] = os.path.split(localPath);
            const savePath = os.path.join(saveFolderURL, base);
            log.info("savePath", savePath);
            selectedItem.exportToFile(savePath);
        });
    }

    Main();
});
