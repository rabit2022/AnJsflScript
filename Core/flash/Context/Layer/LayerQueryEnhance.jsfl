/**
 * @file: LayerQueryEnhance.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/29 21:51
 * @project: AnJsflScript
 * @description:
 */

define([
    "FolderQuery",
    "LayerHierarchy",
    "FolderChecker",
    "LayerChecker",
    "Tips"
], function (fq, lh, fc, lc, Tips) {
    const { IGNORE_LAYER_BY_NAME, FOLDER_TYPE } = fq;
    const { countChild } = lh;
    const { IsEmptyFolder } = fc;
    const { IsLayerBlank } = lc;
    const { checkVariableRedeclaration } = Tips;

    // 静态方法：获取空白图层的索引列表
    /**
     * 获取空白图层的索引列表
     * @param {Timeline} timeline 时间线对象
     * @return {Array.<Number>} 空白图层的索引列表
     * @see https://github.com/hufang360/FlashTool
     */
    function getEmptyLayers(timeline) {
        checkVariableRedeclaration(timeline, "timeline");

        const total = timeline.layers.length;
        const emptyLayers = [];

        for (var i = 0; i < total; i++) {
            const layer = timeline.layers[i];
            // 忽略特定名称的图层
            if (IGNORE_LAYER_BY_NAME.test(layer.name)) {
                continue;
            }

            if (FOLDER_TYPE.test(layer.layerType)) {
                // 检查文件夹是否为空
                if (IsEmptyFolder(timeline, i)) {
                    emptyLayers.push(i);
                    i += countChild(timeline, i);
                }
            } else {
                // 检查普通图层是否为空
                if (IsLayerBlank(layer)) {
                    emptyLayers.push(i);
                }
            }
        }

        return emptyLayers;
    }

    return {
        getEmptyLayers: getEmptyLayers
    };
});
