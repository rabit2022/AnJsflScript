/**
 * @file: 01.元件重置.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/14 19:42
 * @project: AnJsflScript
 * @description:  为元件  只保留 一帧，方便在元件内部进行操作
 */

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { CopySymbol } from "ElementOperation";
// @ts-expect-error
import { IsSymbol } from "ElementChecker";
// @ts-expect-error
import { SelectStartFms } from "FramesSelect";


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

function Main() {
    const symbols = selection.filter(IsSymbol);
    // 检查选择的元件
    // prettier-ignore
    if (!CheckSelection(symbols, "selectElement", "Not Zero", "选中的对象中没有图形元件!")) {
        //@ts-ignore
        return;
    }

    // 复制元件
    for (let symbol of symbols) {
        let newItem:FlashItem = CopySymbol(symbol, "skip");

        let symbolTimeline =  newItem.timeline;
        let symbolLayers = symbolTimeline.layers;
        let symbolFrameCount = symbolTimeline.frameCount;

        // 删除所有图层的帧数，保持在1帧
        for (let symbolLayer of symbolLayers) {
            // @ts-ignore es6
            let layerIndex:number = symbolLayers.findIndex(
                (layer: FlashLayer) => layer === symbolLayer
            );
            // log.info("layerIndex", layerIndex);
            symbolTimeline.setSelectedLayers(layerIndex, true);

            // 删除 所有 帧，保留1帧
            symbolTimeline.removeFrames(1, symbolFrameCount);
        }
    }

    SelectStartFms(timeline, selectedFrames);
}

Main();
