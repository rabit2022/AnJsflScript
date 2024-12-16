/**
 * @file: MyClass.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:21
 * @project: WindowSWF-master
 * @description:
 */


/**
 * 定义一个点类
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @constructor
 * @class {Point}
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


/**
 * 加法，两个点的坐标的和
 * @param {Point} point 另一个点
 * @returns {Point}
 */
Point.prototype.add = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
}

/**
 * 减法，两个点的坐标的差
 * @param {Point} point 另一个点
 * @returns {Point}
 */
Point.prototype.sub = function (point) {
    return new Point(this.x - point.x, this.y - point.y);
}

// 除法
/**
 * 除法，两个点的坐标的商
 * @param {number} num 除数
 * @returns {Point}
 */
Point.prototype.div = function (num) {
    return new Point(this.x / num, this.y / num);
}

// round
/**
 * 四舍五入
 * @returns {Point}
 */
Point.prototype.toIntPonit = function () {
    return new Point(Math.round(this.x), Math.round(this.y));
}

// >
/**
 * 判断是否  在 另一个点 的右下方
 * @param {Point} point 另一个点
 * @returns {boolean}
 */
Point.prototype.greater = function (point) {
    return this.x > point.x && this.y > point.y;
}

Point.prototype.toString = function () {
    return "Point: " + this.x + " " + this.y;
}
/**
 * 转换为对象
 * @return {{x:number,y:number}}
 */
Point.prototype.toObj = function() {
    return {x: this.x, y: this.y};
}

// 负
Point.prototype.neg = function () {
    return new Point(-this.x, -this.y);
}

/**
 * 转换为对象
 * @param {{x:number,y:number}} obj 点对象
 * @return {Point}
 */
function wrapPoint(obj) {
    return new Point(obj.x, obj.y);
}

function getZeroPoint() {
    return new Point(0, 0);
}


