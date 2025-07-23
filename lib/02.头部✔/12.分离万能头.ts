/**
 * @file: 12.分离万能头.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/15 19:10
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
import { getName } from "ElementQuery";
// @ts-expect-error
import { getKeyFrameRanges } from "KeyFrameQuery";
// @ts-expect-error
import { FrameRange, Size, Vector } from "SAT";
// @ts-expect-error
import sat = require("SAT");

// ===============Third Party======================
import log = require("loglevel");
// endregion import

const getStageSize = sat.ENTITY.STAGE.getSize;

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

function getAllSymbolNames() {
    doc.enterEditMode("inPlace");

    let timeline = doc.getTimeline(); //时间轴

    let layers = timeline.layers; //图层
    let curLayerIndex = timeline.currentLayer; //当前图层索引
    let curLayer = layers[curLayerIndex]; //当前图层

    let keyFrames: FrameRange[] = getKeyFrameRanges(layers, curLayer);
    let keyFrameSymbolNames: string[] = keyFrames.map((kfr) => {
        let keyFrameLayerIndex = kfr.layerIndex;
        let keyFrameIndex = kfr.startFrame;

        let keyFrameElement =
            layers[keyFrameLayerIndex].frames[keyFrameIndex].elements[0];

        return getName(keyFrameElement);
    });
    // 去除重复的符号名，保持顺序
    // @ts-ignore es6
    let uniqueSymbolNames: string[] = Array.from(new Set(keyFrameSymbolNames));

    doc.enterEditMode();

    return uniqueSymbolNames;
}

const ROW_SYMBOL_COUNT = 10; // 每列的符号数量

function getPosition(count: number) {
    function parseRowColumn(count: number) {
        let row = Math.floor(count / ROW_SYMBOL_COUNT);
        let column = count % ROW_SYMBOL_COUNT;
        return { row, column };
    }
    let stageSize: Size = getStageSize();

    let rowSpace = stageSize.width / ROW_SYMBOL_COUNT;
    // log.info(rowSpace);
    let columnSpace = stageSize.height / ROW_SYMBOL_COUNT;
    // log.info(columnSpace);

    let { row, column } = parseRowColumn(count);
    let topleft = new Vector(rowSpace * column, columnSpace * row);
    let center = topleft.add(new Vector(rowSpace, columnSpace).clone().scale(0.5));
    return center;
}

function Main() {
    let element = selection[0]; //选择的第一个元件
    if (!IsSymbol(element)) {
        alert("请选择 元件 类型 的元素！");
        return;
    }

    let symbolNames = getAllSymbolNames();
    log.info(symbolNames);

    for (let i = 0; i < symbolNames.length; i++) {
        let symbolName = symbolNames[i];

        let position = getPosition(i);
        // log.info(position);
        library.addItemToDocument(position, symbolName);
    }
}

Main();
