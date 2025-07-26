/**
 * @file: 创建随机水印元件.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/20 17:16
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { playSingleFrame } from "ElementAnim";
// @ts-expect-error
import { Vector, Rectangle } from "SAT";
// @ts-expect-error
import { __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__ } from "COMPATIBILITY";
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { addNewLayerSafety } from "LayerOperation";

// @ts-expect-error
import JSFLConstants = require("JSFLConstants");

// ===============Third Party======================
import log = require("loglevel");
// endregion import

const { FRAME_1, FRAME_2, FRAME_3, FRAME_4, FRAME_5 } =
    JSFLConstants.Numerics.frame.frameList;

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

const RANDOM_WATERMARK = "AnJsflScript-随机水印";

function getFilters() {
    let filtersStr =
        __WEBPACK_COMPATIBILITY_TEXT_PLUGIN_RELATIVE_PATH__("./水印滤镜.json");
    let filters: Array<any> = JSON.parse(filtersStr);
    return filters;
}

const KEY_FRAMES = [FRAME_1, FRAME_2, FRAME_3, FRAME_4, FRAME_5];

function EditWatermark() {
    let filters = getFilters();
    // log.info(fills);

    doc.enterEditMode("inPlace");
    let timeline = doc.getTimeline(); //时间轴
    let layers = timeline.layers; //图层

    let watermarkLayer = layers[WATERMARK_LAYER_INDEX];

    // 关键帧
    timeline.insertFrames(KEY_FRAMES.length - 1);
    convertToKeyframesSafety(timeline, KEY_FRAMES);

    KEY_FRAMES.forEach((frameIndex, index) => {
        let filter = [filters[index]];
        watermarkLayer.setFiltersAtFrame(frameIndex, filter);
    });

    doc.exitEditMode();
}

let WATERMARK_LAYER_INDEX = 0;
const WATERMARK_LAYER_NAME = "随机水印";

function Main() {
    const WATERMARK_TEXT = "随机水印";
    const WATERMARK_ALPHA = 30;

    // 创建水印图层
    WATERMARK_LAYER_INDEX = addNewLayerSafety(timeline, WATERMARK_LAYER_NAME);

    timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, 0, 1]);

    if (library.itemExists(RANDOM_WATERMARK)) {
        // 已存在则直接添加
        const ORIGINAL_POSITION = new Vector();
        library.addItemToDocument(ORIGINAL_POSITION, RANDOM_WATERMARK);
        playSingleFrame();
    } else {
        let rect = new Rectangle(0, 0, 100, 100);
        doc.addNewText(rect, WATERMARK_TEXT);

        timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, 0, 1]);

        // @ts-expect-error
        var curTextAttrs = fl.getDocumentDOM().selection[0].textRuns[0].textAttrs;
        curTextAttrs.fillColor = "#FFFFFF";
        curTextAttrs.bold = true;
        curTextAttrs.size = 26;

        doc.convertToSymbol("graphic", RANDOM_WATERMARK, "center");
        playSingleFrame();

        EditWatermark();
    }

    // 设置透明度
    doc.setInstanceAlpha(WATERMARK_ALPHA);
}

Main();
