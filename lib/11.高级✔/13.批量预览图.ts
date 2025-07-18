/**
 * @file: 13.批量预览图.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/18 21:04
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import os = require("os");
// @ts-expect-error
import { __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__ } from "COMPATIBILITY";

// ===============Third Party======================
import log = require("loglevel");
import ProgressBar = require("progress");

// endregion import

// OSPath.$basenameWithoutExt
const getBasename: Function = os.path.$basenameWithoutExt;

// region doc
var doc = fl.getDocumentDOM(); //文档
if (!CheckDom(doc)) {
    //@ts-ignore
    return;
}

var selection = doc.selection; //选择
var library = doc.library; //库文件
var timeline = doc.getTimeline(); //时间轴

var layers = timeline.layers; //图层
var curLayerIndex = timeline.currentLayer; //当前图层索引
var curLayer = layers[curLayerIndex]; //当前图层

var _frames = curLayer.frames; //当前图层的帧列表
var curFrameIndex = timeline.currentFrame; //当前帧索引
var curFrame = _frames[curFrameIndex]; //当前帧

// // 获取第一帧
// var selectedFrames = CheckSelectedFrames(timeline);
// if (!selectedFrames) {// @ts-ignore
//     return;
// }
// const {firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame} = selectedFrames;

// 检查选择的元件
if (!CheckSelection(selection, "selectElement", "No limit")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

function checkXMLPanel() {
    // var panel = xmlPanelUtil.getXMLPanel();
    var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./13.批量预览图.xml");
    if (panel === null) return;

    var format = panel.format;
    if (!format) return null;

    return {
        format: format
    };
}

function Main() {
    var folderURL = fl.browseForFolderURL("醉尘仙：请选择文件夹");
    if (!folderURL) return;

    // ["RECOVER_test.fla","test.fla","test.png"]
    let files: string[] = os.listdir(folderURL);
    // log.info("files:", files);

    // prettier-ignore
    // @ts-ignore es6
    let valiadFiles: string[] = files.filter(file => file.endsWith(".fla")).filter(file => !file.startsWith("RECOVER_") && !file.startsWith("恢复_"));
    // log.info("valiadFiles:", valiadFiles);
    if (!valiadFiles.length) {
        alert("该文件夹下未发现 .fla 文件！");
        return;
    }

    const config = checkXMLPanel();
    if (!config) return;
    const { format } = config;
    // log.info("format:", format);

    // 创建进度条实例
    var bar = new ProgressBar(":bar :current/:total", {
        total: valiadFiles.length
    });
    for (let file of valiadFiles) {
        bar.tick();
        fl.trace(`正在输出：${file}`);

        let filePath = os.path.join(folderURL, file);
        // log.info("filePath:", filePath);

        let baseName = getBasename(file);
        // log.info("baseName:", baseName);
        let outPath = os.path.join(folderURL, `${baseName}${format}`);
        // log.info("outPath:", outPath);

        // 打开fla文件
        let newDoc = fl.openDocument(filePath);
        if (!CheckDom(newDoc)) continue;

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
                throw new Error(`不支持的格式：${format}`);
        }

        newDoc.close(false);
    }
}

Main();
