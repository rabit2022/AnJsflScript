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
import { Vector,Rectangle,Size } from "SAT";


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
    let elementPos=Vector.from(selection[0]);
    // left center  在原点，宽高为元素的宽高
    let size = new Size(radius*2, radius*0.8);

    let center = new Vector(size.width/2, 0);
    let rect = Rectangle.fromCenter(center, size);

    return rect.addOffset(elementPos);
}


function Main() {
    // 选中：环绕飞行_内部--某个元件
    let RADIUS = 400; //环绕半径

    doc.enterEditMode("inPlace");
    let timeline = doc.getTimeline(); //时间轴


    let symbolName = generateNameUseLast("环绕飞行_飞行物");
    doc.convertToSymbol("graphic", symbolName, "center");

    // motionGuide 层
    {
        let motionGuideLayerIndex = timeline.addMotionGuide();
        // log.info("添加动作导向", motionGuideLayerIndex,timeline.currentLayer);

        // 已经选中了 Motion Guide 层
        var layers = timeline.layers; //图层
        var motionGuideLayer = layers[motionGuideLayerIndex]; //动作导向层

        motionGuideLayer.name = "运动曲线";

        let rect = getRect(RADIUS);
        doc.addNewOval(rect,true);
    }

    // todo:insert keyframes


}

Main();
