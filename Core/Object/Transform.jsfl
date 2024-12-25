/**
 * @file: Transform.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 17:52
 * @project: AnJsflScript
 * @description:
 */

/**
 * 转换对象
 * @param element 要转换的对象
 * @constructor
 * @class Transform
 */
function Transform(element) {
    this.element = element;
    // 旋转
    this.rotation = element.rotation;
    // 缩放
    this.scale = new Point(element.scaleX, element.scaleY);
    // 位置
    this.position = new Point(element.x, element.y);
    // 宽高
    this.size = new Size(element.width, element.height);
    // 倾斜
    this.skew = new Point(element.skewX, element.skewY);
}

Transform.prototype.setRotation = function (rotation) {
    this.element.rotation = rotation;
    this.rotation = rotation;
    return this;
}
/**
 * 设置缩放
 * @param {Point} scale 缩放比例
 * @return {Transform} Transform
 */
Transform.prototype.setScale = function (scale) {
    this.element.scaleX = scale.x;
    this.element.scaleY = scale.y;
    this.scale = scale;
    return this;
}
Transform.prototype.setPosition = function (position) {
    this.element.x = position.x;
    this.element.y = position.y;
    this.position = position;
    return this;
}
Transform.prototype.setSize = function (size) {
    this.element.width = size.width;
    this.element.height = size.height;
    this.size = size;
    return this;
}
Transform.prototype.setSkew = function (skew) {
    this.element.skewX = skew.x;
    this.element.skewY = skew.y;
    this.skew = skew;
    return this;
}

Transform.prototype.toString = function () {
    return "Transform(rotation=" + this.rotation + ", scale=" + this.scale + ", position=" + this.position + ", size=" + this.size + ", skew=" + this.skew + ")";
}

/**
 * 包装一个对象为Transform对象
 * @param {Element} element 要包装的对象
 * @return {Transform} Transform
 */
function wrapTransform(element) {
    return new Transform(element);
}
