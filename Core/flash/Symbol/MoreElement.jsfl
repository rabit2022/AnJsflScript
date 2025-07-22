/**
 * @file: MoreElement.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 17:06
 * @project: AnJsflScript
 * @description:
 */

define(["SAT", "sprintf-js", "ElementSelect", "overload-js"], function (
    sat,
    sp,
    es,
    overload
) {
    var wrapRectByTopLeft = sat.GLOBALS.wrapRectByTopLeft;
    const { Vector, Scale } = sat;
    const getSymbolSize = sat.ENTITY.SYMBOL.getSize;

    const sprintf = sp.sprintf;

    const { OnlySelectCurrent } = es;

    const { T_Element, T_Vector } = sat.TYPES;

    /**
     * 排兵布阵类
     * @param {Element} element 要布阵的元素
     * @param {number} [horizontalSpacing=1] 横向间隔，单位为身位宽度
     * @param {number} [verticalSpacing=1] 纵向间隔，单位为身位高度
     * @constructor
     * @class {MoreElement} MoreElement
     */
    function _MoreElement(element, horizontalSpacing, verticalSpacing) {
        this.element = element;
        this.positioin = new Vector(element.x, element.y);

        // 用 overload 解析后的值一定落在 h, v 两个局部变量里
        var h = horizontalSpacing;
        var v = verticalSpacing;

        // 兜底默认值
        if (h === undefined) h = 1;
        if (v === undefined) v = 1;

        this.moveDirection = new Vector(h, v);

        var originSize = getSymbolSize(element);
        this.Offset = originSize.toVector().scale(h, v);

        // x,y作为左上角坐标
        this.Rect = wrapRectByTopLeft(
            element.x,
            element.y,
            element.width,
            element.height
        );
    }

    /* 2. ES5 重载构造函数 */
    var MoreElement = overload()
        /* (Element, Number, Number) */
        .args(T_Element, Number, Number)
        .use(function (element, h, v) {
            // console.log(h, v);
            return new _MoreElement(element, h, v);
        })
        /* (Element, Vector) */
        .args(T_Element, T_Vector)
        .use(function (element, vec) {
            // console.log(vec.x, vec.y);
            return new _MoreElement(element, vec.x, vec.y);
        })
        /* (Element) —— 默认参数 */
        .args(T_Element)
        .use(function (element) {
            // console.log("just use default");
            return new _MoreElement(element, 1, 1);
        })
        /* 暴露干净函数 */
        .expose();

    MoreElement.prototype = _MoreElement.prototype;

    /**
     * 排列模式枚举
     * @enum {string} MODES
     */
    MoreElement.MODES = {
        NEAT: "neat", // 整齐排列
        STAGGERED: "staggered", // 交错排列
        RANDOM: "random", // 随机排列
        GRID: "grid", // 网格排列
        PERSPECTIVE: "perspective" // 透视排列

        // 后续可能实现
        // SPIRAL: "spiral",      // 螺旋排列
        // HEXAGONAL: "hexagonal", // 蜂窝排列
        // CIRCULAR: "circular",  // 圆形排列
        // DIAGONAL: "diagonal",  // 对角线排列
        // ZIGZAG: "zigzag",      // Z 字形排列
        // FREEFORM: "freeform"   // 自由排列
    };

    /**
     * 根据模式计算偏移量
     * @param {number} x - 横向坐标
     * @param {number} y - 纵向坐标
     * @param {string} mode - 排列模式（MoreElement.MODES.NEAT 或 MoreElement.MODES.STAGGERED）
     * @returns {Vector} 计算后的偏移量
     * @private
     */
    MoreElement.prototype._getOffset = function (x, y, mode) {
        var offset = this.Offset.clone().scale(x, y);

        // 根据模式调整偏移量
        switch (mode) {
            case MoreElement.MODES.STAGGERED:
                if (y % 2 !== 0) {
                    // 偶数行，实际行数减1（实际奇数行在程序中是偶数行，实际偶数行在程序中是奇数行）
                    offset.x += this.Offset.x / 2; // 交错排列时，奇数行向右偏移一半宽度
                }
                break;
            case MoreElement.MODES.NEAT:
                // 整齐排列无需额外调整
                break;
            default:
                // 对于未知模式，抛出错误
                throw new Error(
                    'Unknown mode: "' +
                        mode +
                        '". Valid modes are: "' +
                        MoreElement.MODES.NEAT +
                        '" or "' +
                        MoreElement.MODES.STAGGERED +
                        '"'
                );
        }

        return offset;
    };

    /**
     * 根据模式计算矩形位置
     * @param {number} x - 横向坐标
     * @param {number} y - 纵向坐标
     * @param {string} mode - 排列模式（MoreElement.MODES.NEAT 或 MoreElement.MODES.STAGGERED）
     * @returns {Rect} 计算后的矩形位置
     * @private
     */
    MoreElement.prototype._getRect = function (x, y, mode) {
        var rect = this.Rect.clone();
        var offset = this._getOffset(x, y, mode);
        return rect.addOffset(offset);
    };

    /**
     * 计算整齐排列的偏移位置
     * @param {number} x - 横向坐标
     * @param {number} y - 纵向坐标
     * @returns {Vector} 最终的偏移位置
     */
    MoreElement.prototype.NeatOffset = function (x, y) {
        // 获取整齐排列的偏移量
        var baseOffset = this._getOffset(x, y, MoreElement.MODES.NEAT);

        // 计算最终位置：初始位置 + 基础偏移量
        var finalPosition = this.positioin.clone().add(baseOffset);

        return finalPosition;
    };

    /**
     * 计算整齐排列的矩形位置
     * @param {number} x - 横向坐标
     * @param {number} y - 纵向坐标
     * @returns {Rect} 最终的矩形位置
     */
    MoreElement.prototype.NeatRect = function (x, y) {
        // 获取整齐排列的矩形
        var neatRect = this._getRect(x, y, MoreElement.MODES.NEAT);

        return neatRect;
    };

    /**
     * 计算交错排列的偏移位置
     * @param {number} x - 横向坐标
     * @param {number} y - 纵向坐标
     * @returns {Vector} 最终的偏移位置
     */
    MoreElement.prototype.StaggeredOffset = function (x, y) {
        // 获取交错排列的偏移量
        var staggeredOffset = this._getOffset(x, y, MoreElement.MODES.STAGGERED);

        // 计算最终位置：初始位置 + 交错偏移量
        var finalPosition = this.positioin.clone().add(staggeredOffset);

        return finalPosition;
    };

    /**
     * 计算交错排列的矩形位置
     * @param {number} x - 横向坐标
     * @param {number} y - 纵向坐标
     * @returns {Rect} 最终的矩形位置
     */
    MoreElement.prototype.StaggeredRect = function (x, y) {
        // 获取交错排列的矩形
        var staggeredRect = this._getRect(x, y, MoreElement.MODES.STAGGERED);

        return staggeredRect;
    };

    // region  perspective
    MoreElement.prototype.PerspectiveOffset = function (x, y, horizontalCount) {
        var neatOffset = this.NeatOffset(x, y);

        var horizontalSpacing = this.moveDirection.x;
        var verticalSpacing = this.moveDirection.y;

        var itemWidth = this.element.width;

        var offsetX = getOffset(horizontalCount, horizontalSpacing, itemWidth, x, y);
        var offset = new Vector(offsetX, 0);

        return neatOffset.add(offset);
    };

    MoreElement.prototype.PerspectiveScale = function (x, y, horizontalCount) {
        function getScaleFactor(horizontalCount, verticalj) {
            // scale = 1 + Factor * horizontalCount * verticalj
            // horizontalCount ,verticalj
            // 8,1    1.12
            return 1 + 0.015 * horizontalCount * verticalj;
        }

        var scaleFactor = getScaleFactor(horizontalCount, y);
        return new Scale(scaleFactor, scaleFactor);
    };

    function getOffset(horizontalCount, horizontalSpacing, itemWidth, i, j) {
        // 80
        var Factor = 0.013;
        // 相关参数，正比例
        var relatedParam = horizontalCount * horizontalSpacing * itemWidth; //1551.36
        // i:           0,1,2,3,4,5,6,7
        // offsetX:     -4,-3,-2,-1,0,1,2,3
        var dymaticParam = (i - horizontalCount / 2) * j; // -4
        // 向左移动
        var offsetX = Factor * relatedParam * dymaticParam;
        return offsetX;
    }

    // endregion perspective
    /**
     * 网格式的排列，接口有所不同，输入 direction
     * @param {Vector} direction - 网格方向
     */
    MoreElement.prototype.gridSelection = function () {
        var doc = fl.getDocumentDOM();

        OnlySelectCurrent(this.element);
        // console.log(this.element.libraryItem.name,this.Offset);

        doc.duplicateSelection();

        // 等价与
        // doc.clipCopy();
        // doc.clipPaste(true);

        doc.moveSelectionBy(this.Offset);

        var scale = this.moveDirection.signPow().toScale();
        doc.scaleSelection(scale.scaleX, scale.scaleY);
    };

    MoreElement.prototype.toString = function () {
        return sprintf(
            "MoreElement(element=%s, positioin=%s, Offset=%s, Rect=%s)",
            this.element,
            this.positioin,
            this.Offset,
            this.Rect
        );
    };

    MoreElement.toString = function () {
        return "[object MoreElement]";
    };

    return MoreElement;
});
