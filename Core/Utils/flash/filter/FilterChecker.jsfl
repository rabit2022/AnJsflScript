/**
 * @file: FilterChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 17:56
 * @project: AnJsflScript
 * @description:
 */
define(function() {


    /**
     * 判断指定元素是否有滤镜
     * @param {Element} element 元素对象
     * @return {Boolean} 是否有滤镜
     */
    function hasFilter(element) {
        var filters = element.filters;
        if (filters === null || filters === undefined) return false;
        return filters.length > 0;
    };

    return {
        hasFilter: hasFilter
    };
});