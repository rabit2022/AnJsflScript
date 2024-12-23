/**
 * @file: Rect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:23
 * @project: AnJsflScript
 * @description:
 */


// {left:number,top:number,right:number,bottom:number}
/**
 * 矩形
 * @param {number} left 左边
 * @param {number} top 上边
 * @param {number} right 右边
 * @param {number} bottom 下边
 * @constructor
 * @class {Rect}
 */
function Rect(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;

    this.width = this.right - this.left;
    this.height = this.bottom - this.top;
}

/**
 * 矩形 偏移后的 矩形
 * 移动矩形的边界
 * @param {Point} offset 偏移量
 * @returns {Rect} 矩形
 */
Rect.prototype.addOffset = function (offset) {
    return new Rect(this.left + offset.x, this.top + offset.y, this.right + offset.x, this.bottom + offset.y);
}
/**
 * 矩形 偏移前的 矩形
 * 移动矩形的边界
 * @param {Point} offset 偏移量
 * @returns {Rect} 矩形
 */
Rect.prototype.subOffset = function (offset) {
    return new Rect(this.left - offset.x, this.top - offset.y, this.right - offset.x, this.bottom - offset.y);
}
/**
 * 矩形相加
 * 扩展  矩形的边界
 * @param {Rect} rect 矩形
 * @returns {Rect} 矩形
 */
Rect.prototype.add = function (rect) {
    return new Rect(this.left + rect.left, this.top + rect.top, this.right + rect.right, this.bottom + rect.bottom);
}

/**
 * 矩形相减
 * 小矩形的边界   与   大矩形的边界  的距离
 * @param {Rect} rect 矩形
 * @returns {Rect} 矩形
 */
Rect.prototype.sub = function (rect) {
    return new Rect(this.left - rect.left, this.top - rect.top, this.right - rect.right, this.bottom - rect.bottom);
}

/**
 * 矩形中心点
 * @returns {Point} 点
 */
Rect.prototype.center = function () {
    return new Point((this.left + this.right) / 2, (this.top + this.bottom) / 2);
}

/**
 * 是否包含,当前矩形 是否 在 目标矩形 内部
 * @param {Rect} rect 矩形
 * @returns {boolean} 包含返回true，否则返回false
 */
Rect.prototype.contains = function (rect) {
    return this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom;
}

/**
 * 获取矩形的某个角点
 * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner whichCorner 角点
 * @returns {Point} 点
 */
Rect.prototype.getCorner = function (whichCorner) {
    switch (whichCorner) {
        case "top right":
            return new Point(this.right, this.top);
        case "top left":
            return new Point(this.left, this.top);
        case "bottom right":
            return new Point(this.right, this.bottom);
        case "bottom left":
            return new Point(this.left, this.bottom);
        case "top center":
            return new Point((this.left + this.right) / 2, this.top);
        case "right center":
            return new Point(this.right, (this.top + this.bottom) / 2);
        case "bottom center":
            return new Point((this.left + this.right) / 2, this.bottom);
        case "left center":
            return new Point(this.left, (this.top + this.bottom) / 2);
        case "center":
            return new Point((this.left + this.right) / 2, (this.top + this.bottom) / 2);
        default:
            // return new Point(0,0);
            throw new Error("whichCorner 参数错误");
    }
}

/**
 * 字符串
 * @returns {string} 字符串
 */
Rect.prototype.toString = function () {
    return "Rect(left=" + this.left + ", top=" + this.top + ", right=" + this.right + ", bottom=" + this.bottom+ ")";
}

/**
 * 转换为对象
 * @returns {{left:number,top:number,right:number,bottom:number}} 矩形对象
 */
Rect.prototype.toObj = function () {
    return {left: this.left, top: this.top, right: this.right, bottom: this.bottom};
}

/**
 * 转换为矩形对象
 * @param {{left:number,top:number,right:number,bottom:number}|Rect} rect 矩形对象
 * @returns {Rect} 矩形
 */
function wrapRect(rect) {
    return new Rect(rect.left, rect.top, rect.right, rect.bottom);
}

function wrapRectByTopLeft(left, top, width, height){
    return new Rect(left, top, left + width, top + height);
}

function wrapRectByCenter(centerX, centerY, width, height){
    return new Rect(centerX - width/2, centerY - height/2, centerX + width/2, centerY + height/2);
}

function wrapRectByElement(element){
    var topLeft = getTopLeft(element);
    var size = wrapSize(element);
    return new Rect(topLeft.x, topLeft.y, topLeft.x + size.width, topLeft.y + size.height);
}
