/**
 * @file: FilterQuery.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 17:56
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    function getFilterByName(layer, frameIndex, filterName) {
        // 获取当前帧的滤镜数组，如果不存在则初始化为空数组
        var filters = layer.getFiltersAtFrame(frameIndex) || [];
        // 遍历滤镜数组，查找指定名称的滤镜
        for (var i = 0; i < filters.length; i++) {
            if (filters[i].name === filterName) {
                return filters[i];
            }
        }
        return null;
    }
    return {
        getFilterByName: getFilterByName
    };
});
