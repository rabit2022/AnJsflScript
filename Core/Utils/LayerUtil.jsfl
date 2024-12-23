/**
 * @file: LayerUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 19:04
 * @project: AnJsflScript
 * @description:
 */

function LayerUtil() {
}

/**
 * 判断图层是否存在
 * @param {Array.<Layer>} layers 图层数组
 * @param {String} layerName 图层名称
 * @return {Boolean} 图层是否存在
 */
LayerUtil.prototype.IsLayerExists = function (layers, layerName) {
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].name === layerName) {
            return true;
        }
    }
    return false;
}
/**
 * 获取包含指定名称的图层
 * @param {String} layerName 图层名称
 * @return {Array.<Layer>} 图层数组
 */
LayerUtil.prototype.getLayersByName = function (layerName) {
    var doc = fl.getDocumentDOM();//文档
    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    
    var findLayers = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        // if (Includes(layer.name, BG_LAYER_NAME)) {
        if (layer.name.includes(layerName)){
            findLayers.push(layer);
        }
    }
    return findLayers;
}
/**
 * 获取包含指定名称的图层的索引
 * @param {String} layerName 图层名称
 * @return {Array.<Number>} 图层索引数组
 */
LayerUtil.prototype.getLayersIndexByName = function (layerName) {
    var doc = fl.getDocumentDOM();//文档
    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层

    var findLayers = [];
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        // if (Includes(layer.name, BG_LAYER_NAME)) {
        if (layer.name.includes(layerName)){
            findLayers.push(i);
        }
    }
    return findLayers;
}

/**
 * 获取指定图层的索引
 * @param {Layer} layer 图层
 * @return {Number} 图层索引
 */
LayerUtil.prototype.getLayerIndex=function(layer) {
    var doc = fl.getDocumentDOM();//文档
    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    
    var layerIndex = 0;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].name === layer.name) {
            layerIndex = i;
            break;
        }
    }
    return layerIndex;
}

/**
 * 删除 图层
 * @param {Array.<Number>|Array.<Layer>} layersIndex 图层索引数组
 */
LayerUtil.prototype.deleteLayers=function(layersIndex) {
    var doc = fl.getDocumentDOM();//文档
    var timeline = doc.getTimeline();//时间轴

    // 删除图层
    if (layersIndex.length>0) {
        for (var i = 0; i < layersIndex.length; i++) {
            var layerIndex = layersIndex[i];
            // doc.deleteLayer(layerIndex);
            if (typeof layerIndex === "number") {
                timeline.deleteLayer(layerIndex);
            } else {
                var layer = layerIndex;
                var layerIndex = this.getLayerIndex(layer);
                timeline.deleteLayer(layerIndex);
            }
        }
    }
}


var layerUtil = new LayerUtil();

