/**
 * @file: 生成环绕飞行_内部.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/25 19:00
 * @project: AnJsflScript
 * @description:环绕动画
 */

// region import
// ===============Core Library======================
// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } from "checkUtil";
// @ts-expect-error
import { generateNameUntilUnique, generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import { Vector, Rectangle, Size } from "SAT";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { convertToKeyframesSafety } from "KeyFrameOperation";
// @ts-expect-error
import { setEaseCurveEx } from "EaseCurve";
// @ts-expect-error
import { playLoop, playLoopReverse } from "ElementAnim";

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

function getRect(radius: number) {
    // left center  在原点，宽高为元素的宽高
    let size = new Size(radius * 2, radius * 0.8);

    let center = new Vector(size.width / 2, 0);
    let rect = Rectangle.fromCenter(center, size);
    return rect;

    // let elementPos=Vector.from(selection[0]);
    // return rect.addOffset(elementPos);
}

/**
 * 生成这些offset的原因是：
 * 如果想要让环绕的 物体 按照预定的轨迹去进行旋转的话，需要指定多个点， 椭圆  左边的中心点  向上偏移两个。 一个是椭圆，右边的中心点。 最后一个是   椭圆左边中心点   向下平移一个单位。
 * 这样图形就会按照椭圆的轨迹进行旋转。
 * 暂时不清楚。 为什么插件生成只有两个点 就能生成环绕效果，这里暂时用三个点。
 * @param radius
 */
function getOffsets(radius: number) {
    // 环绕矩形
    let rect: Rectangle = getRect(radius);
    let rightCenter = rect.getCorner("right center");
    let leftCenter = rect.getCorner("left center");
    // log.info("环绕矩形", rect, rightCenter, leftCenter);

    let offset = new Vector(0, 2);
    let top = leftCenter.clone().sub(offset);
    let bottom = leftCenter.clone().add(offset);
    log.info("环绕矩形", top, bottom);

    let offsets = [top, rightCenter, bottom]; // 顺时针方向
    // let offsets = [bottom, rightCenter, top];// 逆时针方向
    // let offsets = [leftCenter,bottom]
    return offsets;
}

let KEY_FRAMES: number[] = [FRAME_1, FRAME_15, FRAME_30];
// let KEY_FRAMES: number[] = [FRAME_1, FRAME_30];

let MOTION_GUIDE_LAYER_INDEX = 0;
// 环绕层
let AROUND_LAYER_INDEX = 1;

function Main() {
    let layers;
    // 选中：环绕飞行_内部--某个元件
    let RADIUS = 400; //环绕半径

    doc.enterEditMode("inPlace");
    let timeline = doc.getTimeline(); //时间轴

    let symbolName = generateNameUseLast("环绕飞行_飞行物");
    doc.convertToSymbol("graphic", symbolName, "center");

    // motionGuide 层
    {
        MOTION_GUIDE_LAYER_INDEX = timeline.addMotionGuide();
        // log.info("添加动作导向", motionGuideLayerIndex,timeline.currentLayer);

        // 已经选中了 Motion Guide 层
        layers = timeline.layers; //图层
        var motionGuideLayer = layers[MOTION_GUIDE_LAYER_INDEX]; //动作导向层

        motionGuideLayer.name = "运动曲线";

        let rect = getRect(RADIUS);
        let elementPos = Vector.from(selection[0]);
        let finalRect = rect.addOffset(elementPos);
        // log.info("环绕矩形", rect);
        doc.addNewOval(finalRect, true);
    }

    // insert keyframes
    timeline.insertFrames(FRAME_30, true);

    timeline.setSelectedLayers(AROUND_LAYER_INDEX);
    convertToKeyframesSafety(timeline, KEY_FRAMES);

    // 环绕层
    {
        layers = timeline.layers; //图层
        var aroundLayer = layers[AROUND_LAYER_INDEX]; //环绕层

        // 环绕矩形
        let offsets = getOffsets(RADIUS);

        // @ts-ignore
        function setPosition(frame: number, position: Vector) {
            timeline.setSelectedFrames([AROUND_LAYER_INDEX, frame, frame + 1]);

            let FRAME_1_Element = aroundLayer.frames[frame].elements[0];
            FRAME_1_Element.x = position.x;
            FRAME_1_Element.y = position.y;
        }

        KEY_FRAMES.forEach((frame, index) => {
            setPosition(frame, offsets[index]);
        });

        // 补间动画
        setEaseCurveEx(timeline, KEY_FRAMES, "Classic Ease");
    }

    doc.exitEditMode();
    playLoop();
}

Main();
