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

    // 考虑局部，layers指定的情况
    /**
     * @description: 图层列表类
     * @param {Timeline} [timeline] 时间线
     * @param {"selected"|"all"} [mode] 图层模式
     * @return {LayerList}
     */
    function LayerList(timeline, mode) {
        var doc = fl.getDocumentDOM();
        this.timeline = timeline || doc.getTimeline();

        this._mode = mode || "all";
    }

    /**
     * @description: 图层列表
     * @note 方便 更新 layers 列表
     * @type {Array}
     * @readonly
     */
    Object.defineProperty(LayerList.prototype, "layers", {
        get: function () {
            switch (this._mode) {
                case "selected":
                    var selectedLayers = this.timeline.getSelectedLayers();
                    var globalLayers = this.timeline.layers;
                    var layers = selectedLayers.map(function (layer) {
                        return globalLayers[layer];
                    });
                    return layers;
                case "all":
                    return this.timeline.layers;
                default:
                    throw new Error("Invalid mode: " + this._mode);
            }
        }
    });

    /**
     * @description: 添加一个图层
     * @param {string} [layerName] 图层名称
     * @param {"normal"|"guide"|"guided"|"mask"|"masked"|"folder"} [layerType] 图层类型
     * @return {number}
     */
    LayerList.prototype.append = function (layerName, layerType) {
        var globalEndIndex = this.f(this.layers.length - 1);
        this.timeline.currentLayer = globalEndIndex;

        // 添加新图层
        var newLayerIndex = this.timeline.addNewLayer(
            layerName || undefined,
            layerType || "normal",
            false
        );

        // // 维护layers列表
        // var newLayer = this.timeline.layers[newLayerIndex];
        // this.layers.push(newLayer);

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
                    var global_i = this.f(i);
                    var global_j = this.f(j);

                    swapLayers(this.timeline, global_i, global_j);
                }
            }
        }
    };

    LayerList.prototype.reverse = function () {
        for (var i = 0; i < this.layers.length / 2; i++) {
            var from = this.f(i);
            var to = this.f(this.layers.length - 1 - i);

            swapLayers(this.timeline, from, to);
        }
    };

    /**
     * @description: 图层索引转换
     * @note local -> global
     *       this.layers   ->    this.timeline.layers
     * @param {Array} layers 图层列表
     * @param {Layer} toMoveLayer 待移动图层
     * @return {number} 全局图层索引
     */
    LayerList.prototype.f = function (toMoveArrIndex) {
        var toMoveLayer = this.layers[toMoveArrIndex];

        var globalLayers = this.timeline.layers;
        var toMoveLayerIndex = globalLayers.indexOf(toMoveLayer);
        return toMoveLayerIndex;
    };

    /**
     * @description: 插入一个图层
     * @param {number} index 插入位置
     * @param {string} [layerName] 图层名称
     * @param {"normal"|"guide"|"guided"|"mask"|"masked"|"folder"} [layerType] 图层类型
     * @return {number}
     */
    LayerList.prototype.insert = function (index, layerName, layerType) {
        // 选中目标图层
        var globalIndex = this.f(index);
        this.timeline.currentLayer = globalIndex;

        // 添加新图层
        var newLayerIndex = this.timeline.addNewLayer(
            layerName || "",
            layerType || "normal",
            true
        );

        return newLayerIndex;
    };

    return LayerList;
});
