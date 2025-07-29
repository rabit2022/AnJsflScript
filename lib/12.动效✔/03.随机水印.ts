/**
 * @file: #03.随机水印.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/20 17:20
 * @project: AnJsflScript
 * @description:  可能闪退，创建随机水印元件.ts 文件 暂时有bug，待修复
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
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import random = require("random");
// @ts-expect-error
import sat = require("SAT");
// @ts-expect-error
import { Vector, Rectangle, Size } from "SAT";
// @ts-expect-error
import { generateRandomPointInRect } from "satUtil";
// @ts-expect-error
import { setEaseCurveEx } from "EaseCurve";

// ===============Third Party======================
import log = require("loglevel");
import Enumerable = require("linq");
// @ts-expect-error
import { IEnumerable } from "linq";
// endregion import

const { FPS } = JSFLConstants.Numerics.frame.frameRate;
const { FRAME_1 } = JSFLConstants.Numerics.frame.frameList;

// const getStageBounds = sat.ENTITY.STAGE.getBounds;
// const getStageSize = sat.ENTITY.STAGE.getSize;
const { getBounds: getStageBounds, getSize: getStageSize } = sat.ENTITY.STAGE;

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

function generateSegments(totalFrameCount: number, intervalFrames: number): number[][] {
    return Enumerable
        // @ts-ignore
        .range(0, Math.ceil(totalFrameCount / intervalFrames))
        .select((i) => {
            const start = i * intervalFrames;
            const end = Math.min(start + intervalFrames - 1, totalFrameCount - 1);
            return [start, end];
        })
        .toArray();
}

function Main() {
    let allowToContinue = confirm("暂时可能闪退，请存档后在确认，是否继续？");
    if (!allowToContinue) return;

    let config = checkXMLPanel();
    if (!config) return;

    let { text: WATERMARK_TEXT, alpha: WATERMARK_ALPHA, size, speed, interval } = config;

    let WATERMARK_LAYER_INDEX = 0;
    let SYMBOL_FRAME_COUNT = 0;
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
        log.info("当前水印图层索引：" + WATERMARK_LAYER_INDEX);

        timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, FRAME_1, FRAME_1 + 1]); // 选中水印图层

        let selection = doc.selection;
        SYMBOL_FRAME_COUNT = getFrameCount(selection[0]); // 符号的帧数
    }

    // 添加关键帧
    let segments: number[][] = [];
    {
        // 获取间隔的帧数
        let intervalFrames = interval * FPS;

        var layers = timeline.layers; //图层
        let watermarkLayer = layers[WATERMARK_LAYER_INDEX]; // 水印图层
        let totalFrameCount = watermarkLayer.frameCount; // 总帧数

        segments = generateSegments(totalFrameCount, intervalFrames);
        segments.forEach(([start, end]) => {
            // log.info(`添加关键帧：${start} - ${end}`);
            convertToKeyframesSafety(timeline, start);
        });
    }
    log.info(segments);

    // 设置水印 的位置信息
    {
        for (let [start, end] of segments) {
            log.info(start, end);
            // 选中关键帧
            timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, start, start + 1]);

            // 设置元件的关键帧
            {
                let selection = doc.selection;
                let selectedElement = selection[0];

                log.info(selectedElement.libraryItem.name, random.randint(0, SYMBOL_FRAME_COUNT - 1));

                selectedElement.firstFrame = random.randint(0, SYMBOL_FRAME_COUNT - 1);
            }

            // 元件 放到 随机位置
            {
                // 四周留出一点空隙
                let MARGIN = 100;

                let stageBounds: Rectangle = getStageBounds();
                let shrinkedBounds = stageBounds.shrink(MARGIN);
                let randomPoint = generateRandomPointInRect(shrinkedBounds);

                let selectedElement = doc.selection[0];
                selectedElement.x = randomPoint.x;
                selectedElement.y = randomPoint.y;
            }

            // 缩放元件
            {
                let scale = size * random.uniform(1, 2);
                doc.scaleSelection(scale, scale);
            }

            // 最后一帧的处理
            {
                // 转为关键帧
                convertToKeyframesSafety(timeline, end);

                // 选中最后一帧
                timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, end, end + 1]);

                {
                    let stageSize: Size = getStageSize();

                    // 随机方向
                    let direction: Vector = new Vector(
                        random.uniform(-1, 1),
                        random.uniform(-1, 1)
                    ).normalize();

                    // 速度
                    let speedFactor: number = speed / 100;

                    let deltaOffset: Vector = direction
                        .scale(speedFactor)
                        .scale(stageSize.width, stageSize.height);

                    doc.moveSelectionBy(deltaOffset);
                }
            }

            // 补间
            {
                let KEY_FRAMES = [start, end];
                setEaseCurveEx(timeline, KEY_FRAMES, "Classic Ease");
            }
        }
    }

    //  收尾
    {
        // 选中 第一帧
        timeline.setSelectedFrames([WATERMARK_LAYER_INDEX, FRAME_1, FRAME_1 + 1]);

        // 锁定水印图层
        let layers = timeline.layers; //图层
        let watermarkLayer = layers[WATERMARK_LAYER_INDEX]; // 水印图层

        watermarkLayer.locked = true;
    }
}

Main();
// let segments = generateSegments(1000,150);
// segments.forEach(([start, end]) => {
//     log.info(`添加关键帧：${start} - ${end}`);
// });
