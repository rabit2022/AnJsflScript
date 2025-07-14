/**
 * @file: LayerSelect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/14 22:19
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    function SelectAllLayers(timeline, layers) {
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var soundLayerIndex = layers_1[_i];
            if (soundLayerIndex === layers[0]) {
                timeline.setSelectedLayers(soundLayerIndex, true);
                continue;
            }
            timeline.setSelectedLayers(soundLayerIndex, false);
        }
    }

    return {
        SelectAllLayers: SelectAllLayers
    };
});
