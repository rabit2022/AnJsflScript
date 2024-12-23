/**
 * @file: Size.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 17:28
 * @project: AnJsflScript
 * @description:
 */


/**
 * 尺寸
 * @param {number} width 宽度
 * @param {number} height 高度
 * @constructor
 * @class {Size} Size
 */
function Size(width, height) {
    this.width = width;
    this.height = height;

    this.max = Math.max(width, height);
    this.min = Math.min(width, height);
    this.ratio = width / height;
}

Size.prototype.getRatioWidth = function () {
    return this.ratio * this.height;
}

Size.prototype.getRatioHeight = function () {
    return this.width / this.ratio;
}

Size.prototype.toString = function () {
    return "Size(" + this.width + ", " + this.height+ ")";
}

Size.prototype.toObj = function () {
    return {width: this.width, height: this.height};
}

Size.prototype.toPoint = function () {
    return new Point(this.width, this.height);
}
function wrapSize(element) {
    return new Size(element.width, element.height);
}