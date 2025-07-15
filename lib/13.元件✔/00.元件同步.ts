/**
 * @file: 00.元件同步.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/14 19:02
 * @project: AnJsflScript
 * @description: 为元件  插入 与timeline相同的帧数
 */

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { IsSymbol } from "ElementChecker";
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { FrameRange, FrameRangeList } from "SAT";
// @ts-expect-error
import { getFrameCount } from "ElementQuery";
// @ts-expect-error
import { playLoop } from "ElementAnim";
// @ts-expect-error
import { SelectAll } from "ElementSelect";

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
var selectedFrames: FrameRangeList = CheckSelectedFrames(timeline);
if (!selectedFrames) {
    // @ts-ignore
    return;
}
const { firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame } =
    selectedFrames;

// 检查选择的元件
// prettier-ignore
if (!CheckSelection(selection, "selectElement", "Not Zero", "请先在舞台上选中至少一个图形元件!")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

const FRAME_COUNT = timeline.frameCount;

function Main() {
    const symbols = selection.filter(IsSymbol);
    // 检查选择的元件
    // prettier-ignore
    if (!CheckSelection(symbols, "selectElement", "Not Zero", "选中的对象中没有图形元件!")) {
        //@ts-ignore
        return;
    }

    let newSelection = [];

    let selectedFrame: FrameRange;
    for (selectedFrame of selectedFrames) {
        // 选中当前层 和 帧
        timeline.setSelectedFrames(selectedFrame.toArray());

        // 转换为关键帧
        const { layerIndex, startFrame, endFrame } = selectedFrame;
        convertToKeyframesSafety(timeline, startFrame, curLayer);

        // 当前选中的元件
        let selection = doc.selection; //选择
        const symbols = selection.filter(IsSymbol);
        // 检查选择的元件
        if (symbols.length === 0) return;

        newSelection.push(symbols);

        for (let symbol of symbols) {
            let symbolFrameCount = getFrameCount(symbol);
            if (symbolFrameCount < FRAME_COUNT) {
                let symbolTimeline = symbol.libraryItem.timeline;

                // 插入 与外面时间轴长度相同的帧数
                symbolTimeline.insertFrames(
                    FRAME_COUNT - symbolFrameCount,
                    true,
                    symbolFrameCount
                );

                // 设置循环：从当前主时间轴帧开始循环
                playLoop();
                symbol.firstFrame = curFrameIndex;
            }
        }
    }

    // 选中 处理过的 symbols
    SelectAll(newSelection);
}

Main();
