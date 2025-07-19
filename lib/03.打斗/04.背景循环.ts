/**
 * @file: 04.背景循环.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/19 19:56
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
import { Vector,Size } from "SAT";
// @ts-expect-error
import sat = require("SAT");
// @ts-expect-error
import { generateNameUntilUnique,generateNameUseLast } from "SymbolNameGenerator";
// @ts-expect-error
import MoreElement = require("MoreElement");
// @ts-expect-error
import { SelectAll} from "ElementSelect";
// @ts-expect-error
import JSFLConstants = require("JSFLConstants");
// @ts-expect-error
import { convertToKeyframesSafety} from "KeyFrameOperation";
// @ts-expect-error
import { setClassicEaseCurve} from "EaseCurve";


// ===============Third Party======================
import log = require("loglevel");
import _ = require("lodash");
// endregion import

const {FRAME_1,FRAME_90}=JSFLConstants.Numerics.frame.frameList;
const getSymbolSize:Function = sat.ENTITY.SYMBOL.getSize;



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
    // var xmlPanel = getXMLPanel();
    var xmlPanel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("./04.背景循环.xml");
    if (xmlPanel === null) return null;

    var direction: string = xmlPanel.direction;
    if (!direction) return null;

    var moveME: Vector[] = [];
    switch (direction) {
        case "left":
            // 左循环
            moveME = [new Vector(-1, 0), new Vector(-2, 0)];
            break;
        case "right":
            // 右循环
            moveME = [new Vector(1, 0), new Vector(2, 0)];
            break;
        case "top":
            // 上循环
            moveME = [new Vector(0, -1), new Vector(0, -2)];
            break;
        case "bottom":
            // 下循环
            moveME = [new Vector(0, 1), new Vector(0, 2)];
            break;
        default:
            throw new Error("无效的方向：" + direction);
    }

    return {
        direction: direction,
        moveME: moveME
    };
}

const KEY_FRAMES = [FRAME_1,FRAME_90];
log.info(`KEY_FRAMES:${KEY_FRAMES}`)

function EditDynamic(moveME: Vector[]){
    function getMoveOffset(){
        let moveDirection = _.last(moveME);
        let originSize:Size = getSymbolSize(innerElement);
        let moveOffset:Vector = moveDirection.clone().scale(originSize.width, originSize.height);
        return moveOffset;
    }

    doc.enterEditMode('inPlace');

    SelectAll();

    let innerElement = doc.selection[0];

    for (let me of moveME) {
        let mo: MoreElement = new MoreElement(innerElement, me);
        mo.gridSelection();
    }
    doc.selectAll();

    let symbolName = generateNameUntilUnique("背景循环_静_");
    doc.convertToSymbol('graphic', symbolName, 'center left');

    let timeline = doc.getTimeline(); //时间轴

    timeline.insertFrames(_.last(KEY_FRAMES));
    
    convertToKeyframesSafety(timeline,KEY_FRAMES);

    timeline.setSelectedFrames(FRAME_90,FRAME_90+1);

    let moveOffset = getMoveOffset();
    doc.moveSelectionBy(moveOffset);

    // 选中所有帧，设置 经典补间
    timeline.setSelectedFrames(_.first(KEY_FRAMES),_.last(KEY_FRAMES));
    setClassicEaseCurve(timeline);

    doc.exitEditMode();
    alert('动作已生成!');
}

function Main() {
    const config = checkXMLPanel();
    if (!config) return;

    const { direction, moveME } = config;
    // log.info("direction:", direction);
    // log.info("moveME:", moveME);

    var symbolName = generateNameUntilUnique('背景循环_动_');
    doc.convertToSymbol('graphic', symbolName, 'center left');

    EditDynamic(moveME);
}

Main();

// var selection = doc.selection; //选择
// let mo:MoreElement=new MoreElement(selection[0], new Vector(1, 0));
// mo.gridSelection();
//
// mo=new MoreElement(selection[0], new Vector(2, 0));
// mo.gridSelection();
//
// mo=new MoreElement(selection[0], new Vector(3, 0));
// mo.gridSelection();