/**
 * @file: 03.音频透出.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/15 12:09
 * @project: AnJsflScript
 * @description: 把声音 从元件时间轴 同步到 舞台时间轴
 */

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers, CheckSymbolTimeline } from "checkUtil";
// @ts-expect-error
import { hasSoundAll, ISoundInfo } from "SoundChecker";
// @ts-expect-error
import { addNewLayerSafetyEx } from "LayerOperation";
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";

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

// 02.音频透入.ts  雷同，symbolTimeline, stageTimeline 互换即可
function Main() {
    let { symbolTimeline, stageTimeline } = CheckSymbolTimeline();
    if (!symbolTimeline || !stageTimeline) return;

    const symbolInfos: ISoundInfo[] = hasSoundAll(symbolTimeline);
    if (symbolInfos.length === 0) return;

    // log.info("soundInfos", soundInfos);

    // 00.元件同步.ts
    /* ------------- 让舞台时间轴长度与元件一致--------------- */
    symbolTimeline.insertFrames(
        symbolTimeline.frameCount - stageTimeline.frameCount,
        true,
        stageTimeline.frameCount
    );

    for (let symbolInfo of symbolInfos) {
        const { layerName } = symbolInfo.LAYER;
        const {
            frameIndex: soundFrameIndex,
            start: keyframeStart,
            end: keyframeEnd
        } = symbolInfo.FRAME;
        const { soundName } = symbolInfo.SOUND;

        // let targetLayerIndex = symbolLayerNames.lastIndexOf(layer_name);
        // if (targetLayerIndex === -1) return;

        let targetLayerIndex = addNewLayerSafetyEx(stageTimeline, layerName);

        // region doc
        let timeline: FlashTimeline = stageTimeline;

        let layers = timeline.layers; //图层
        let curLayerIndex = timeline.currentLayer; //当前图层索引
        let curLayer = layers[curLayerIndex]; //当前图层

        let frames = curLayer.frames; //当前图层的帧列表
        let curFrameIndex = timeline.currentFrame; //当前帧索引
        let curFrame = frames[curFrameIndex]; //当前帧

        let layerFrameCount = curLayer.frameCount; //当前图层的帧数
        // let soundFrame = frames[soundFrameIndex];
        // endregion doc

        // 关键帧
        convertToKeyframesSafety(stageTimeline, soundFrameIndex, targetLayerIndex);

        // 设置声音
        curFrame.soundName = soundName;
        curFrame.soundSync = "stream";
        curFrame.setSoundEnvelopeLimits({ start: keyframeStart } as any);

        /* 在声音尾部插入空白关键帧，保证 声音播放时，不会因为缺少关键帧而停止 */
        if (keyframeEnd > layerFrameCount - 1) {
            convertToKeyframesSafety(stageTimeline, keyframeEnd, targetLayerIndex);
        }
    }

    doc.exitEditMode();
}

Main();
