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

    return {
        IsLayerExists: IsLayerExists
    };
});
