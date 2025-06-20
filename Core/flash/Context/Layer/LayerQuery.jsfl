/**
 * @file: LayerQuery.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:31
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 获取包含指定名称的图层或其索引
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @param {Boolean} [returnIndices=false] 是否返回图层索引而不是图层对象
     * @return {Array.<Layer>|Array.<Number>} 匹配的图层数组或索引数组
     */
    function _getLayersOrIndicesByName(layers, layerName, returnIndices) {
        returnIndices =
            returnIndices === undefined || returnIndices === null ? false : returnIndices;
        // log.debug(returnIndices);

        var result = [];
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].name.includes(layerName)) {
                // log.debug(
                //     "layers[i].name: " + layers[i].name + "   layerName: " + layerName
                // );
                result.push(returnIndices ? i : layers[i]);
            }
        }
        return result;
    }

    /**
     * 获取包含指定名称的图层
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @return {Array.<Layer>} 匹配的图层数组
     */
    function getLayersByName(layers, layerName) {
        return _getLayersOrIndicesByName(layers, layerName, false);
    }

    /**
     * 获取包含指定名称的图层的索引
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @return {Array.<Number>} 匹配的图层索引数组
     */
    function getLayersIndexByName(layers, layerName) {
        return _getLayersOrIndicesByName(layers, layerName, true);
    }

    /**
     * 转换为图层索引
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer|Number} layer 图层或图层索引
     * @return {Number} 图层索引
     */
    function convertToLayerIndex(layers, layer) {
        // 获取图层索引
        var layerIndex = -1;
        if (typeof layer === "number") {
            layerIndex = layer;
        } else {
            layerIndex = layers.indexOf(layer);
        }
        return layerIndex;
    }

    /**
     * 转换为图层
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer|Number} layer 图层或图层索引
     * @return {Layer} 图层
     */
    function convertToLayer(layers, layer) {
        // var layers = timeline.layers;//图层

        if (typeof layer === "number") {
            var layerIndex = layer;
            return layers[layerIndex];
        } else {
            return layer;
        }
    }

    return {
        getLayersIndexByName: getLayersIndexByName,
        getLayersByName: getLayersByName,
        convertToLayerIndex: convertToLayerIndex,
        convertToLayer: convertToLayer
    };
});
