/**
 * @file: FilterOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 17:57
 * @project: AnJsflScript
 * @description:
 */

define(function() {


    /**
     * 添加滤镜到指定帧
     * 会给 该帧所在 的整个关键帧 都添加滤镜
     * @param {Layer} layer 图层对象
     * @param {Number} frameIndex 帧索引
     * @param {Number} blurX x轴模糊值
     * @param {Number} blurY y轴模糊值
     * @param {'low'|'medium'|'high'} strength 可选品质
     * @see https://gitee.com/ninge/WindowSWF/tree/master/
     */
    function addBlurFilterToFrame(
        layer,
        frameIndex,
        blurX,
        blurY,
        strength
    ) {
        //图层，第几帧，x轴数值，y轴数值，品质可选（low、medium，high）
        // 创建模糊滤镜对象
        var blurFilter = {
            name: 'blurFilter',
            enable: true,
            blurX: blurX,
            blurY: blurY,
            quality: strength
        };

        // 获取当前帧的滤镜数组，如果不存在则初始化为空数组
        var filters = layer.getFiltersAtFrame(frameIndex) || [];

        // 将新滤镜添加到数组中
        filters.push(blurFilter);

        // 将更新后的滤镜数组设置回指定帧
        layer.setFiltersAtFrame(frameIndex, filters);
    };

    /**
     * 添加滤镜到指定帧
     * 会给 该帧所在 的整个关键帧 都添加滤镜
     * @param {Layer} layer 图层对象
     * @param {Number} frameIndex 帧索引
     * @param {Object} filter 滤镜对象
     */
    function addFilterToFrame(layer, frameIndex, filter) {
        // 获取当前帧的滤镜数组，如果不存在则初始化为空数组
        var filters = layer.getFiltersAtFrame(frameIndex) || [];

        // 将新滤镜添加到数组中
        filters.push(filter);

        // 将更新后的滤镜数组设置回指定帧
        layer.setFiltersAtFrame(frameIndex, filters);
    };

    /**
     * 清除指定帧的滤镜
     * @param {Layer} layer 图层对象
     * @param {Number} frameIndex 帧索引
     * @param {String} filterName 滤镜名称，如果不指定则清除所有滤镜
     */
    function clearFilterAtFrame(layer, frameIndex, filterName) {
        var filters = layer.getFiltersAtFrame(frameIndex) || [];

        if (filterName === undefined) {
            filters = [];
        } else {
            filters = filters.filter(function(filter) {
                return filter.name !== filterName;
            });
        }
        layer.setFiltersAtFrame(frameIndex, filters);
    };
    return {
        addBlurFilterToFrame: addBlurFilterToFrame,
        addFilterToFrame: addFilterToFrame,
        clearFilterAtFrame: clearFilterAtFrame
    };
});