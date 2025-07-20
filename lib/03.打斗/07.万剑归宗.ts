/**
 * @file: 07.万剑归宗.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/19 22:01
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
import { SelectAll } from "ElementSelect";
// @ts-expect-error
import { Vector, Size } from "SAT";
// @ts-expect-error
import sat = require("SAT");
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { setEaseCurveEx } from "EaseCurve";
// @ts-expect-error
import { setTweenRotation } from "Tween";
// @ts-expect-error
import { parseNumber } from "promptUtil";

// ===============Third Party======================
import log = require("loglevel");
import _ = require("lodash");

// endregion import

const getSymbolSize: (FlashElement) => Size = sat.ENTITY.SYMBOL.getSize;
const { FRAME_1, FRAME_45 } = JSFLConstants.Numerics.frame.frameList;

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

const KEY_FRAMES: number[] = [FRAME_1, FRAME_45];
const BASE_LAYER = 0;

function EditDynamic(SwordCount: number) {
    function getTrPoint(selectionElement) {
        let position: Vector = Vector.from(selectionElement);
        let size = getSymbolSize(selectionElement);
        // log.info("size", size);
        // log.info("position", position);

        // 最开始的时候，变形点是在中心位置。 现在这里用原本的size乘以0.8。 表示的是向下移动0.8个单位，也就是 变形点向下移动0.3个身位。
        let trPoint: Vector = position.add(size.toVector().scale(0, 0.8));
        return trPoint;
    }
    doc.enterEditMode("inPlace");

    SelectAll();

    let selectionElement = doc.selection[0];

    // 设置变形点
    let trPoint = getTrPoint(selectionElement);
    doc.setTransformationPoint(trPoint);

    let timeline = doc.getTimeline(); //时间轴

    // k帧
    // log.info("生成动效，k帧", _.last(KEY_FRAMES));
    timeline.insertFrames(_.last(KEY_FRAMES));
    convertToKeyframesSafety(timeline, KEY_FRAMES);

    // 缓动
    setEaseCurveEx(timeline, KEY_FRAMES, "Cubic Ease-Out");
    setTweenRotation(timeline, "clockwise", 0);

    timeline.setSelectedLayers(BASE_LAYER);

    for (let i = 0; i < SwordCount - 1; i++) {
        // 复制 上一次旋转的图层。
        timeline.duplicateLayers();

        // 选中复制的图层的最后一帧。
        timeline.setSelectedFrames(_.last(KEY_FRAMES), _.last(KEY_FRAMES) + 1);

        // 继续按照上次选择的角度进行旋转。 每次旋转角度都是一样的。
        let angle = 360 / SwordCount;
        // log.info("旋转角度", angle);
        doc.rotateSelection(angle);
    }

    doc.exitEditMode();
}

function Main() {
    let SwordCount: number = parseNumber(
        "输入剑柄数量:",
        12,
        "请输入合法的剑柄数量(1-12)",
        {
            start: 1,
            end: 12,
            step: 1
        }
    );
    if (!SwordCount) return;
    // log.info("剑柄数量:", SwordCount);

    var symbolName = generateNameUntilUnique("万剑归宗_静_");
    doc.convertToSymbol("graphic", symbolName, "center");

    var symbolName = generateNameUseLast("万剑归宗_动_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditDynamic(SwordCount);

    alert("动效已生成!");
}

Main();
