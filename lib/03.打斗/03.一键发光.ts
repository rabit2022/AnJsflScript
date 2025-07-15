/**
 * @file: 03.一键发光.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/15 18:54
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
// import fd from "FilterDefinitions";
import fd =require("FilterDefinitions");

// ===============Third Party======================
import log = require("loglevel");

// endregion import

const { GlowFilterBuilder } = fd.BUILDERS;

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

// 获取第一帧
var selectedFrames = CheckSelectedFrames(timeline);
if (!selectedFrames) {// @ts-ignore
    return;
}
const {firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame} = selectedFrames;

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

let glowFilter = new GlowFilterBuilder()
    .setBlur(30)
    .setStrength(150)
    .setColor("white")
    .setQuality("medium")
    .build();
log.info(glowFilter);

function Main() {
    firstSlLayer.setFiltersAtFrame(firstSlFrameIndex, [glowFilter]);
}

Main();
