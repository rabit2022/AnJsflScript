/**
 * @file: 04.安全保存.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/6 21:49
 * @project: AnJsflScript
 * @description:首次导入会很慢
 */

// prettier-ignore
// @ts-ignore
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-ignore
// luxon 的第三方库，polyfill 非常多，首次导入会很慢
import { DateTime } from "luxon-config";
// @ts-ignore
import os = require("os");

import log = require("loglevel");

const getBaseName = os.path.$basenameWithoutExt;

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
// if (!selectedFrames) return;
// const { firstSlLayerIndex, firstSlFrameIndex,firstSlLayer, firstSlFrame } = selectedFrames;

// 检查选择的元件
if (!CheckSelection(selection, "selectElement", "No limit")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) return;
// endregion doc

const MAX_SAVE_COUNT: number = 10;
const SAVE_FOLDER: string = window.AnJsflScript.FOLDERS.Save;
if (!os.path.exists(SAVE_FOLDER)) {
    os.mkdir(SAVE_FOLDER);
}
const ORIGINAL_DOC_PATH: string = doc.pathURI;

var getSavepath: () => string = function () {
    // var uri = doc.pathURI;
    // log.info("uri: " + uri);
    var docBaseName = getBaseName(ORIGINAL_DOC_PATH);
    // log.info("fileName: " + docBaseName);

    const now = DateTime.now();
    const format = now.toFormat("yyyy年MM月dd日HH时mm分ss秒");
    const saveName = `${format}_${docBaseName}.fla`;
    return os.path.join(SAVE_FOLDER, saveName);
};

class TimeData {
    timeStamp: string;
    fileName: string;
    flaFile: string;

    constructor(flaFile: string) {
        let flaBaseName = getBaseName(flaFile);
        // log.info("flaBaseName: " + flaBaseName);

        // 分离时间戳和文件名
        const [timestamp, fileName] = flaBaseName.split("_");
        // log.info("timestamp: ", timestamp);
        // 解析时间戳
        let dateTime = DateTime.fromFormat(timestamp, "yyyy年MM月dd日HH时mm分ss秒");
        // log.info("dateTime: ", dateTime);
        // log.info("fileName: ", fileName);
        this.fileName = fileName;
        this.timeStamp = dateTime.toISO();
        this.flaFile = flaFile;
    }

    toString() {
        return `${this.flaFile}`;
    }
}

function deleteNoneFlaFile(timeDataList: Array<TimeData>) {
    // 删除不是由这个程序保存的 fla文件，不是以2025开头的文件。
    let notMyFlaList: Array<string> = timeDataList
        .filter(
            (timeData) =>
                // @ts-ignore 使用非es5 api
                !timeData.flaFile.startsWith("20") || !timeData.flaFile.endsWith(".fla")
        )
        .map((timeData) => os.path.join(SAVE_FOLDER, timeData.flaFile));
    // log.info("notMyFlaList: " ,notMyFlaList);
    for (let flaFile of notMyFlaList) {
        os.remove(flaFile);
    }
}

function deleteMoreThanMAX(timeDataList: Array<TimeData>) {
    // 删除超过最大保存数量的 fla文件。
    if (timeDataList.length > MAX_SAVE_COUNT) {
        let deleteFlaList: Array<string> = timeDataList
            .slice(0, timeDataList.length - MAX_SAVE_COUNT)
            .map((timeData) => os.path.join(SAVE_FOLDER, timeData.flaFile));
        // log.info("deleteFlaList: " + deleteFlaList);
        for (let flaFile of deleteFlaList) {
            os.remove(flaFile);
        }
    }
}

function Main() {
    let allowToContinue = confirm("暂时可能闪退，或者导入很慢，请存档后在确认，是否继续？");
    if (!allowToContinue) return;


    const savepath = getSavepath();
    log.info("savename: " + savepath);

    // 保存当前文档
    fl.saveDocument(doc, savepath);
    // 还原原文档
    fl.saveDocument(doc, ORIGINAL_DOC_PATH);

    const flaList: Array<string> = os.listdir(SAVE_FOLDER);
    // log.info("flaList: " + flaList);

    let timeDataList: Array<TimeData> = [];
    for (let flaFile of flaList) {
        timeDataList.push(new TimeData(flaFile));
    }
    // 从小到大排序。
    timeDataList.sort((a, b) => a.timeStamp.localeCompare(b.timeStamp));
    // log.info("timeDataList: " + timeDataList);

    deleteNoneFlaFile(timeDataList);

    deleteMoreThanMAX(timeDataList);
}

Main();
