/**
 * @file: LayerOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:32
 * @project: AnJsflScript
 * @description:
 */

define(["LayerQuery", "Tips", "loglevel", "LayerQueryEnhance","LayerChecker"], function (
    lq,
    Tips,
    log,
    lqe,lc
) {
    const { convertToLayerIndex, getLayersIndexByName } = lq;
    const { getEmptyLayers } = lqe;

    const { checkVariableRedeclaration } = Tips;

    const { IsLayerBlank } = lc;

    /**
     * 删除 图层
     * @param {Timeline} timeline 时间轴
     * @param {Array.<Number>|Array.<Layer>} layers 图层索引数组
     */
    function deleteLayers(timeline, layers) {
        checkVariableRedeclaration(timeline, "timeline");
        // 删除图层
        if (layers.length > 0) {
            for (var i = 0; i < layers.length; i++) {
                var layer_ = layers[i];

                var layerIndex = convertToLayerIndex(layers, layer_);
                timeline.deleteLayer(layerIndex);
            }
        }
    }

    /**
     * 交换图层
     * @param {Timeline} timeline 时间轴
     * @param {Number} layerIndex1 图层索引1
     * @param {Number} layerIndex2 图层索引2
     */
    function swapLayers(timeline, layerIndex1, layerIndex2) {
        var layers = timeline.layers; // 获取所有图层
        checkVariableRedeclaration(timeline, "timeline");

        if (
            !(
                layerIndex1 >= 0 &&
                layerIndex1 < layers.length &&
                layerIndex2 >= 0 &&
                layerIndex2 < layers.length
            )
        ) {
            log.error("图层索引超出范围。");
            return;
        }

        // 如果两个索引相同，无需交换
        if (layerIndex1 === layerIndex2) {
            log.info("图层索引相同，无需交换。");
            return;
        }

        // 交换图层顺序
        timeline.reorderLayer(layerIndex1, layerIndex2);
        timeline.reorderLayer(layerIndex2, layerIndex1);

        log.info(
            "layerUtil.js:图层%d(%s)和图层%d(%s)交换成功。",
            layerIndex1,
            layers[layerIndex1].name,
            layerIndex2,
            layers[layerIndex2].name
        );
    }

    /**
     * 清除空白图层
     * @see https://github.com/hufang360/FlashTool
     */
    function clearEmptyLayers() {
        var doc = fl.getDocumentDOM(); //文档
        var timeline = doc.getTimeline(); //时间轴

        const emptyLayers = getEmptyLayers(timeline);

        emptyLayers.reverse();
        emptyLayers.forEach(function (layerIndex) {
            timeline.deleteLayer(layerIndex);
        });

        // alert(`已删除 ${emptyLayers.length} 个空白图层`);
        console.info("已删除 %d 个空白图层", emptyLayers.length);
    }

    /**
     * 添加新图层，如果已存在独白黑幕图层，则选中
     * 在最上面添加新图层,不过滤  空白图层
     * @param {Timeline} timeline 时间轴
     * @param {String} layerName 图层名称
     */
    function addNewLayerSafety(timeline, layerName) {
        var layers = timeline.layers; // 获取所有图层

        var returnLayerIndex = -1;

        var layerIndex = getLayersIndexByName(layers, layerName);
        if (layerIndex.length > 0) {
            // 已存在独白黑幕图层，直接选中
            timeline.currentLayer = layerIndex[0];
            returnLayerIndex = layerIndex[0];
        } else {
            returnLayerIndex = timeline.addNewLayer(layerName, "normal", true);
        }
        return returnLayerIndex;
    }

    /**
     * 设置父图层
     * @param {Timeline} timeline 时间轴
     * @param {Number|Layer} layer 图层
     * @param {Number|Layer} parentLayer 父图层
     * @param {"guide"|"mask"|"folder"} layerType 图层类型
     */
    function setParentLayer(timeline, layer, parentLayer, layerType) {
        var layers = timeline.layers; //图层

        var layerIndex = convertToLayerIndex(layers, layer);
        var parentLayerIndex = convertToLayerIndex(layers, parentLayer);

        timeline.currentLayer = parentLayerIndex;

        // var parentLayer = layers[parentLayer]; //当前图层
        var parentLayer_ = layers[parentLayerIndex]; //当前图层

        parentLayer_.layerType = layerType;

        //设置父图层
        layers[layerIndex].parentLayer = parentLayer_;
    }

    /**
     * 重命名图层
     * @param {Timeline} timeline 时间轴
     * @param {Number|Layer} layer 图层
     * @param {String} newName 新名称
     */
    function renameLayer(timeline, layer, newName) {
        var layers = timeline.layers; //图层

        var layerIndex = convertToLayerIndex(layers, layer);

        layers[layerIndex].name = newName;
    }

    /**
     * 添加新图层，声音图层，则选中
     * 在最下面添加新图层，过滤掉空白图层
     * @param {Timeline} symbolTimeline 符号时间轴
     * @param {String} layerName 图层名称
     */
    function addNewLayerSafetyEx(symbolTimeline, layerName) {
        var symbolLayerNames = symbolTimeline.layers.map(function (layer) { return layer.name; });
        var targetLayerIndex = symbolLayerNames.lastIndexOf(layerName);
        var isLayerBlank = (function () {
            var symbolLayers = symbolTimeline.layers;
            var targetLayer = symbolLayers[targetLayerIndex];
            var isLayerBlank = IsLayerBlank(symbolLayers, targetLayer);
            return isLayerBlank;
        })();
        if (targetLayerIndex === -1 || !isLayerBlank) {
            symbolTimeline.currentLayer = symbolLayerNames.length - 1;
            targetLayerIndex = symbolTimeline.addNewLayer(layerName, "normal", false);
        }
        else {
            symbolTimeline.currentLayer = targetLayerIndex;
        }
        return targetLayerIndex;
    }

    return {
        deleteLayers: deleteLayers,
        swapLayers: swapLayers,
        clearEmptyLayers: clearEmptyLayers,
        addNewLayerSafety: addNewLayerSafety,
        setParentLayer: setParentLayer,
        renameLayer: renameLayer,
        addNewLayerSafetyEx: addNewLayerSafetyEx
    };
});
