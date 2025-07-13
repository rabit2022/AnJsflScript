/**
 * @file: 07.显示图层.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/10 15:38
 * @project: AnJsflScript
 * @description:
 */

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { getKeyFrameRanges } from "KeyFrameQuery";
// @ts-expect-error
import { FrameRange } from "SAT";
// @ts-expect-error
import { IsEmptyFrame } from "FrameChecker";

import log = require("loglevel");

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

function findPreviousNotEmptyFrame(timeline: FlashTimeline, frameIndex: number) {
    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var keyFrameRanges: FrameRange[] = getKeyFrameRanges(layers, curLayer); //获取当前图层的关键帧范围
    // log.info("关键帧范围", keyFrameRanges);

    // 查找 firstSlFrameIndex 在 keyFrameRanges 中的索引
    // @ts-ignore es6
    var SlKeyFrameIndex = keyFrameRanges.findIndex(function (fr) {
        return fr.contain(frameIndex);
    });
    // log.info("SlKeyFrameIndex", SlKeyFrameIndex);
    if (SlKeyFrameIndex === 0) return;

    var previousKeyFrameIndex: number = keyFrameRanges[SlKeyFrameIndex - 1].startFrame; //上一个关键帧
    log.info("上一个关键帧", previousKeyFrameIndex);

    var _frames = curLayer.frames; //当前图层的帧列表
    var previousKeyFrame = _frames[previousKeyFrameIndex]; //上一个关键帧

    if (IsEmptyFrame(previousKeyFrame)) {
        // 继续向前 查找
        return findPreviousNotEmptyFrame(timeline, previousKeyFrameIndex);
    }

    return previousKeyFrameIndex;
}

function Main() {
    const previousNotEmptyFrame = findPreviousNotEmptyFrame(timeline, firstSlFrameIndex);

    timeline.copyFrames(previousNotEmptyFrame);
    timeline.pasteFrames(firstSlFrameIndex);
}

Main();
