/**
 * @file: 06.环绕飞行.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/25 18:58
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

// prettier-ignore
// 检查选择的元件
if (!CheckSelection(selection, "selectElement", "Only two", "必须同时选择两个元件！（默认左边环绕，右边飞行）")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

function checkAroundAndFly(selectedElements: FlashElement[]) {
    selectedElements.sort(function (a, b) {
        return a.left - b.left;
    });

    // 默认左边环绕，右边飞行
    var AroundElement = selectedElements[0];
    var FlyElement = selectedElements[1];

    return { AroundElement, FlyElement };
}

function EditDynamic() {
    doc.enterEditMode("inPlace");

    // 转为元件
    {
        SelectAll();

        let selection = doc.selection; // 选择的元件
        let { AroundElement, FlyElement } = checkAroundAndFly(selection);

        OnlySelectCurrent(AroundElement);
        let symbolName = generateNameUseLast("环绕飞行_内_");
        doc.convertToSymbol("graphic", symbolName, "center");

        OnlySelectCurrent(FlyElement);
        symbolName = generateNameUseLast("环绕飞行_环绕轴_");
        doc.convertToSymbol("graphic", symbolName, "center");
    }

    // 环绕飞行_内_
    {
        SelectAll();

        let selection = doc.selection; // 选择的元件
        let { AroundElement, FlyElement } = checkAroundAndFly(selection);

        let radius = Math.abs(FlyElement.x - AroundElement.x);

        // 环绕 ，  环绕飞行_内_
        OnlySelectCurrent(AroundElement);

        // 生成环绕飞行_内部.ts
        // todo:命令行执行，传参
    }

    // todo:分散到图层
    {
    }
}

function Main() {
    let symbolName = generateNameUseLast("环绕飞行_动_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditDynamic();
}

Main();
