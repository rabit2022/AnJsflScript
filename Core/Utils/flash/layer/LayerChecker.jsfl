/**
 * @file: LayerChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:27
 * @project: AnJsflScript
 * @description:
 */

define(function () {
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

    return {
        IsLayerExists: IsLayerExists,
        hasSound: hasSound
    };
});
