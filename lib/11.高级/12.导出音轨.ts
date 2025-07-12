/**
 * @file: 12.导出音轨.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/12 21:57
 * @project: AnJsflScript
 * @description:
 */

// prettier-ignore
// @ts-expect-error
import { CheckDom, CheckSelectedFrames, CheckSelectedLayers, CheckSelection } from "checkUtil";
// @ts-expect-error
import { hasSound } from "LayerChecker";
// @ts-expect-error
import { getKeyFrameRanges } from "KeyFrameQuery";
// @ts-expect-error
import os = require("os");

import log = require("loglevel");

const getBaseName = os.path.$basenameWithoutExt;

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

// @todo 新建模块
function SelectAllLayers(layers: number[]) {
    // 选中包含音频的图层
    for (var soundLayerIndex of layers) {
        // 第一个图层
        if (soundLayerIndex === layers[0]) {
            timeline.setSelectedLayers(soundLayerIndex, true);
            continue;
        }
        timeline.setSelectedLayers(soundLayerIndex, false);
    }
}

function selectSoundLayers() {
    // 遍历所有的图层，得到soundInfo
    var soundInfos: SoundInfo[] = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var layerSoundInfos = hasSound(layers, layer);
        soundInfos.push(...layerSoundInfos);
    }

    // 获取 hasSound layers
    var hasSoundLayers = soundInfos.map(function (soundInfo) {
        return soundInfo.layerIndex;
    });
    // log.info(hasSoundLayers);

    SelectAllLayers(hasSoundLayers);
}

/**
 * 清理新文档中的  所有元件
 */
function cleanNonSoundLayers(newDoc: FlashDocument) {
    var timeline = newDoc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层

    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
        const layer = layers[layerIndex];

        timeline.setSelectedLayers(layerIndex, true);

        const keyFrameRanges = getKeyFrameRanges(layers, layer);
        for (let keyFrameRange of keyFrameRanges) {
            const keyFrameIndex = keyFrameRange.startFrame;

            timeline.setSelectedFrames(keyFrameIndex, keyFrameIndex + 1);

            if (newDoc.selection.length > 0) {
                newDoc.deleteSelection();
            }
        }
    }
}

function copytoNewDoc(exportPath: string) {
    // 复制选中的图层
    timeline.copyLayers();

    // 创建一个新的文档
    fl.createDocument("timeline");
    var newDoc = fl.getDocumentDOM(); //文档
    var timeline1 = newDoc.getTimeline(); //时间轴

    // 粘贴图层到新文档
    timeline1.pasteLayers();

    // 清理新文档中的非音频元素
    cleanNonSoundLayers(newDoc);

    const frameCount = timeline1.frameCount;

    // 导出视频
    newDoc.exportVideo(exportPath, false, true, true, frameCount);

    // 关闭新文档
    newDoc.close(false);
}

interface SoundInfo {
    hasSound: boolean;
    layerIndex: number;
    frameIndex: number;
    layer: FlashLayer;
    frame: FlashFrame;
    soundName: string;
}

const docBaseName = getBaseName(doc.pathURI);
// log.info(docBaseName);
// var exportPath = selectedFolderURL + '/' + doc.pathURI.split('/').pop().slice(0, -4) + "_音轨" + ".mov";

function Main() {
    var folderURL = fl.browseForFolderURL("请选择保存位置");
    if (!folderURL) return;

    const exportPath = os.path.join(folderURL, `${docBaseName}_音轨.mov`);
    log.info(exportPath);

    selectSoundLayers();

    copytoNewDoc(exportPath);
}

Main();
