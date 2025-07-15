/**
 * @file: 13.后发跟随.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/15 20:07
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { IsSymbol } from "ElementChecker";
// @ts-expect-error
import { SelectAll, OnlySelectCurrent } from "ElementSelect";
// @ts-expect-error
import { getName } from "ElementQuery";
// @ts-expect-error
import { generateNameUntilUnique, generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { SelectStartFms } from "FramesSelect";

// ===============Third Party======================
import log = require("loglevel");
// endregion import

const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;

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
if (!selectedFrames) {
    // @ts-ignore
    return;
}
const { firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame } =
    selectedFrames;

// prettier-ignore
// 检查选择的元件
if (!CheckSelection(selection, "selectElement", "Only two", `请同时选择"后发"和"万能头"两个对象！`)) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

function IsKeyFrameHead(symbol: FlashElement) {
    OnlySelectCurrent(symbol);
    if (doc.selection.length === 0) {
        return null;
    }

    doc.enterEditMode("inPlace");
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    // 摇头动作 图层
    // @ts-ignore
    let headLayerIndex = layers.findIndex(function (layer) {
        return layer.name === "摇头动作";
    });
    let result = null;
    if (headLayerIndex === -1) {
    } else {
        timeline.setSelectedLayers(headLayerIndex);
        timeline.copyLayers();

        result = true;
    }

    doc.exitEditMode();

    return result;
}

function IsLabelHead(symbol: FlashElement) {
    OnlySelectCurrent(symbol);

    if (doc.selection.length === 0) {
        return null;
    }

    doc.enterEditMode("inPlace");

    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    // 摇头动作 图层
    // @ts-ignore
    let headLayerIndex = layers.findIndex(function (layer) {
        return layer.name === "摇头动作";
    });

    let result = null;
    if (headLayerIndex === -1) {
        SelectAll();
        var selection = doc.selection; //选择
        if (selection.length === 1 && IsSymbol(selection[0])) {
            // log.info("选择的对象为 万能头 类型！");
            result = IsKeyFrameHead(selection[0]);
        }
    } else {
        timeline.setSelectedLayers(headLayerIndex);
        timeline.copyLayers();

        result = true;
    }

    doc.exitEditMode();
    return result;
}

function checkHeadAndFair(selection: FlashElement[]) {
    let symbol1 = selection[0];
    let symbol2 = selection[1];

    let head: FlashElement = null;
    let fair: FlashElement = null;
    if (IsLabelHead(symbol1)) {
        head = symbol1;
        fair = symbol2;
    } else if (IsLabelHead(symbol2)) {
        head = symbol2;
        fair = symbol1;
    } else {
        alert(`目前仅支持 本插件  "11.组装万能头.jsfl"  功能生成的万能头！`);
        return;
    }
    return { head: head, fair: fair };
}

const SHACK_ACTION_LAYER = 0;
const MOTION_LAYER = 1;

const MOTION_NAME = "表情";

function EditInner() {
    doc.enterEditMode("inPlace");
    let timeline = doc.getTimeline(); //时间轴

    timeline.pasteLayers();

    var layers = timeline.layers; //图层
    let motionLayer = layers[MOTION_LAYER];

    let shackActionLayer = layers[SHACK_ACTION_LAYER];
    let frameCount = shackActionLayer.frames.length;

    motionLayer.name = "表情";

    // timeline.setSelectedLayers(MOTION_LAYER);
    // timeline.setSelectedFrames(FRAME_1, FRAME_1 + 1);
    timeline.setSelectedFrames([MOTION_LAYER, FRAME_1, FRAME_1 + 1]);

    timeline.insertFrames(frameCount - 1);
    motionLayer.setRigParentAtFrame(shackActionLayer, FRAME_1);

    doc.exitEditMode();
}

function Main() {
    if (!IsSymbol(selection[0]) || !IsSymbol(selection[1])) {
        alert("请选择两个 元件 类型！");
        return;
    }

    let headAndFair = checkHeadAndFair(selection);
    if (!headAndFair) return;

    let { head, fair } = headAndFair;
    // log.info("head:", getName(head));
    // log.info("fair:", getName(fair));

    OnlySelectCurrent(fair);

    var symbolName: string = generateNameUseLast("后发跟随_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditInner();

    SelectStartFms(timeline, selectedFrames);
}

Main();

// let isHead =  IsLabelHead(selection[0]);
// log.info("isHead:", isHead);
