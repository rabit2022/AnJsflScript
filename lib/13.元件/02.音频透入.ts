/**
 * @file: 02.音频透入.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/14 20:20
 * @project: AnJsflScript
 * @description:    把声音 从舞台时间轴 同步到 元件时间轴
 */

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers,CheckSymbolTimeline } from "checkUtil";
// @ts-expect-error
import { hasSoundAll, IsLayerBlank, SoundInfo } from "LayerChecker";
// @ts-expect-error
import { addNewLayerSafetyEx } from "LayerOperation";

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

function Main() {
    var { symbolTimeline, stageTimeline } = CheckSymbolTimeline();
    if (!symbolTimeline || !stageTimeline) return;

    const stageInfos: SoundInfo[] = hasSoundAll(stageTimeline);
    if (stageInfos.length === 0) return;

    // log.info("soundInfos", soundInfos);

    // 00.元件同步.ts
    /* ------------- 让舞台时间轴长度与元件一致--------------- */
    symbolTimeline.insertFrames(
        stageTimeline.frameCount - symbolTimeline.frameCount,
        true,
        symbolTimeline.frameCount
    );

    // const symbolLayerNames = symbolTimeline.layers.map((layer) => layer.name);
    // log.info("symbolLayerNames", symbolLayerNames);

    for (let soundInfo of stageInfos) {
        const layer_name = soundInfo.LAYER.layerName;

        // let targetLayerIndex = symbolLayerNames.lastIndexOf(layer_name);
        // if (targetLayerIndex === -1) return;

        let targetLayerIndex = addNewLayerSafetyEx(symbolTimeline, layer_name);
    }
}

Main();
