/**
 * @file: LayerList.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/20 12:55
 * @project: AnJsflScript
 * @description:
 */

/**
 *
 * class list(object):
 *     """
 *     Built-in mutable sequence.
 *
 *     If no argument is given, the constructor creates a new empty list.
 *     The argument must be an iterable if specified.
 *     """
 *     def append(self, *args, **kwargs): # real signature unknown
 *         """ Append object to the end of the list. """
 *         pass
 *
 *     def clear(self, *args, **kwargs): # real signature unknown
 *         """ Remove all items from list. """
 *         pass
 *
 *     def copy(self, *args, **kwargs): # real signature unknown
 *         """ Return a shallow copy of the list. """
 *         pass
 *
 *     def count(self, *args, **kwargs): # real signature unknown
 *         """ Return number of occurrences of value. """
 *         pass
 *
 *     def extend(self, *args, **kwargs): # real signature unknown
 *         """ Extend list by appending elements from the iterable. """
 *         pass
 *
 *     def index(self, *args, **kwargs): # real signature unknown
 *         """
 *         Return first index of value.
 *
 *         Raises ValueError if the value is not present.
 *         """
 *         pass
 *
 *     def insert(self, *args, **kwargs): # real signature unknown
 *         """ Insert object before index. """
 *         pass
 *
 *     def pop(self, *args, **kwargs): # real signature unknown
 *         """
 *         Remove and return item at index (default last).
 *
 *         Raises IndexError if list is empty or index is out of range.
 *         """
 *         pass
 *
 *     def remove(self, *args, **kwargs): # real signature unknown
 *         """
 *         Remove first occurrence of value.
 *
 *         Raises ValueError if the value is not present.
 *         """
 *         pass
 *
 *     def reverse(self, *args, **kwargs): # real signature unknown
 *         """ Reverse *IN PLACE*. """
 *         pass
 *
 *     def sort(self, *args, **kwargs): # real signature unknown
 *         """
 *         Sort the list in ascending order and return None.
 *
 *         The sort is in-place (i.e. the list itself is modified) and stable (i.e. the
 *         order of two equal elements is maintained).
 *
 *         If a key function is given, apply it once to each list item and sort them,
 *         ascending or descending, according to their function values.
 *
 *         The reverse flag can be set to sort in descending order.
 *         """
 *         pass
 */
define(function () {
    function LayerList(timeline) {
        this.timeline = timeline;
        this.layers = timeline.layers;
    }

    /**
     * @description: 添加一个图层
     * @param {string} [layerName] 图层名称
     * @param {"normal"|"guide"|"guided"|"mask"|"masked"|"folder"} [layerType] 图层类型
     * @return {void}
     */
    LayerList.prototype.append = function (layerName, layerType) {
        this.timeline.currentLayer = this.layers.length - 1;
        this.timeline.addNewLayer(layerName || "", layerType || "", true);
    };

    return LayerList;
});
