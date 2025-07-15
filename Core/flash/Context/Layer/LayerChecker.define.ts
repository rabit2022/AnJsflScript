/**
 * @file: LayerChecker.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/14 23:08
 * @project: AnJsflScript
 * @description:
 */

// @ts-expect-error
import { IsFrameBlank } from "FrameChecker";
// @ts-expect-error
import { getKeyFrameRanges } from "KeyFrameQuery";
// @ts-expect-error
import { FrameRange } from "SAT";

import log = require("loglevel");

/**
 * 判断图层是否存在
 * @param {Array.<Layer>} layers 图层数组
 * @param {String} layerName 图层名称
 * @return {Boolean} 图层是否存在
 */
function IsLayerExists(layers: FlashLayer[], layerName: string) {
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].name === layerName) {
            return true;
        }
    }
    return false;
}

export interface ISoundInfo {
    LAYER: {
        layer: FlashLayer;
        layerName: string;
        layerIndex: number;
        frameCount: number;
    };
    FRAME: {
        frame: FlashFrame;
        frameIndex: number;
        start: number;
        end: number;
    };
    SOUND: {
        soundName: string;
        start: number;
        // end: number; //1073741823
    };
}

class SoundInfo implements ISoundInfo {
    LAYER: ISoundInfo["LAYER"];
    FRAME: ISoundInfo["FRAME"];
    SOUND: ISoundInfo["SOUND"];

    constructor(
        layer: FlashLayer,
        frameRange: FrameRange,
        frame: FlashFrame,
        frameIndex: number
    ) {
        var limits = frame.getSoundEnvelopeLimits();

        this.LAYER = {
            layer: layer,
            layerName: layer.name,
            layerIndex: frameRange.layerIndex,
            frameCount: layer.frameCount
        };
        this.FRAME = {
            frame: frame,
            frameIndex: frameIndex,
            start: frameRange.startFrame,
            end: frameRange.endFrame
        };
        // log.info(this.FRAME);
        this.SOUND = {
            soundName: frame.soundName,
            start: limits.start
            // end: end
        };
    }
}

/**
 * 检查图层是否包含声音
 * @param {Array.<Layer>} layers 图层数组
 * @param {Layer} layer 图层
 * @returns {ISoundInfo[]} 是否包含声音
 */
function hasSound(layers: FlashLayer[], layer: FlashLayer): SoundInfo[] {
    var results = [];

    const keyFrameRanges: FrameRange[] = getKeyFrameRanges(layers, layer);
    for (let kfr of keyFrameRanges) {
        var keyFrameIndex = kfr.startFrame;
        var keyFrame = layer.frames[keyFrameIndex];
        // undefined 可能是因为 空白帧
        if (keyFrame === undefined) continue;
        if (keyFrame.soundName) {
            var result = new SoundInfo(layer, kfr, keyFrame, keyFrameIndex);
            results.push(result);
        }
    }
    return results;
}

/**
 * 检查图层是否为空
 * @param {Array.<Layer>} layers 图层数组
 * @param {Layer} layer 图层
 * @returns {boolean} 是否为空
 * @see https://github.com/hufang360/FlashTool
 */
function IsLayerBlank(layers: FlashLayer[], layer: FlashLayer): boolean {
    // hasSound
    if (hasSound(layers, layer).length > 0) {
        return false;
    }

    const keyFrameRanges: FrameRange[] = getKeyFrameRanges(layers, layer);
    for (let kfr of keyFrameRanges) {
        let keyFrameIndex = kfr.startFrame;
        let keyFrame = layer.frames[keyFrameIndex];
        // undefined 可能是因为 空白帧
        if (keyFrame === undefined) continue;

        if (!IsFrameBlank(keyFrame)) {
            return false;
        }
    }

    return true;
}

/**
 * 获取所有图层的音频信息
 * @param {Timeline} timeline 时间线
 * @returns {ISoundInfo[]} 所有图层的音频信息
 */
function hasSoundAll(timeline: FlashTimeline): SoundInfo[] {
    var layers = timeline.layers; //图层

    var soundInfos: SoundInfo[] = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var layerSoundInfos = hasSound(layers, layer);
        soundInfos.push(...layerSoundInfos);
    }
    return soundInfos;
}

exports.IsLayerExists = IsLayerExists;
exports.IsLayerBlank = IsLayerBlank;
exports.hasSoundAll = hasSoundAll;
exports.SoundInfo = SoundInfo;
