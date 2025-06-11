/**
 * @file: MoreElement.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 17:06
 * @project: AnJsflScript
 * @description:
 */

define(["SAT", "sprintf-js"], function (sat, sp) {
    var Vector = sat.V;
    var wrapRectByTopLeft = sat.GLOBALS.wrapRectByTopLeft;
    const sprintf = sp.sprintf;

    /**
     * 排兵布阵类
     * @param {Element} element 要布阵的元素
     * @param {number} [horizontalSpacing=1] 横向间隔，单位为身位宽度
     * @param {number} [verticalSpacing=1] 纵向间隔，单位为身位高度
     * @constructor
     * @class {MoreElement} MoreElement
     */
    function MoreElement(element, horizontalSpacing, verticalSpacing) {
        this.element = element;
        // console.log(element);
        // console.stack(element);
        this.positioin = new Vector(element.x, element.y);

        if (horizontalSpacing === undefined) {
            horizontalSpacing = 1;
        }
        if (verticalSpacing === undefined) {
            verticalSpacing = 1;
        }
        var offsetX = element.width * horizontalSpacing;
        var offsetY = element.height * verticalSpacing;

        this.Offset = new Vector(offsetX, offsetY);

        // x,y作为左上角坐标
        this.Rect = wrapRectByTopLeft(
            element.x,
            element.y,
            element.width,
            element.height
        );
    }

    /**
     * 排列模式枚举
     * @enum {string} MODES
     */
    MoreElement.MODES = {
        NEAT: "neat", // 整齐排列
        STAGGERED: "staggered" // 交错排列
        // RANDOM: "random",      // 随机排列

        // 后续可能实现
        // SPIRAL: "spiral",      // 螺旋排列
        // GRID: "grid",          // 网格排列
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
