/**
 * @file: MoreElement.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 17:06
 * @project: AnJsflScript
 * @description:
 */

define(["SAT"], function (sat) {
    var Vector = sat.V;
    var wrapRectByTopLeft = sat.GLOBALS.wrapRectByTopLeft;

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
        this.Rect = wrapRectByTopLeft(element.x, element.y, element.width, element.height);
    }

    /**
     * 整齐排列元素
     * @param x 横向坐标
     * @param y 纵向坐标
     * @returns {Vector} 元素坐标
     */
    MoreElement.prototype.NeatOffset = function (x, y) {
        var offset = this.Offset.clone().scale(x, y);
        return this.positioin.clone().add(offset);
    }

    MoreElement.prototype.NeatRect = function (x, y) {
        var offset = this.Offset.clone().scale(x, y);
        var newRect = this.Rect.addOffset(offset);
        return newRect;
    }

    /**
     * 交错排列元素
     * @param x 横向坐标
     * @param y 纵向坐标
     * @returns {Vector} 元素坐标
     */
    MoreElement.prototype.StaggeredOffset = function (x, y) {
        var pos = this.NeatOffset(x, y);
        // 偶数行，实际行数减1（实际奇数行在程序中是偶数行，实际偶数行在程序中是奇数行）
        if (y % 2 !== 0) {
            pos.x += this.Offset.x / 2;
        }
        return pos;
    }

    MoreElement.prototype.StaggeredRect = function (x, y) {
        var rect = this.NeatRect(x, y);
        // 偶数行，实际行数减1（实际奇数行在程序中是偶数行，实际偶数行在程序中是奇数行）
        if (y % 2 !== 0) {
            // pos.x+=this.Offset.x/2;
            // 右移一半宽度
            var offset = new Vector(this.Offset.x / 2, 0);
            rect = rect.addOffset(offset);
        }
        return rect;
    }
    MoreElement.prototype.toString = function () {
        return "MoreElement(element=" + this.element + ", positioin=" + this.positioin + ", Offset=" + this.Offset + ", Rect=" + this.Rect + ")";
    }
    
    return MoreElement;
});