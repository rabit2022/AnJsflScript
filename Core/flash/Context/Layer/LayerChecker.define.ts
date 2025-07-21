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

import { hasSound } from "SoundChecker";

import log = require("loglevel");

/**
 * 判断图层是否存在
 * @param {Array.<Layer>} layers 图层数组
 * @param {String} layerName 图层名称
 * @return {Boolean} 图层是否存在
 */
export function IsLayerExists(layers: FlashLayer[], layerName: string) {
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].name === layerName) {
            return true;
        }
    }
    return false;
}

/**
 * 检查图层是否为空
 * @param {Array.<Layer>} layers 图层数组
 * @param {Layer} layer 图层
 * @returns {boolean} 是否为空
 * @see https://github.com/hufang360/FlashTool
 */
export function IsLayerBlank(layers: FlashLayer[], layer: FlashLayer): boolean {
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
