/**
 * @file: 左腿.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/26 18:07
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
import { SelectAll, OnlySelectCurrent } from "ElementSelect";

// ===============Third Party======================
import log = require("loglevel");
// endregion import


// region doc
var doc = fl.getDocumentDOM(); //文档
if (!CheckDom(doc)) {//@ts-ignore
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
if (!CheckSelection(selection, "selectElement", "Only one","请选中 左腿 元件")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

function EditDynamic() {
    doc.enterEditMode("inPlace");

    // 设置形变点
    {
        // Vector(x=0, y=-156.3)  240.45，408.8
        // Vector(x=0, y=-108.2)  480.9，408.8    width*2   +48.1（0.2） 权重：0.2
        // Vector(x=0, y=-360.7)  240.45，817.6   height*2  -204.4（-0.5） 权重：-0.5
        // y=0.5*height-0.2*width
        // 360.65，613.2     Vector(x=0, y=-234.45)    猜想一致


    }

}

// 选中左腿
function Main() {

    let symbolName = generateNameUntilUnique("一键走路_左腿静_");
    doc.convertToSymbol("graphic", symbolName, "center");

    symbolName = generateNameUseLast("一键走路_左腿动_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditDynamic();

}

Main();
