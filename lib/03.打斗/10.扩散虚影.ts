/**
 * @file: 10.扩散虚影.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/20 15:41
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { addNewLayerSafety } from "LayerOperation";
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { $addOffset } from "linqUtil";
// @ts-expect-error
import { generateNameUntilUnique, generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import { playSingleFrame } from "ElementAnim";
// @ts-expect-error
import { Scale } from "SAT";
// @ts-expect-error
import fd = require("FilterDefinitions");
// @ts-expect-error
import ctd = require("ColorTransformDefinitions");
// @ts-expect-error
import { setEaseCurveEx } from "EaseCurve";

// ===============Third Party======================
import log = require("loglevel");
import _ = require("lodash");
// endregion import

const { FRAME_1, FRAME_6, FRAME_7 } = JSFLConstants.Numerics.frame.frameList;
const { AdjustColorFilterBuilder } = fd.BUILDERS;

const { AlphaColorTransformBuilder } = ctd.BUILDERS;

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

let KEY_FRAMES: number[] = [FRAME_1, FRAME_6];
let BLANK_FRAMES: number[] = [FRAME_7];

KEY_FRAMES = $addOffset(KEY_FRAMES, firstSlFrameIndex);
BLANK_FRAMES = $addOffset(BLANK_FRAMES, firstSlFrameIndex);

const SCALE_FACTORS = [1.8, 2.8];

// todo: 处理多个元件的情形，模块化
/**
 * 处理多个元件的情形
 * 选中多个元件时才会转为元件。
 * 如果只选择一个元件，就直接单帧播放。
 * @param {Element[]} selectedElements  选中的元件
 * @param {string} symbolNamePrefix  命名前缀
 * @constructor
 */
function MultiSymbol(selectedElements: FlashElement[], symbolNamePrefix: string) {
    // 处理多个元件的情形
    // let selectedElements = doc.selection;
    if (selectedElements.length > 1) {
        let symbolName: string = generateNameUntilUnique(symbolNamePrefix);
        doc.convertToSymbol("graphic", symbolName, "center");
    }
    playSingleFrame();
}

const filter = new AdjustColorFilterBuilder().build();
const FILTERS = [filter];

const ALPHA_TRANSFORM_1 = new AlphaColorTransformBuilder().setAlphaPercent(80).build();
const ALPHA_TRANSFORM_2 = new AlphaColorTransformBuilder().setAlphaPercent(0).build();

// log.info("AlphaTransform", ALPHA_TRANSFORM);
// log.info("FILTERS", FILTERS);

function scaleFrame(shadowLayerIndex: number) {
    // k1
    timeline.setSelectedFrames([
        shadowLayerIndex,
        _.last(KEY_FRAMES),
        _.last(KEY_FRAMES) + 1
    ]);
    let scale = _.last(SCALE_FACTORS);
    doc.scaleSelection(scale, scale);

    // k0
    timeline.setSelectedFrames([
        shadowLayerIndex,
        _.first(KEY_FRAMES),
        _.first(KEY_FRAMES) + 1
    ]);
    let scale2 = _.first(SCALE_FACTORS);
    doc.scaleSelection(scale2, scale2);
}

function setFilters(shadowLayerIndex: number) {
    var layers = timeline.layers; //图层
    var ShadowLayer = layers[shadowLayerIndex]; //当前图层

    ShadowLayer.setFiltersAtFrame(KEY_FRAMES[0], FILTERS);
    ShadowLayer.setColorTransformAtFrame(KEY_FRAMES[0], ALPHA_TRANSFORM_1);

    ShadowLayer.setFiltersAtFrame(KEY_FRAMES[1], FILTERS);
    ShadowLayer.setColorTransformAtFrame(KEY_FRAMES[1], ALPHA_TRANSFORM_2);
}

function Main() {
    doc.clipCopy();

    let shadowLayerIndex = addNewLayerSafety(timeline, "扩散虚影");

    // k 0,blank 0
    convertToKeyframesSafety(timeline, KEY_FRAMES[0], shadowLayerIndex);
    timeline.convertToBlankKeyframes(BLANK_FRAMES[0]);

    // k 0
    timeline.setSelectedFrames([
        shadowLayerIndex,
        _.first(KEY_FRAMES),
        _.first(KEY_FRAMES) + 1
    ]);
    doc.clipPaste(true);

    // 处理多个元件的情形
    MultiSymbol(doc.selection, "扩散虚影_");

    // k1
    convertToKeyframesSafety(timeline, KEY_FRAMES[1], shadowLayerIndex);

    scaleFrame(shadowLayerIndex);

    setFilters(shadowLayerIndex);

    setEaseCurveEx(timeline, KEY_FRAMES, "Classic Ease");
}

Main();
