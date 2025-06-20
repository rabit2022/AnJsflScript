/**
 * @file: LayerChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:27
 * @project: AnJsflScript
 * @description:
 */

define(["FUNC", "FrameChecker"], function (FUNC, fc) {
    const { SAFE_GET_MACRO } = FUNC;
    const { IsFrameBlank } = fc;

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
     * @param {Layer} layer 图层
     * @param {number} [startFrame=0] 开始帧
     * @param {number} [endFrame=layer.frames.length - 1] 结束帧
     * @returns {boolean} 是否包含声音
     */
    function hasSound(layer, startFrame, endFrame) {
        if (startFrame === undefined) startFrame = 0;
        if (endFrame === undefined) endFrame = layer.frames.length - 1;

        for (var i = startFrame; i <= endFrame; i++) {
            var frame = layer.frames[i];
            // undefined 可能是因为 空白帧
            if (frame === undefined) continue;
            // if (frame.getSoundEnvelope()) {
            if (frame.soundLibraryItem) {
                return true; // 发现声音对象
            }
        }
        return false; // 没有声音对象
    }

    /**
     * 检查图层是否为空
     * @param {Layer} layer 图层
     * @returns {boolean} 是否为空
     * @see https://github.com/hufang360/FlashTool
     */
    function IsLayerBlank(layer) {
        // hasSound
        if (hasSound(layer)) {
            return false;
        }

        // 判断 帧 是否为空白
        var lastKF = layer.frames[layer.frames.length - 1].startFrame;
        while (lastKF >= 0) {
            if (!IsFrameBlank(layer.frames[lastKF])) {
                return false;
            }
            // frameId = layer.frames[frameId - 1]?.startFrame || -1;
            lastKF = SAFE_GET_MACRO(layer.frames[lastKF - 1], "startFrame", -1);
        }

        return true;
    }
    return {
        IsLayerExists: IsLayerExists,
        hasSound: hasSound,
        IsLayerBlank: IsLayerBlank
    };
});
