/**
 * @file: LayerChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:27
 * @project: AnJsflScript
 * @description:
 */

define(["FrameChecker", "KeyFrameQuery"], function (fc, kfq) {
    const { IsFrameBlank } = fc;
    const { getKeyFrameRanges } = kfq;

    /**
     * 判断图层是否存在
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @return {Boolean} 图层是否存在
     */
    function IsLayerExists(layers, layerName) {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].name === layerName) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查图层是否包含声音
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer} layer 图层
     * @returns {SoundInfo[]} 是否包含声音
     */
    function hasSound(layers, layer) {
        var result = {
            LAYER: {
                layer: null,
                layerName: null,
                layerIndex: null
            },
            FRAME: {
                frame: null,
                frameIndex: null,
                start: null,
                end: null
            },
            SOUND: {
                soundName: null,
                start: null
                // end: null
            }
        };
        var results = [];

        const keyFrameRanges = getKeyFrameRanges(layers, layer);
        keyFrameRanges.forEach(function (kfr) {
            var keyFrameIndex = kfr.startFrame;
            var keyFrame = layer.frames[keyFrameIndex];
            // undefined 可能是因为 空白帧
            if (keyFrame === undefined) return;
            if (keyFrame.soundName) {
                var limits = keyFrame.getSoundEnvelopeLimits();
                result = {
                    LAYER: {
                        layer: layer,
                        layerName: layer.name,
                        layerIndex: kfr.layerIndex
                    },
                    FRAME: {
                        frame: keyFrame,
                        frameIndex: keyFrameIndex,
                        start: kfr.startFrame,
                        end: kfr.endFrame
                    },
                    SOUND: {
                        soundName: keyFrame.soundName,
                        start: limits.start
                        // end: limits.end
                    }
                };

                results.push(result);
            }
        });
        return results;
    }

    /**
     * 检查图层是否为空
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer} layer 图层
     * @returns {boolean} 是否为空
     * @see https://github.com/hufang360/FlashTool
     */
    function IsLayerBlank(layers, layer) {
        // hasSound
        if (hasSound(layers, layer).length > 0) {
            return false;
        }

        // 判断 帧 是否为空白
        var lastKF = layer.frames[layer.frames.length - 1].startFrame;
        while (lastKF >= 0) {
            if (!IsFrameBlank(layer.frames[lastKF])) {
                return false;
            }
            // frameId = layer.frames[frameId - 1]?.startFrame || -1;
            // lastKF = SAFE_GET_MACRO(layer.frames[lastKF - 1], "startFrame", -1);
            var _a;
            // prettier-ignore
            lastKF = ((_a = layer.frames[lastKF - 1]) === null || _a === void 0 ? void 0 : _a.startFrame) || -1;
        }

        return true;
    }

    /**
     * 获取所有图层的音频信息
     * @param {Timeline} timeline 时间线
     * @returns {SoundInfo[]} 所有图层的音频信息
     */
    function hasSoundAll(timeline) {
        var layers = timeline.layers;
        var soundInfos = [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerSoundInfos = hasSound(layers, layer);
            // console.log(layer.name,layerSoundInfos);
            soundInfos.push.apply(soundInfos, layerSoundInfos);
        }
        return soundInfos;
    }

    return {
        IsLayerExists: IsLayerExists,
        hasSound: hasSound,
        IsLayerBlank: IsLayerBlank,
        hasSoundAll: hasSoundAll
    };
});
