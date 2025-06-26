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
define(["LayerOperation"], function (lo) {
    const { swapLayers } = lo;

    // todo:考虑局部，layers指定的情况

    function LayerList(timeline, layers) {
        // this.context = context;
        // this.timeline = context.timeline;

        var doc = fl.getDocumentDOM();
        this.timeline = timeline || doc.getTimeline();

        /**
         * @description: 图层列表
         * @type {Layer[]}
         */
        this.layers = layers || this.timeline.layers;
        // this.update();

        this.origionalLayers = this.timeline.layers;
    }

    /**
     * @description: 添加一个图层
     * @param {string} [layerName] 图层名称
     * @param {"normal"|"guide"|"guided"|"mask"|"masked"|"folder"} [layerType] 图层类型
     * @return {number}
     */
    LayerList.prototype.append = function (layerName, layerType) {
        // console.log("LayerList.append", this.layers.length - 1,this.f(this.layers.length - 1));
        this.timeline.currentLayer = this.layers.length - 1;

        // 添加新图层
        var newLayerIndex = this.timeline.addNewLayer(
            layerName || "",
            layerType || "",
            false
        );

        // 维护layers列表
        var newLayer = this.timeline.layers[newLayerIndex];
        this.layers.push(newLayer);

        return newLayerIndex;
    };

    // sort
    /**
     * @description: 排序图层
     * @param {function(Layer,Layer)} compareFn 比较函数 1:layer1>layer2,-1:layer1<layer2,0:layer1=layer2
     * @param {boolean} [reverse] 是否倒序
     * @return {void}
     */
    LayerList.prototype.sort = function (compareFn) {
        for (var i = 0; i < this.layers.length; i++) {
            for (var j = i + 1; j < this.layers.length; j++) {
                if (compareFn(this.layers[i], this.layers[j]) > 0) {
                    swapLayers(this.timeline, i, j);

                    // 维护layers
                    swapLayersArray(this.layers, i, j);
                }
            }
        }
    };

    function swapLayersArray(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    LayerList.prototype.reverse = function () {
        for (var i = 0; i < this.layers.length / 2; i++) {
            var from = this.f(i);
            var to = this.f(this.layers.length - 1 - i);

            swapLayers(this.timeline, from, to);
        }

        // 维护layers
        reverseArr(this.layers);
    };

    // this.layers   ->    this.timeline.layers
    LayerList.prototype.f = function (toMoveArrIndex) {
        var toMoveLayer = this.layers[toMoveArrIndex];
        var toMoveLayerIndex = this.origionalLayers.indexOf(toMoveLayer);
        return toMoveLayerIndex;
    };

    function reverseArr(arr) {
        var len = arr.length;
        for (var i = 0; i < len / 2; i++) {
            swapLayersArray(arr, i, len - 1 - i);
        }
        return arr;
    }

    return LayerList;
});
