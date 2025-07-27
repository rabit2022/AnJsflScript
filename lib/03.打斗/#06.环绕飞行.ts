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
// @ts-expect-error
import { swapLayers } from "LayerOperation";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { playLoop } from "ElementAnim";

// ===============Third Party======================
import log = require("loglevel");
// endregion import

const { FRAME_1, FRAME_15, FRAME_30 } = JSFLConstants.Numerics.frame.frameList;

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
    let timeline = doc.getTimeline(); //时间轴

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
        // 重新获取元件，因为上一步 已经转为 新的元件
        SelectAll();

        let selection = doc.selection; // 选择的元件
        let { AroundElement, FlyElement } = checkAroundAndFly(selection);

        let radius = Math.abs(FlyElement.x - AroundElement.x);

        // 环绕 ，  环绕飞行_内_
        OnlySelectCurrent(AroundElement);

        // 生成环绕飞行_内部.ts
        // todo:命令行执行，传参
    }

    // 分散到图层
    {
        SelectAll();

        let selection = doc.selection; // 选择的元件
        let { AroundElement, FlyElement } = checkAroundAndFly(selection);

        // current:
        // 0：AroundElement,FlyElement    selected

        // 分散到图层
        OnlySelectCurrent(FlyElement);
        doc.distributeToLayers();

        // current:
        // 0：AroundElement
        // 1：FlyElement    selected

        // 复制图层
        timeline.duplicateLayers();

        // current:
        // 0：AroundElement
        // 1-复制：FlyElement   selected
        // 1：FlyElement

        // 交换图层
        swapLayers(timeline, 0, 1);

        // current:
        // 1-复制：FlyElement   selected
        // 0：AroundElement
        // 1：FlyElement
    }

    // 重新命名
    {
        let layers = timeline.layers; //图层
        let LAYER_NAMES = ["飞行物_后", "环绕轴", "飞行物_前"];

        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            let layerName = LAYER_NAMES[i];

            layer.name = layerName;
        }
    }

    // K 帧
    {
        // 为所有帧插入30帧
        const INSERT_FRAMES = FRAME_30;
        timeline.insertFrames(INSERT_FRAMES, true);

        // 飞行物_后
        {
            timeline.setSelectedLayers(0);

            const KEY_FRAMES = [FRAME_1, FRAME_15];
            convertToKeyframesSafety(timeline, KEY_FRAMES);

            // 15帧
            timeline.setSelectedFrames(KEY_FRAMES[1], KEY_FRAMES[1] + 1);
            doc.deleteSelection();
        }

        // 飞行物_前
        {
            timeline.setSelectedLayers(2);

            const KEY_FRAMES = [FRAME_1, FRAME_15];
            convertToKeyframesSafety(timeline, KEY_FRAMES);

            // 15帧
            timeline.setSelectedFrames(KEY_FRAMES[0], KEY_FRAMES[0] + 1);
            doc.deleteSelection();
        }
    }

    doc.exitEditMode();
}

function Main() {
    let symbolName = generateNameUntilUnique("环绕飞行_动_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditDynamic();
    playLoop();

    alert("动作已生成！（请进入元件手动微调速度）");
}

Main();
