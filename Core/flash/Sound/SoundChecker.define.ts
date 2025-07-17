/**
 * @file: SoundChecker.ts
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/16 22:42
 * @project: AnJsflScript
 * @description:
 */

// region import
// ===============Core Library======================
// @ts-expect-error
import { FrameRange } from "SAT";
// @ts-expect-error
import { getKeyFrameRanges } from "KeyFrameQuery";

// ===============Third Party======================
import log = require("loglevel");

// endregion import

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
    ITEM: {
        item: FlashSoundItem;
        itemName: string;
        path: string;
    };
    THIRD: {
        /**
         * @description: 第三方 获取音频时长
         * @note: {@link SoundQuery.getAudioDurationsNative}
         */
        SECONDS: number;
    };
}


class SoundInfo implements ISoundInfo {
    LAYER: ISoundInfo["LAYER"];
    FRAME: ISoundInfo["FRAME"];
    SOUND: ISoundInfo["SOUND"];
    ITEM: ISoundInfo["ITEM"];
    THIRD: ISoundInfo["THIRD"];

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
        let soundItem = frame.soundLibraryItem;
        this.ITEM = {
            item: soundItem,
            itemName: soundItem.name,
            path: soundItem.sourceFilePath
        };
        this.THIRD = {
            SECONDS: undefined
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

exports.hasSound = hasSound;
exports.hasSoundAll = hasSoundAll;
