// 这个文件由脚本 13.批量预览图.ts 自动生成，任何手动修改都将会被覆盖.
require(["require", "_exports", "checkUtil", "os", "COMPATIBILITY", "progress"], function (require, exports, checkUtil_1, os, COMPATIBILITY_1, ProgressBar) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getBasename = os.path.$basenameWithoutExt;
    var doc = fl.getDocumentDOM();
    if (!(0, checkUtil_1.CheckDom)(doc)) {
        return;
    }
    var selection = doc.selection;
    var library = doc.library;
    var timeline = doc.getTimeline();
    var layers = timeline.layers;
    var curLayerIndex = timeline.currentLayer;
    var curLayer = layers[curLayerIndex];
    var _frames = curLayer.frames;
    var curFrameIndex = timeline.currentFrame;
    var curFrame = _frames[curFrameIndex];
    if (!(0, checkUtil_1.CheckSelection)(selection, "selectElement", "No limit")) {
        return;
    }
    function checkXMLPanel() {
        var panel = (0, COMPATIBILITY_1.__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__)("./13.批量预览图.xml");
        if (panel === null)
            return;
        var format = panel.format;
        if (!format)
            return null;
        return {
            format: format
        };
    }
    function Main() {
        var folderURL = fl.browseForFolderURL("醉尘仙：请选择文件夹");
        if (!folderURL)
            return;
        var files = os.listdir(folderURL);
        var valiadFiles = files.filter(function (file) { return file.endsWith(".fla"); }).filter(function (file) { return !file.startsWith("RECOVER_") && !file.startsWith("恢复_"); });
        if (!valiadFiles.length) {
            alert("该文件夹下未发现 .fla 文件！");
            return;
        }
        var config = checkXMLPanel();
        if (!config)
            return;
        var format = config.format;
        var bar = new ProgressBar(":bar :current/:total", {
            total: valiadFiles.length
        });
        for (var _i = 0, valiadFiles_1 = valiadFiles; _i < valiadFiles_1.length; _i++) {
            var file = valiadFiles_1[_i];
            bar.tick();
            fl.trace("\u6B63\u5728\u8F93\u51FA\uFF1A".concat(file));
            var filePath = os.path.join(folderURL, file);
            var baseName = getBasename(file);
            var outPath = os.path.join(folderURL, "".concat(baseName).concat(format));
            var newDoc = fl.openDocument(filePath);
            if (!(0, checkUtil_1.CheckDom)(newDoc))
                continue;
            switch (format) {
                case ".png":
                    newDoc.exportPNG(outPath, true, true);
                    break;
                case ".gif":
                    newDoc.exportGIF(outPath, true, true);
                    break;
                case ".svg":
                    newDoc.exportSVG(outPath, true);
                    break;
                case ".swf":
                    newDoc.exportSWF(outPath, true);
                    break;
                default:
                    throw new Error("\u4E0D\u652F\u6301\u7684\u683C\u5F0F\uFF1A".concat(format));
            }
            newDoc.close(false);
        }
    }
    Main();
});
