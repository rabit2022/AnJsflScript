/**
 * @file: 05.背景拓宽.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/19 21:18
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { Vector, Size } from "SAT";
// @ts-expect-error
import MoreElement = require("MoreElement");
// @ts-expect-error
import { SelectStart } from "ElementSelect";

// ===============Third Party======================
import log = require("loglevel");
// endregion import

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

/**
 * [ (-1,-1), (0,-1), (1,-1),
 *   (-1, 0),         (1, 0),
 *   (-1, 1), (0, 1), (1, 1) ]
 */
function getNeighborVectors() {
    // @ts-ignore es6 Array.from
    const points = Array.from({ length: 9 }, (_, i) => ({
        x: (i % 3) - 1,
        y: Math.floor(i / 3) - 1
    }));
    const neighbors = points.filter((p) => p.x !== 0 || p.y !== 0);
    const neighborVectors: Vector[] = neighbors.map((p) => Vector.from(p));

    // log.info("neighborVectors", neighborVectors);
    return neighborVectors;
}

function Main() {
    let selectedElement = selection[0];

    let neighbors = getNeighborVectors();
    for (let neighbor of neighbors) {
        let mo: MoreElement = new MoreElement(selectedElement, neighbor);
        mo.gridSelection();
    }

    SelectStart(selection);
}

Main();
