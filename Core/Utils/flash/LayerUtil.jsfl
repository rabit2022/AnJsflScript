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
 * @param {Timeline} timeline 时间轴
 * @param {String} layerName 图层名称
 * @return {Boolean} 图层是否存在
 */
LayerUtil.prototype.IsLayerExists = function (timeline, layerName) {
    var layers = timeline.layers;//图层
    
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
        if (layer.name.includes(layerName)) {
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
        if (layer.name.includes(layerName)) {
            findLayers.push(i);
        }
    }
    return findLayers;
}

/**
 * 获取指定图层的索引
 * @param {Array.<Layer>} layers 图层数组
 * @param {Layer} layer 图层
 * @return {Number} 图层索引
 */
LayerUtil.prototype.getLayerIndex = function (layers, layer) {
    var layerIndex = 0;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i] === layer) {
            layerIndex = i;
            break;
        }
    }
    return layerIndex;
}

/**
 * 删除 图层
 * @param {Timeline} timeline 时间轴
 * @param {Array.<Number>|Array.<Layer>} layers 图层索引数组
 */
LayerUtil.prototype.deleteLayers = function (timeline, layers) {
    // 删除图层
    if (layers.length > 0) {
        for (var i = 0; i < layers.length; i++) {
            var layer_ = layers[i];
            
            var layerIndex = this.convertToLayerIndex(layers, layer_);
            timeline.deleteLayer(layerIndex);
        }
    }
}

/**
 * 转换为图层索引
 * @param {Array.<Layer>} layers 图层数组
 * @param {Layer|Number} layer 图层或图层索引
 * @return {Number} 图层索引
 */
LayerUtil.prototype.convertToLayerIndex = function (layers, layer) {
    // 获取图层索引
    var layerIndex = 0;
    if (typeof layer === "number") {
        layerIndex = layer;
    } else {
        layerIndex = this.getLayerIndex(layers, layer);
    }
    return layerIndex;
}

/**
 * 转换为图层
 * @param {Timeline} timeline 时间轴
 * @param {Layer|Number} layer 图层或图层索引
 * @return {Layer} 图层
 */
LayerUtil.prototype.convertToLayer=function(timeline,layer){
    var layers = timeline.layers;//图层
    
    if(typeof layer === "number"){
        var layerIndex = layer;
        return layers[layerIndex];
    }else{
        return layer;
    }
}

var layerUtil = new LayerUtil();

