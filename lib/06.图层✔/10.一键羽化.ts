/**
 * @file: 10.一键羽化.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/15 12:22
 * @project: AnJsflScript
 * @description:
 */

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { IsShape } from "ElementChecker";
// @ts-expect-error
import { generateNameUntilUnique, generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import {SelectAll} from "ElementSelect";
// @ts-expect-error
import {swapLayers} from "LayerOperation";

// ===================================================
import log = require("loglevel");

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
// prettier-ignore
if (!CheckSelection(selection, "selectElement", "Only two","请同时选中两个对象!(羽化形状,羽化对象）")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

function checkShapeAndElement(selection) {
    // 2个选择的元素，一个是形状，一个是对象
    var shape:FlashShape = null;
    var element:FlashElement = null;
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (IsShape(item)) {
            shape = item;
        } else {
            element = item;
        }
    }
    if (!shape || !element) {
        alert(`检测到您没有选择形状,请选择"羽化形状+羽化对象"！`);
        return null;
    }
    return {
        shape: shape,
        element: element
    };
}

const MASK_LAYER_INDEX = 0;
const SYMBOLS_LAYER_INDEX = 1;

function Edit_羽化遮罩() {
    doc.enterEditMode("inPlace");
    doc.group();


}

function Edit_一键羽化(){
    function maskIsZero(timeline: FlashTimeline) {
        let maskLayer = timeline.layers[MASK_LAYER_INDEX];
        let maskElement = maskLayer.frames[0].elements[0];
        if (!IsShape(maskElement)) {
            swapLayers(timeline, MASK_LAYER_INDEX, SYMBOLS_LAYER_INDEX);
        }

        let newMaskLayer = timeline.layers[MASK_LAYER_INDEX];
        newMaskLayer.name="遮罩层";
    }

    doc.enterEditMode("inPlace");
    SelectAll();

    doc.distributeToLayers();

    // 确保  mask 层 0
    let timeline = doc.getTimeline();//时间轴
    maskIsZero(timeline);

    timeline.setSelectedLayers(MASK_LAYER_INDEX,true);

    let symbolName: string=generateNameUseLast("羽化遮罩_");
    doc.convertToSymbol("graphic", symbolName, "center");

    Edit_羽化遮罩();

}


function Main() {
    const shapeAndElement = checkShapeAndElement(selection);
    if (!shapeAndElement) return;

    const { shape, element } = shapeAndElement;
    // log.info(`shape: ${shape}, element: ${element.libraryItem.name}`);

    let symbolName: string=generateNameUntilUnique("一键羽化_");
    doc.convertToSymbol("graphic", symbolName, "center");

    Edit_一键羽化();

}

Main();
