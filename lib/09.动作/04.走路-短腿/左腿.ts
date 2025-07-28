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
// @ts-expect-error
import { Vector, Rectangle, Size } from "SAT";
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { setEaseCurveEx } from "EaseCurve";
// @ts-expect-error
import store = require("store-js");
// @ts-expect-error
import store = require("store-js");

// ===============Third Party======================
import log = require("loglevel");
import _ = require("lodash");

// endregion import

const { FRAME_1, FRAME_5, FRAME_15, FRAME_20 } = JSFLConstants.Numerics.frame.frameList;

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
if (!CheckSelection(selection, "selectElement", "Only one", "请选中 左腿 元件")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc

let KEY_FRAMES = [FRAME_1, FRAME_5, FRAME_15, FRAME_20];

function EditDynamic(rotationAngle: number) {
    doc.enterEditMode("inPlace");

    let timeline = doc.getTimeline(); //时间轴

    // 设置形变点
    {
        // Vector(x=0, y=-156.3)  240.45，408.8
        // Vector(x=0, y=-108.2)  480.9，408.8    width*2   +48.1（0.2） 权重：0.2
        // Vector(x=0, y=-360.7)  240.45，817.6   height*2  -204.4（-0.5） 权重：-0.5
        // y=0.2*width-0.5*height
        // 360.65，613.2     Vector(x=0, y=-234.45)    猜想一致

        SelectAll();
        let firstElement = doc.selection[0]; // 选择的第一个元件

        let size = Size.from(firstElement); // 元件的大小
        let y = 0.2 * size.width - 0.5 * size.height; // 计算形变点的 y 坐标
        let trPoint = new Vector(0, y);

        doc.setTransformationPoint(trPoint);
    }

    // k 帧
    {
        timeline.insertFrames(_.last(KEY_FRAMES));

        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 第5帧
        {
            timeline.setSelectedFrames(KEY_FRAMES[1], KEY_FRAMES[1] + 1);
            doc.rotateSelection(-rotationAngle);
        }

        // 第15帧
        {
            timeline.setSelectedFrames(KEY_FRAMES[2], KEY_FRAMES[2] + 1);
            doc.rotateSelection(rotationAngle);
        }

        // 补间
        setEaseCurveEx(timeline, KEY_FRAMES, "Classic Ease");
    }

    doc.exitEditMode();
}

var ns_store = store.namespace("04-走路-短腿");

// 选中左腿
function Main() {
    // let ROTATION_ANGLE = 30;
    // let WALK_SPEED = 4;
    let ROTATION_ANGLE = ns_store.get("ROTATION_ANGLE") || 30;
    let WALK_SPEED = ns_store.get("WALK_SPEED") || 4;
    // log.info("ROTATION_ANGLE", ROTATION_ANGLE);
    // log.info("WALK_SPEED", WALK_SPEED);

    // KEY_FRAMES
    {
        // 1,20
        // 4,5
        // 5,4
        // 10,2
        // y= 20/x
        let n = parseInt(String(20 / WALK_SPEED));

        // WALK_SPEED = 4;n = 5;
        // n-1,3n-1,4n-1
        // 4,14,19
        KEY_FRAMES = [FRAME_1, n - 1, 3 * n - 1, 4 * n - 1];
    }

    let symbolName = generateNameUseLast("一键走路_左腿静_");
    doc.convertToSymbol("graphic", symbolName, "center");

    symbolName = generateNameUseLast("一键走路_左腿动_");
    doc.convertToSymbol("graphic", symbolName, "center");

    EditDynamic(ROTATION_ANGLE);
}

Main();
