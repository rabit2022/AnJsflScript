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
 * @class {Point} Point
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

/**
 * 除法
 * @param {number} num 除数
 * @returns {Point}
 */
Point.prototype.div = function (num) {
    return new Point(this.x / num, this.y / num);
}


/**
 * 取负
 * @returns {Point}
 */
Point.prototype.neg = function () {
    return new Point(-this.x, -this.y);
}

Point.prototype.center = function () {
    return new Point(this.x / 2, this.y / 2);
}

/**
 * 四舍五入
 * @returns {Point}
 */
Point.prototype.toIntPonit = function () {
    return new Point(Math.round(this.x), Math.round(this.y));
}

/**
 * timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);
 * 要求x,y必须为非0的整数
 * @returns {Point}
 */
Point.prototype.noZero = function () {
    var point = wrapPoint(this);
    if (point.x === 0) {
        point.x = 1;
    }
    if (point.y === 0) {
        point.y = 1;
    }
    return point;
}


/**
 * 判断是否  在 另一个点 的 某个方向上
 * @param {Point} point 另一个点
 * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner 方向
 * @returns {boolean}
 */
Point.prototype.IsAtDirection = function (point, whichCorner) {
    switch (whichCorner) {
        case "top right":
            return this.x > point.x && this.y > point.y;
        case "top left":
            return this.x < point.x && this.y > point.y;
        case "bottom right":
            return this.x > point.x && this.y < point.y;
        case "bottom left":
            return this.x < point.x && this.y < point.y;
        case "top center":
            return this.y > point.y;
        case "right center":
            return this.x > point.x;
        case "bottom center":
            return this.y < point.y;
        case "left center":
            return this.x < point.x;
        case "center":
            return this.x === point.x && this.y === point.y;
        default:
            // return false;
            throw new Error("whichCorner is not valid!");
    }
}


/**
 * 字符串
 * @returns {string}
 */
Point.prototype.toString = function () {
    return "Point: " + this.x + " " + this.y;
}

/**
 * 转换为对象
 * @return {{x:number,y:number}}
 */
Point.prototype.toObj = function () {
    return {x: this.x, y: this.y};
}

/**
 * 转换为Point对象
 * @param {{x:number,y:number}|Element|Point} element 点对象
 * @return {Point}
 */
function wrapPoint(element) {
    return new Point(element.x, element.y);
}

/**
 * 取零点
 * @returns {Point}
 */
function getZeroPoint() {
    return new Point(0, 0);
}
