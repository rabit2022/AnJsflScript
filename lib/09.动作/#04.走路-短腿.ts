/**
 * @file: #04.走路-短腿.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/26 18:05
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers, CheckSelectionAny } from "checkUtil";
// @ts-expect-error
// prettier-ignore
import { __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__, __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__ } from "COMPATIBILITY";

// @ts-expect-error
import { parseNumber } from "StringPaser";
// @ts-expect-error
import { OnlySelectCurrent } from "ElementSelect";
// @ts-expect-error
import store = require("store-js");

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

// // 检查选择的元件
// if (!CheckSelection(selection, "selectElement", "No limit")) {
//     //@ts-ignore
//     return;
// }

let info = `
您选择的部件数量不对！可识别：
2部件：左腿+右腿
4部件：左腿+右腿、左手+右手
5部件：左腿+右腿、左手+右手、头身组合体
`;

if (!CheckSelectionAny(selection, ["==2", "==4", "==5"], info)) {
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
    // var panel = getXMLPanel();
    var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__(
        "./04.走路-短腿/04.走路-短腿.xml"
    );
    if (panel === null) return null;

    var angle = parseNumber(panel.angle, "角度只能输入数字，请重新输入。");
    if (angle === null) return null;

    let speed = parseNumber(panel.speed, "速度只能输入数字，请重新输入。");
    if (speed === null) return null;

    return { angle, speed };
}

var ns_store = store.namespace("04-走路-短腿");

function Main() {
    let config = checkXMLPanel();
    if (config === null) return;

    let { angle: ROTATION_ANGLE, speed: WALK_SPEED } = config;

    ns_store.set("ROTATION_ANGLE", ROTATION_ANGLE);
    ns_store.set("WALK_SPEED", WALK_SPEED);

    switch (selection.length) {
        case 2:
            // note: 左边的部件是 右腿，右边的部件是 左腿
            selection.sort((a, b) => b.left - a.left);

            // 左腿+右腿
            let [leftLeg, rightLeg] = selection;

            OnlySelectCurrent(leftLeg);
            __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
                "./04.走路-短腿/左腿.generated.jsfl"
            );

            OnlySelectCurrent(rightLeg);
            __WEBPACK_COMPATIBILITY_RUN_SCRIPT_RELATIVE_PATH__(
                "./04.走路-短腿/右腿.generated.jsfl"
            );
            break;
        case 4:
            break;
        case 5:
            break;
        default:
            throw new Error(info);
    }
}

Main();
