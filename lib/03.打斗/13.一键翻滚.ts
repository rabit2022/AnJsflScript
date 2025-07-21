/**
 * @file: 13.一键翻滚.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/20 14:24
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { parseNumber } from "promptUtil";
// @ts-expect-error
import fd = require("FilterDefinitions");
// @ts-expect-error
import { generateNameUntilUnique, generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { SelectAll,  SelectSameName } from "ElementSelect";

// ===============Third Party======================
import log = require("loglevel");
// endregion import

const { BlurFilterBuilder } = fd.BUILDERS;
const { FRAME_1, FRAME_3, FRAME_5, FRAME_7, FRAME_8 } =
    JSFLConstants.Numerics.frame.frameList;

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

// prettier-ignore
// 检查选择的元件
if (!CheckSelection(selection, "selectElement", "Only two", "需同时选择  人物正面+人物背面  两个对象！")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

function getFilter() {
    var blurAmount: number = parseNumber("请输入动态模糊度:", 30, "请输入合法的数字！", {
        min: 0,
        max: 100
    });
    if (blurAmount === null) return null;

    const filter = new BlurFilterBuilder()
        .setBlurX(blurAmount)
        .setBlurY(0)
        .setQuality("medium")
        .build();
    // log.info("filter", filter);
    return [filter];
}

const KEY_FRAMES: number[] = [FRAME_1, FRAME_3, FRAME_5, FRAME_7];
const INSET_FRAMES: number = FRAME_8;

function EditFrame(keyFrameIndex: number) {
    var timeline = doc.getTimeline(); //时间轴

    // log.info("EditFrame", keyFrameIndex);
    timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);

    SelectAll();
    // 水平翻转
    // 关键真是0246。 感觉次数进行翻转。第一次不翻转，第二次翻转。
    let scaleX = (-1) ** (keyFrameIndex / 2);
    // log.info("ScaleX", scaleX,"keyFrameIndex", keyFrameIndex);
    doc.scaleSelection(scaleX, 1);

    timeline.layers[0].setFiltersAtFrame(keyFrameIndex, filters);

    timeline.setSelectedFrames(0, 1);
}

// SelectAll();
// let selection = doc.selection;
let SYMBOL_1 = selection[0];
let SYMBOL_2 = selection[1];

// log.info(SYMBOL_2.libraryItem.name, SYMBOL_1.libraryItem.name)

function EditEnter() {
    function deleteSymbol() {
        // 保留其中一个 元件
        // 02： 选中1，删除
        // 46： 选中0，删除
        for (let keyFrameIndex of KEY_FRAMES.slice(0, 2)) {
            timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);

            SelectSameName(SYMBOL_2);
            doc.deleteSelection();
        }
        for (let keyFrameIndex of KEY_FRAMES.slice(2, 4)) {
            timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);

            SelectSameName(SYMBOL_1);
            doc.deleteSelection();
        }
    }

    doc.enterEditMode("inPlace");
    let timeline = doc.getTimeline(); //时间轴

    // k 帧
    timeline.insertFrames(INSET_FRAMES);
    convertToKeyframesSafety(timeline, KEY_FRAMES);

    deleteSymbol();

    // log.info("KeyFrames", KEY_FRAMES)
    for (let keyFrameIndex of KEY_FRAMES) {
        EditFrame(keyFrameIndex);
        // break;
    }

    doc.exitEditMode();
}

var filters = getFilter();
if (!filters) {
    // @ts-ignore
    return;
}

function Main() {
    var symbolName = generateNameUntilUnique("一键翻滚_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditEnter();
}

Main();

// log.info("Filter", filters);
// // let keyFrameIndex = 0;
//
// for (let keyFrameIndex of KEY_FRAMES) {
//     let scaleX = (-1) ** (keyFrameIndex / 2);
//     log.info("ScaleX", scaleX);
//     doc.scaleSelection(scaleX, 1);
//     timeline.layers[0].setFiltersAtFrame(keyFrameIndex, filters);
// }
