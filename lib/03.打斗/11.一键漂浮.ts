/**
 * @file: 11.一键漂浮.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/19 21:42
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { generateNameUntilUnique, generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { Vector, Size } from "SAT";
// @ts-expect-error
import sat = require("SAT");
// @ts-expect-error
import { setEaseCurveEx } from "EaseCurve";

// ===============Third Party======================
import log = require("loglevel");
import _ = require("lodash");

// endregion import

const { FRAME_1, FRAME_20, FRAME_40 } = JSFLConstants.Numerics.frame.frameList;
const getSymbolSize: Function = sat.ENTITY.SYMBOL.getSize;

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

const KEY_FRAMES = [FRAME_1, FRAME_20, FRAME_40];

const FLOAT_OFFSET = (() => {
    // 向上移动0.1
    let size = getSymbolSize(selection[0]);
    let offset = new Vector(0, -0.1);

    const FLOAT_OFFSET = offset.scale(size.width, size.height);
    return FLOAT_OFFSET;
})();

function EditDynamic() {
    doc.enterEditMode("inPlace");
    let timeline = doc.getTimeline(); //时间轴

    timeline.insertFrames(_.last(KEY_FRAMES));

    convertToKeyframesSafety(timeline, KEY_FRAMES);

    // 选中20帧
    timeline.setSelectedFrames(KEY_FRAMES[1], KEY_FRAMES[1] + 1);
    doc.moveSelectionBy(FLOAT_OFFSET);

    // 补间动画
    setEaseCurveEx(timeline, KEY_FRAMES, "Sine Ease-In-Out");

    doc.exitEditMode();
}

function Main() {
    var symbolName = generateNameUntilUnique("一键漂浮_静_");
    doc.convertToSymbol("graphic", symbolName, "center");

    var symbolName = generateNameUseLast("一键漂浮_动_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditDynamic();

    alert("动效已生成!");
}

Main();
