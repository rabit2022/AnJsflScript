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
import { SelectAll } from "ElementSelect";
// @ts-expect-error
import { swapLayers } from "LayerOperation";
// @ts-expect-error
import sat = require("SAT");
// @ts-expect-error
import { Rectangle } from "SAT";
// @ts-expect-error
import fd = require("FillDefinitions");
// @ts-expect-error
import { SolidFill } from "FillDefinitions";
// @ts-expect-error
import { setCustomPanel,resetCustomPanel } from "ColorPanel";
// @ts-expect-error
import fld = require("FilterDefinitions");


// ===================================================
import log = require("loglevel");
import _ = require("lodash");


const getSymbolBounds = sat.ENTITY.SYMBOL.getBounds;

const { SolidFillBuilder } = fd.BUILDERS;
const { BlurFilterBuilder } = fld.BUILDERS;

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

// 获取第一帧
var selectedFrames = CheckSelectedFrames(timeline);
if (!selectedFrames) {// @ts-ignore
    return;
}
const {firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame} = selectedFrames;

// 检查选择的元件
// prettier-ignore
if (!CheckSelection(selection, "selectElement", "Only two", "请同时选中两个对象!(羽化形状,羽化对象）")) {
    //@ts-ignore
    return;
}

// // 检查选择的图层
// var selectedLayers = CheckSelectedLayers(timeline, "No limit");
// if (!selectedLayers) { // @ts-ignore
//     return;
// }
// endregion doc


function _getMaskBounds(symbol_feather: FlashElement) {
    let feather_bounds: Rectangle = getSymbolBounds(symbol_feather);
    let final_bounds: Rectangle = feather_bounds.expand(50);
    return final_bounds;
}

const getMaskBounds = _.curry(_getMaskBounds);

/**
 * 获取遮罩层 矩形边界
 * @type {Rectangle}
 */
let mask_bounds: Rectangle = getMaskBounds;


const MASK_LAYER_INDEX = 0;
const SYMBOLS_LAYER_INDEX = 1;

function Edit_mask() {
    doc.enterEditMode("inPlace");
    doc.group();

    let fill: SolidFill = new SolidFillBuilder().setColor('#FFFFFF00').build();
    // log.info(fill);
    setCustomPanel(undefined, fill);

    doc.addNewRectangle(mask_bounds, 0);

    resetCustomPanel();


    let filter = new BlurFilterBuilder()
        .setBlur(40)
        .setQuality("high")
        .build();
    log.info(filter);

    let timeline = doc.getTimeline(); //时间轴
    let layers = timeline.layers; //图层

    let maskLayer = layers[MASK_LAYER_INDEX];
    maskLayer.setFiltersAtFrame(0, [filter]);

    doc.exitEditMode();
}

function Edit_feather() {
    function maskIsZero(timeline: FlashTimeline) {
        let maskLayer = timeline.layers[MASK_LAYER_INDEX];
        let maskElement = maskLayer.frames[0].elements[0];
        if (!IsShape(maskElement)) {
            swapLayers(timeline, MASK_LAYER_INDEX, SYMBOLS_LAYER_INDEX);
        }

        let newMaskLayer = timeline.layers[MASK_LAYER_INDEX];
        // newMaskLayer.name = "遮罩层";

        return newMaskLayer;
    }

    doc.enterEditMode("inPlace");
    SelectAll();

    doc.distributeToLayers();

    // 确保  mask 层 0
    let timeline = doc.getTimeline(); //时间轴
    let maskLayer = maskIsZero(timeline);

    // timeline.setSelectedLayers(MASK_LAYER_INDEX, true);
    timeline.setSelectedFrames([MASK_LAYER_INDEX,0,1])

    let symbolName: string = generateNameUseLast("羽化遮罩_");
    doc.convertToSymbol("graphic", symbolName, "center");

    Edit_mask();

    doc.convertSelectionToBitmap();

    maskLayer.setBlendModeAtFrame(0, "alpha");

    doc.exitEditMode();
}

function Main() {
    // region shapeAndElement
    function checkShapeAndElement(selection) {
        // 2个选择的元素，一个是形状，一个是对象
        var shape: FlashShape = null;
        var element: FlashElement = null;
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

    const shapeAndElement = checkShapeAndElement(selection);
    if (!shapeAndElement) return;

    const { shape, element } = shapeAndElement;
    // log.info(`shape: ${shape}, element: ${element.libraryItem.name}`);
    // endregion shapeAndElement

    let symbolName: string = generateNameUntilUnique("一键羽化_");
    doc.convertToSymbol("graphic", symbolName, "center");

    // 一键羽化 ： feather
    let symbol_feather = doc.selection[0];
    mask_bounds = mask_bounds(symbol_feather);


    Edit_feather();

    let timeline = doc.getTimeline(); //时间轴
    let layers = timeline.layers; //图层

    let maskLayer = layers[MASK_LAYER_INDEX];
    // log.info(`firstSlFrameIndex: ${firstSlFrameIndex}, maskLayer: ${maskLayer.name}`);
    maskLayer.setBlendModeAtFrame(firstSlFrameIndex,"layer")


}

Main();

// let fill:SolidFill =new SolidFillBuilder().setColor("white").setAlpha(0).build();
// log.info(fill);

// let filter:Rectangle = new BlurFilterBuilder().setBlur(40).setQuality("high").build();
// log.info(filter);