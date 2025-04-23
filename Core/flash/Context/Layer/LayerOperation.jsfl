/**
 * @file: LayerOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 22:32
 * @project: AnJsflScript
 * @description:
 */

define(['LayerQuery'], function(lq) {
    const { convertToLayerIndex, getEmptyLayers } = lq;

    /**
     * 删除 图层
     * @param {Timeline} timeline 时间轴
     * @param {Array.<Number>|Array.<Layer>} layers 图层索引数组
     */
    function deleteLayers(timeline, layers) {
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

        if (
            !(
                layerIndex1 >= 0 &&
                layerIndex1 < layers.length &&
                layerIndex2 >= 0 &&
                layerIndex2 < layers.length
            )
        ) {
            log.error('图层索引超出范围。');
            return;
        }

        // 如果两个索引相同，无需交换
        if (layerIndex1 === layerIndex2) {
            log.info('图层索引相同，无需交换。');
            return;
        }

        // 交换图层顺序
        timeline.reorderLayer(layerIndex1, layerIndex2);
        timeline.reorderLayer(layerIndex2, layerIndex1);

        log.info(
            'layerUtil.js:图层%d(%s)和图层%d(%s)交换成功。',
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
        // fl.outputPanel.clear();
        // doc.save();

        emptyLayers.reverse();
        emptyLayers.forEach(function(layerIndex) {
            timeline.deleteLayer(layerIndex);
        });

        // alert(`已删除 ${emptyLayers.length} 个空白图层`);
        console.info('已删除 %d 个空白图层', emptyLayers.length);
    };


    return {
        deleteLayers: deleteLayers,
        swapLayers: swapLayers,
        clearEmptyLayers: clearEmptyLayers
    };
});
