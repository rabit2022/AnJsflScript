/**
 * @file: #03.随机水印.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/20 17:20
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__ } from "COMPATIBILITY";
// @ts-expect-error
import { parseNumber } from "StringPaser";
// @ts-expect-error
import store = require("store-js");
// @ts-expect-error
import { __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__ } from "COMPATIBILITY";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { getFrameCount } from "ElementQuery";
// @ts-expect-error
import { $range } from "linqUtil";

// ===============Third Party======================
import log = require("loglevel");
import Enumerable = require("linq");
// @ts-expect-error
import { IEnumerable } from 'linq';
// endregion import

const { FPS } = JSFLConstants.Numerics.frame.frameRate;
const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;

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

function checkXMLPanel() {
    // var panel = xmlPanelUtil.getXMLPanel();
    var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__(
        "./03.随机水印/03.随机水印.xml"
    );
    if (panel === null) return;

    let text = panel.text;
    if (!text) return null;

    let alpha = parseNumber(panel.alpha, "请输入合法的透明度值。", {
        start: 1,
        end: 100
    });
    if (alpha === null) return null;

    let size = parseNumber(panel.size, "请输入合法的字体大小。", { start: 0, end: 10 });
    if (size === null) return null;

    let speed = parseNumber(panel.speed, "请输入合法的速度值。", { start: 1, end: 100 });
    if (speed === null) return null;

    let interval = parseNumber(panel.interval, "请输入合法的间隔值。");
    if (interval === null) return null;

    return {
        text,
        alpha,
        size,
        speed,
        interval
    };
}

var ns_store = store.namespace("04-走路-短腿");

function generateSegments(totalFrameCount: number, intervalFrames: number):IEnumerable<[number, number]> {
    return Enumerable
        // @ts-ignore
        .range(0, Math.ceil(totalFrameCount / intervalFrames))
        .select(i => {
            const start = i * intervalFrames;
            const end = Math.min(start + intervalFrames - 1, totalFrameCount - 1);
            return [start, end];
        });
    // .toArray();
}


function Main() {
    let config = checkXMLPanel();
    if (!config) return;

    let { text: WATERMARK_TEXT, alpha: WATERMARK_ALPHA, size, speed, interval } = config;

    let WATERMARK_LAYER_INDEX = 0;
    // 创建随机水印元件
    {
        // 传参
        ns_store.set("WATERMARK_TEXT", WATERMARK_TEXT);
        ns_store.set("WATERMARK_ALPHA", WATERMARK_ALPHA);

        // 创建随机水印元件.ts
        __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
            "./03.随机水印/创建随机水印元件.generated.jsfl"
        );

        // 获取参数
        // ns_store.set("WATERMARK_LAYER_INDEX", WATERMARK_LAYER_INDEX);
        WATERMARK_LAYER_INDEX = ns_store.get("WATERMARK_LAYER_INDEX");
        // log.info("当前水印图层索引：" + WATERMARK_LAYER_INDEX);

        timeline.setSelectedLayers(WATERMARK_LAYER_INDEX); // 选中水印图层
    }

    // 添加关键帧
    {
        // 获取间隔的帧数
        let intervalFrames = interval * FPS;

        var layers = timeline.layers; //图层
        let watermarkLayer = layers[WATERMARK_LAYER_INDEX]; // 水印图层
        let totalFrameCount = watermarkLayer.frameCount; // 总帧数

        let segments = generateSegments(totalFrameCount, intervalFrames);
        segments.forEach(([start, end]) => {
            // log.info(`添加关键帧：${start} - ${end}`);

        });


    }
}

Main();
// let segments = generateSegments(1000,150);
// segments.forEach(([start, end]) => {
//     log.info(`添加关键帧：${start} - ${end}`);
// });