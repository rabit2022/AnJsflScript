/**
 * @file: 01.残影效果.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/15 15:26
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
import { generateNameUntilUnique, generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { Vector } from "SAT";
// @ts-expect-error
import { SelectAllFms, SelectStartFms } from "FramesSelect";
// @ts-expect-error
import { setEaseCurveEx } from "EaseCurve";
// @ts-expect-error
import { playOnce } from "ElementAnim";

// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import fd = require("FilterDefinitions");

// ===============Third Party======================
import log = require("loglevel");
import _ = require("lodash");

// endregion import

const { FRAME_1, FRAME_16 } = JSFLConstants.Numerics.frame.frameList;
const { BlurFilterBuilder } = fd.BUILDERS;

// log.info("FRAME_1", FRAME_1);
// log.info("FRAME_16", FRAME_16);

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

const KEY_FRAMES = [FRAME_1, FRAME_16];

function EditInner() {
    doc.enterEditMode("inPlace");

    let timeline = doc.getTimeline(); //时间轴

    timeline.insertFrames(FRAME_16);
    convertToKeyframesSafety(timeline, KEY_FRAMES);

    timeline.setSelectedFrames(FRAME_16, FRAME_16 + 1);

    let moveOffset: Vector = new Vector(300, 0);
    doc.moveSelectionBy(moveOffset);

    SelectAllFms(timeline);

    setEaseCurveEx(timeline, KEY_FRAMES, "Sine Ease-In-Out");

    doc.exitEditMode();
}

function EditOuter(shadowCount: number) {
    function getAlpha(shadowCount: number, i: number): number {
        // 20  4，10,8，5 16      80
        let MAX_ALPHA = 80;
        let alphaStep = Math.floor(MAX_ALPHA / shadowCount);
        let alpha = 100 - (i + 1) * alphaStep;
        return alpha;
    }

    doc.enterEditMode("inPlace");

    let timeline = doc.getTimeline(); //时间轴

    // 设置图层1的名称
    {
        timeline.setSelectedLayers(0);

        let layers = timeline.layers; //图层
        let curLayerIndex = timeline.currentLayer; //当前图层索引
        let curLayer = layers[curLayerIndex]; //当前图层

        curLayer.name = "图层1";

        playOnce();

        // 复制第一帧
        timeline.copyFrames(FRAME_1, FRAME_1 + 1);
    }

    // 至少有一个图层，index=0,添加的图层index=1，实际图层2
    for (var i = 0; i < shadowCount; i++) {
        let layerName = `图层${i + 2}`;
        timeline.addNewLayer(layerName, "normal", false);

        // 图层2，FRAME_1 + 1
        let FRAME = i + 1;
        timeline.pasteFrames(FRAME, FRAME + 1);
    }

    // 把每一层 的帧数统一
    {
        // 把每一层 的帧数统一
        let FRAMES_COUNT = 20 + shadowCount;
        timeline.insertFrames(FRAMES_COUNT - 1, true, shadowCount);

        // bugfixed: 不清楚为什么，最后的图层的帧数会多一个
        (() => {
            // 解决方案：把最后的图层的帧数减1
            let layers = timeline.layers; //图层
            let lastLayerIndex = layers.length - 1;
            let lastLayer = layers[lastLayerIndex]; //当前图层

            var frames = lastLayer.frames; //当前图层的帧列表
            var lastFrameIndex = frames.length - 1;
            var lastFrame = frames[lastFrameIndex]; //当前帧

            timeline.removeFrames(lastFrameIndex, lastFrameIndex + 1);
        })();
    }

    let filter = new BlurFilterBuilder().setBlur(3).setQuality("medium").build();
    // log.info("filter", filter);
    for (var i = 0; i < shadowCount; i++) {
        let layerIndex = i + 1;
        let frameIndex = i + 1;

        let layers = timeline.layers; //图层
        let curLayer = layers[layerIndex]; //当前图层

        curLayer.setFiltersAtFrame(frameIndex, [filter]);

        timeline.setSelectedFrames([layerIndex, frameIndex, frameIndex + 1]);

        let alpha = getAlpha(shadowCount, i);
        doc.setInstanceAlpha(alpha);
    }
    doc.exitEditMode();
}

function Main() {
    var shadowCount: number = parseNumber(
        "输入残影数量（1~10）:",
        "3",
        "请输入合法的数字。(1~10)",
        { start: 1, end: 10, step: 1 }
    );
    log.info("shadowCount", shadowCount);

    var symbolName: string = generateNameUseLast("一键残影_内部_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditInner();

    var symbolName: string = generateNameUseLast("一键残影_外部_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditOuter(shadowCount);

    playOnce();

    alert("动作已生成,请元件内部调整运动轨迹！");

    SelectStartFms(timeline, selectedFrames);
}

Main();

// let filter = new BlurFilterBuilder().setBlur(3).setQuality("medium").build();
// log.info("filter", filter);
