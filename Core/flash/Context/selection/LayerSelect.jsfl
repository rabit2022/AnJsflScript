/**
 * @file: LayerSelect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/14 22:19
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 选中所有图层
     * @param {Timeline} timeline 时间轴对象
     * @param {number[]} layers 图层数组
     */
    function SelectAllLayers(timeline, layers) {
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var soundLayerIndex = layers_1[_i];

            // 第一个图层
            if (soundLayerIndex === layers[0]) {
                timeline.setSelectedLayers(soundLayerIndex, true);
                continue;
            }

            // 其他图层
            timeline.setSelectedLayers(soundLayerIndex, false);
        }
    }

    return {
        SelectAllLayers: SelectAllLayers
    };
});
