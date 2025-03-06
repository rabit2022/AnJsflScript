/**
 * @file: LayerUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 19:04
 * @project: AnJsflScript
 * @description:
 */

define( function() {
    function LayerUtil() {
    }

    /**
     * 判断图层是否存在
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @return {Boolean} 图层是否存在
     */
    LayerUtil.IsLayerExists = function(layers, layerName) {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].name === layerName) {
                return true;
            }
        }
        return false;
    };

    /**
     * 获取包含指定名称的图层或其索引
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @param {Boolean} [returnIndices=false] 是否返回图层索引而不是图层对象
     * @return {Array.<Layer>|Array.<Number>} 匹配的图层数组或索引数组
     */
    LayerUtil._getLayersOrIndicesByName = function(
        layers,
        layerName,
        returnIndices
    ) {
        returnIndices =
            returnIndices === undefined || returnIndices === null
                ? false
                : returnIndices;
        console.log(returnIndices);

        var result = [];
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].name.includes(layerName)) {
                console.log('layers[i].name: ' + layers[i].name + '   layerName: ' + layerName);
                result.push(returnIndices ? i : layers[i]);
            }
        }
        return result;
    };

    /**
     * 获取包含指定名称的图层
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @return {Array.<Layer>} 匹配的图层数组
     */
    LayerUtil.getLayersByName = function(layers, layerName) {
        return this._getLayersOrIndicesByName(layers, layerName, false);
    };

    /**
     * 获取包含指定名称的图层的索引
     * @param {Array.<Layer>} layers 图层数组
     * @param {String} layerName 图层名称
     * @return {Array.<Number>} 匹配的图层索引数组
     */
    LayerUtil.getLayersIndexByName = function(layers, layerName) {
        return this._getLayersOrIndicesByName(layers, layerName, true);
    };

    /**
     * 删除 图层
     * @param {Timeline} timeline 时间轴
     * @param {Array.<Number>|Array.<Layer>} layers 图层索引数组
     */
    LayerUtil.deleteLayers = function(timeline, layers) {
        // 删除图层
        if (layers.length > 0) {
            for (var i = 0; i < layers.length; i++) {
                var layer_ = layers[i];

                var layerIndex = this.convertToLayerIndex(layers, layer_);
                timeline.deleteLayer(layerIndex);
            }
        }
    };

    /**
     * 转换为图层索引
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer|Number} layer 图层或图层索引
     * @return {Number} 图层索引
     */
    LayerUtil.convertToLayerIndex = function(layers, layer) {
        // 获取图层索引
        var layerIndex = 0;
        if (typeof layer === 'number') {
            layerIndex = layer;
        } else {
            layerIndex = layers.indexOf(layer);
        }
        return layerIndex;
    };

    /**
     * 转换为图层
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer|Number} layer 图层或图层索引
     * @return {Layer} 图层
     */
    LayerUtil.convertToLayer = function(layers, layer) {
        // var layers = timeline.layers;//图层

        if (typeof layer === 'number') {
            var layerIndex = layer;
            return layers[layerIndex];
        } else {
            return layer;
        }
    };

    return LayerUtil;
});
