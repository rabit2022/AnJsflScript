/**
 * @file: LayerHierarchy.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 23:58
 * @project: AnJsflScript
 * @description:
 */

define(['LayerQuery'], function (lq) {
    // convertToLayer
    const { convertToLayer } = lq;

    // 静态方法：计算子图层数量
    /**
     * 计算子图层数量
     * @param {Timeline} timeline 时间轴对象
     * @param {number} fatherID 父图层ID
     * @param {boolean} noDeep 是否不递归计算子图层数量，默认为false
     * @return {number} 子图层数量
     * @see https://github.com/hufang360/FlashTool
     */
    function countChild(timeline, fatherID, noDeep) {
        if (noDeep === undefined) noDeep = false;

        var nextLayerIndex = fatherID + 1;
        const totalLayers = timeline.layers.length;

        while (nextLayerIndex < totalLayers) {
            const childLayer = timeline.layers[nextLayerIndex];
            if (!childLayer || !childLayer.parentLayer) break;

            if (noDeep) {
                const father = timeline.layers[fatherID];
                if (childLayer.parentLayer !== father) break;
            } else {
                if (!IsMyChild(timeline, fatherID, nextLayerIndex)) break;
            }

            nextLayerIndex++;
        }

        return nextLayerIndex - fatherID - 1;
    }

    // 静态方法：检查父子关系
    /**
     * 检查父子关系
     * @param {Timeline} timeline 时间轴对象
     * @param {Layer|number} father 父图层ID或对象
     * @param {Layer|number} child 子图层ID或对象
     * @return {boolean} 是否是父子关系
     */
    function IsMyChild(timeline, father, child) {
        // if (typeof father === 'number') father = timeline.layers[father];
        // if (typeof child === 'number') child = timeline.layers[child];
        var layers = timeline.layers;
        father = convertToLayer(layers, father);
        child = convertToLayer(layers, child);

        if (!child || !child.parentLayer) return false;
        if (child.parentLayer === father) return true;

        return IsMyChild(timeline, father, child.parentLayer);
    }
    return {
        countChild: countChild,
        IsMyChild: IsMyChild
    };
});
