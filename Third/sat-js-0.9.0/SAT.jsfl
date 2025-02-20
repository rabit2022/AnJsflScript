// Version 0.9.0 - Copyright 2012 - 2021 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.
/** @preserve SAT.js - Version 0.9.0 - Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

/*global define: false, module: false*/
/*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true,
  eqeqeq:true, bitwise:true, strict:true, undef:true,
  curly:true, browser:true */

// Create a UMD wrapper for SAT. Works in:
//
//  - Plain browser via global SAT variable
//  - AMD loader (like require.js)
//  - Node.js
//
// The quoted properties all over the place are used so that the Closure Compiler
// does not mangle the exposed API in advanced mode.
/**
 * @param {*} root - The global scope
 * @param {Function} factory - Factory that creates SAT module
 */
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define['amd']) {
        define(factory);
    } else if (typeof exports === 'object') {
        module['exports'] = factory();
    } else {
        root['SAT'] = factory();
    }
}(this, function () {
    "use strict";

    var SAT = {};
    var SAT_GLOBALS = {};

    //
    // ## Vector
    //
    // Represents a vector in two dimensions with `x` and `y` properties.


    // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
    // a coordinate is not specified, it will be set to `0`
    /**
     * @param {?number=} x The x position.
     * @param {?number=} y The y position.
     * @constructor
     */
    function Vector(x, y) {
        this['x'] = x || 0;
        this['y'] = y || 0;
    }

    SAT['Vector'] = Vector;
    // Alias `Vector` as `V`
    SAT['V'] = Vector;


    // Copy the values of another Vector into this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['copy'] = Vector.prototype.copy = function (other) {
        this['x'] = other['x'];
        this['y'] = other['y'];
        return this;
    };

    // Create a new vector with the same coordinates as this on.
    /**
     * @return {Vector} The new cloned vector
     */
    Vector.prototype['clone'] = Vector.prototype.clone = function () {
        return new Vector(this['x'], this['y']);
    };

    // Change this vector to be perpendicular to what it was before. (Effectively
    // roatates it 90 degrees in a clockwise direction)
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype['perp'] = Vector.prototype.perp = function () {
        var x = this['x'];
        this['x'] = this['y'];
        this['y'] = -x;
        return this;
    };

    // Rotate this vector (counter-clockwise) by the specified angle (in radians).
    /**
     * @param {number} angle The angle to rotate (in radians)
     * @return {Vector} This for chaining.
     */
    Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
        var x = this['x'];
        var y = this['y'];
        this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
        this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
        return this;
    };

    // Reverse this vector.
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype['reverse'] = Vector.prototype.reverse = function () {
        this['x'] = -this['x'];
        this['y'] = -this['y'];
        return this;
    };


    // Normalize this vector.  (make it have length of `1`)
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype['normalize'] = Vector.prototype.normalize = function () {
        var d = this.len();
        if (d > 0) {
            this['x'] = this['x'] / d;
            this['y'] = this['y'] / d;
        }
        return this;
    };

    // Add another vector to this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['add'] = Vector.prototype.add = function (other) {
        this['x'] += other['x'];
        this['y'] += other['y'];
        return this;
    };

    // Subtract another vector from this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaiing.
     */
    Vector.prototype['sub'] = Vector.prototype.sub = function (other) {
        this['x'] -= other['x'];
        this['y'] -= other['y'];
        return this;
    };

    // Scale this vector. An independent scaling factor can be provided
    // for each axis, or a single scaling factor that will scale both `x` and `y`.
    /**
     * @param {number} x The scaling factor in the x direction.
     * @param {?number=} y The scaling factor in the y direction.  If this
     *   is not specified, the x scaling factor will be used.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['scale'] = Vector.prototype.scale = function (x, y) {
        this['x'] *= x;
        this['y'] *= typeof y != 'undefined' ? y : x;
        return this;
    };

    // Project this vector on to another vector.
    /**
     * @param {Vector} other The vector to project onto.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['project'] = Vector.prototype.project = function (other) {
        var amt = this.dot(other) / other.len2();
        this['x'] = amt * other['x'];
        this['y'] = amt * other['y'];
        return this;
    };

    // Project this vector onto a vector of unit length. This is slightly more efficient
    // than `project` when dealing with unit vectors.
    /**
     * @param {Vector} other The unit vector to project onto.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['projectN'] = Vector.prototype.projectN = function (other) {
        var amt = this.dot(other);
        this['x'] = amt * other['x'];
        this['y'] = amt * other['y'];
        return this;
    };

    // Reflect this vector on an arbitrary axis.
    /**
     * @param {Vector} axis The vector representing the axis.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['reflect'] = Vector.prototype.reflect = function (axis) {
        var x = this['x'];
        var y = this['y'];
        this.project(axis).scale(2);
        this['x'] -= x;
        this['y'] -= y;
        return this;
    };

    // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
    // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
    /**
     * @param {Vector} axis The unit vector representing the axis.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['reflectN'] = Vector.prototype.reflectN = function (axis) {
        var x = this['x'];
        var y = this['y'];
        this.projectN(axis).scale(2);
        this['x'] -= x;
        this['y'] -= y;
        return this;
    };

    // Get the dot product of this vector and another.
    /**
     * @param {Vector}  other The vector to dot this one against.
     * @return {number} The dot product.
     */
    Vector.prototype['dot'] = Vector.prototype.dot = function (other) {
        return this['x'] * other['x'] + this['y'] * other['y'];
    };

    // Get the squared length of this vector.
    /**
     * @return {number} The length^2 of this vector.
     */
    Vector.prototype['len2'] = Vector.prototype.len2 = function () {
        return this.dot(this);
    };

    // Get the length of this vector.
    /**
     * @return {number} The length of this vector.
     */
    Vector.prototype['len'] = Vector.prototype.len = function () {
        return Math.sqrt(this.len2());
    };


    /**
     * 四舍五入
     * @returns {Vector}
     */
    Vector.prototype['round'] = Vector.prototype.round = function () {
        // return new Vector(Math.round(this.x), Math.round(this.y));
        this['x'] = Math.round(this['x']);
        this['y'] = Math.round(this['y']);
        return this;
    };

    /**
     * timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);
     * 要求x,y必须为非0的整数
     * @returns {Vector}
     */
    Vector.prototype['noZero'] = Vector.prototype.noZero = function () {
        // var point = wrapPosition(this);
        // if (point.x === 0) {
        //     point.x = 1;
        // }
        // if (point.y === 0) {
        //     point.y = 1;
        // }
        // return point;
        this['x'] = this['x'] ? this['x'] : 1;
        this['y'] = this['y'] ? this['y'] : 1;
        return this;
    };


    /**
     * 判断是否  在 另一个点 的 某个方向上
     * @param {Vector} point 另一个点
     * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner 方向
     * @returns {boolean}
     */
    Vector.prototype['isInDirectionOf'] = Vector.prototype.IsInDirectionOf = function (point, whichCorner) {
        var deltaX = this.x - point.x;
        var deltaY = this.y - point.y;
        // y轴向下，x轴向右
        switch (whichCorner) {
            case "top right":
                return deltaX > 0 && deltaY < 0;
            case "top left":
                return deltaX < 0 && deltaY < 0;
            case "bottom right":
                return deltaX > 0 && deltaY > 0;
            case "bottom left":
                return deltaX < 0 && deltaY > 0;
            case "top center":
                return deltaY < 0;
            case "right center":
                return deltaX > 0;
            case "bottom center":
                return deltaY > 0;
            case "left center":
                return deltaX < 0;
            case "center":
                return deltaX === 0 && deltaY === 0;
            default:
                throw new Error("Invalid direction: " + whichCorner);
        }
    }

    /**
     * 字符串
     * @returns {string}
     */
    Vector.prototype['toString'] = Vector.prototype.toString = function () {
        return "Vector(" + this.x + ", " + this.y + ")";
    }

    /**
     * 转换为对象
     * @return {{x:number,y:number}}
     */
    Vector.prototype['toObj'] = Vector.prototype.toObj = function () {
        return {x: this.x, y: this.y};
    }

    /**
     * 取中心点
     * @returns {Vector}
     */
    Vector.prototype['getCenter'] = Vector.prototype.getCenter = function () {
        return new Vector(this.x / 2, this.y / 2);
    }


    /**
     * 转换为Point对象
     * @param {{x:number,y:number}|Element|Vector} element 点对象
     * @return {Vector}
     */
    function wrapPosition(element) {
        return new Vector(element.x, element.y);
    }

    function wrapScale(element) {
        return new Vector(element.scaleX, element.scaleY);
    }

    function wrapSkew(element) {
        return new Vector(element.skewX, element.skewY);
    }

    /**
     * 取零点
     * @returns {Vector}
     */
    function getOrigin() {
        return new Vector(0, 0);
    }

    /**
     * 取元素的左上角坐标
     * @param {Element} element 元素
     * @returns {Vector}
     */
    function getTopLeft(element) {
        return new Vector(element.left, element.top);
    }

    SAT_GLOBALS['wrapPosition'] = wrapPosition;
    SAT_GLOBALS['wrapScale'] = wrapScale;
    SAT_GLOBALS['wrapSkew'] = wrapSkew;
    SAT_GLOBALS['getOrigin'] = getOrigin;
    SAT_GLOBALS['getTopLeft'] = getTopLeft;


    //
    // ## Rectangle
    //
    // Represents a rectangle with `left`, `top`, `right`, and `bottom` properties.


    /**
     * 矩形
     * @param {number} left 左边
     * @param {number} top 上边
     * @param {number} right 右边
     * @param {number} bottom 下边
     * @constructor
     * @class {Rectangle}
     */
    function Rectangle(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;

        this.width = this.right - this.left;
        this.height = this.bottom - this.top;
    }

    SAT['Rectangle'] = Rectangle;


    /**
     * 合并两个矩形，返回一个能够包含两个矩形的最小矩形。
     * @param {Rectangle} other - 要合并的另一个矩形。
     * @return {Rectangle} 合并后的矩形。
     */
    Rectangle.prototype.union = function (other) {
        // 计算合并后的矩形的左上角和右下角坐标
        var minLeft = Math.min(this.left, other.left);
        var minTop = Math.min(this.top, other.top);
        var maxRight = Math.max(this.right, other.right);
        var maxBottom = Math.max(this.bottom, other.bottom);

        return new Rectangle(minLeft, minTop, maxRight, maxBottom);
    };
    /**
     * 矩形 偏移后的 矩形
     * 移动矩形的边界
     * @param {Number|Vector|Rectangle} offset 偏移量
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.addOffset = function (offset) {
        if (typeof offset === "number") {
            offset = new Rectangle(offset, offset, offset, offset);
        } else if (offset instanceof Vector) {
            offset = new Rectangle(offset.x, offset.y, offset.x, offset.y);
        }
        return new Rectangle(this.left + offset.left, this.top + offset.top, this.right + offset.right, this.bottom + offset.bottom);
    }

    /**
     * 矩形 偏移前的 矩形
     * 移动矩形的边界
     * @param {Number|Vector|Rectangle} offset 偏移量
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.subOffset = function (offset) {
        if (typeof offset === "number") {
            offset = new Rectangle(offset, offset, offset, offset);
        } else if (offset instanceof Vector) {
            offset = new Rectangle(offset.x, offset.y, offset.x, offset.y);
        }
        return new Rectangle(this.left - offset.left, this.top - offset.top, this.right - offset.right, this.bottom - offset.bottom);
    }

    /**
     * 矩形中心点
     * @returns {Vector} 点
     */
    Rectangle.prototype.getCenterVector = function () {
        return new Vector((this.left + this.right) / 2, (this.top + this.bottom) / 2);
    }

    /**
     * 是否包含,当前矩形 是否 在 目标矩形 内部
     * @param {Rectangle} rect 矩形
     * @returns {boolean} 包含返回true，否则返回false
     */
    Rectangle.prototype.contains = function (rect) {
        return this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom;
    }

    /**
     * 获取矩形的某个角点
     * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner 角点或中心点
     * @returns {Vector} 点
     */
    Rectangle.prototype.getCorner = function(whichCorner) {
        // 获取矩形的基本属性
        const { left, right, top, bottom } = this;

        // 获取中心点坐标
        const { x: centerX, y: centerY } = this.getCenterVector();

        // 辅助函数：创建 Vector 对象
        function createVector(x, y) {
            return new Vector(x, y);
        }

        switch (whichCorner) {
            case "top right":
                return createVector(right, top);
            case "top left":
                return createVector(left, top);
            case "bottom right":
                return createVector(right, bottom);
            case "bottom left":
                return createVector(left, bottom);
            case "top center":
                return createVector(centerX, top);
            case "right center":
                return createVector(right, centerY);
            case "bottom center":
                return createVector(centerX, bottom);
            case "left center":
                return createVector(left, centerY);
            case "center":
                return createVector(centerX, centerY);
            default:
                throw new Error("参数错误：whichCorner " + whichCorner);
        }
    };

    /**
     * 获取矩形的某个部分
     *
     * 该方法根据指定的 `whichPart` 参数，从当前矩形中提取一个子矩形。子矩形的大小和位置由 `whichPart` 和比例参数（`widthRatio` 和 `heightRatio`）决定。
     *
     * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"|
     * "top"|"right"|"bottom"|"left"} whichPart 部分
     * @param {number} [widthRatio=0.5] - 宽度方向的比例（0-1），表示提取部分的宽度占原始矩形宽度的比例。
     * @param {number} [heightRatio=widthRatio] - 高度方向的比例（0-1），表示提取部分的高度占原始矩形高度的比例。
     * @returns {Rectangle} - 返回一个新矩形对象，表示提取的部分。
     * @throws {Error} - 如果 `whichPart` 参数无效，将抛出错误。
     */
    Rectangle.prototype.getPart = function (whichPart, widthRatio = 0.5, heightRatio = 0.5) {
        // 解构矩形的基本属性
        const {left, right, top, bottom, width, height} = this;

        // 获取中心点坐标
        const {x: centerX, y: centerY} = this.getCenterVector();

        // 提前计算宽度和高度的占比
        const widthPart = width * widthRatio;
        const heightPart = height * heightRatio;

        // 提前计算宽度和高度的剩余部分
        const widthInversePart = width - widthPart;
        const heightInversePart = height - heightPart;

        // 提前计算宽度和高度的一半占比
        const halfWidthPart = widthPart / 2;
        const halfHeightPart = heightPart / 2;

        switch (whichPart) {
            case "top right":
                return new Rectangle(right - widthInversePart, top, right, top + heightPart);
            case "top left":
                return new Rectangle(left, top, left + widthPart, top + heightPart);
            case "bottom right":
                return new Rectangle(right - widthInversePart, bottom - heightInversePart, right, bottom);
            case "bottom left":
                return new Rectangle(left, bottom - heightInversePart, left + widthPart, bottom);
            case "top center":
                return new Rectangle(centerX - halfWidthPart, top, centerX + halfWidthPart, top + heightPart);
            case "right center":
                return new Rectangle(right - widthInversePart, centerY - halfHeightPart, right, centerY + halfHeightPart);
            case "bottom center":
                return new Rectangle(centerX - halfWidthPart, bottom - heightPart, centerX + halfWidthPart, bottom);
            case "left center":
                return new Rectangle(left, centerY - halfHeightPart, left + widthPart, centerY + halfHeightPart);
            case "center":
                return new Rectangle(centerX - halfWidthPart, centerY - halfHeightPart, centerX + halfWidthPart, centerY + halfHeightPart);
            case "top":
                return new Rectangle(left, top, right, top + heightPart);
            case "right":
                return new Rectangle(right - widthInversePart, top, right, bottom);
            case "bottom":
                return new Rectangle(left, bottom - heightPart, right, bottom);
            case "left":
                return new Rectangle(left, top, left + widthPart, bottom);
            default:
                throw new Error("whichPart 参数错误");
        }
    };


    /**
     * 字符串
     * @returns {string} 字符串
     */
    Rectangle.prototype.toString = function () {
        return "Rectangle(left=" + this.left + ", top=" + this.top + ", right=" + this.right + ", bottom=" + this.bottom + ")";
    }

    /**
     * 转换为对象
     * @returns {{left:number,top:number,right:number,bottom:number}} 矩形对象
     */
    Rectangle.prototype.toObj = function () {
        return {left: this.left, top: this.top, right: this.right, bottom: this.bottom};
    }

    /**
     * 转换为矩形对象
     * @param {{left:number,top:number,right:number,bottom:number}|Rectangle} rect 矩形对象
     * @returns {Rectangle} 矩形
     */
    function wrapRect(rect) {
        return new Rectangle(rect.left, rect.top, rect.right, rect.bottom);
    }

    function wrapRectByTopLeft(left, top, width, height) {
        return new Rectangle(left, top, left + width, top + height);
    }

    function wrapRectByCenter(centerX, centerY, width, height) {
        return new Rectangle(centerX - width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2);
    }

    function wrapRectByElement(element) {
        var topLeft = getTopLeft(element);
        var size = wrapSize(element);
        return new Rectangle(topLeft.x, topLeft.y, topLeft.x + size.width, topLeft.y + size.height);
    }

    // 圆心 半径
    function wrapRectByRadius(centerPos, radius) {
        return new Rectangle(centerPos.x - radius, centerPos.y - radius, centerPos.x + radius, centerPos.y + radius);
    }

    SAT_GLOBALS["wrapRect"] = wrapRect;
    SAT_GLOBALS["wrapRectByTopLeft"] = wrapRectByTopLeft;
    SAT_GLOBALS["wrapRectByCenter"] = wrapRectByCenter;
    SAT_GLOBALS["wrapRectByElement"] = wrapRectByElement;
    SAT_GLOBALS["wrapRectByRadius"] = wrapRectByRadius;

    //
    // ## Size
    //
    // Represents a size with `width` and `height` properties.

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

        this.max_size = Math.max(width, height);
        this.min_size = Math.min(width, height);
        this.ratio = width / height;
    }

    SAT['Size'] = Size;

    Size.prototype.getRatioWidth = function () {
        return this.ratio * this.height;
    }

    Size.prototype.getRatioHeight = function () {
        return this.width / this.ratio;
    }

    Size.prototype.toString = function () {
        return "Size(" + this.width + ", " + this.height + ")";
    }

    Size.prototype.toObj = function () {
        return {width: this.width, height: this.height};
    }

    Size.prototype.toPoint = function () {
        return new Vector(this.width, this.height);
    }

    function wrapSize(element) {
        return new Size(element.width, element.height);
    }

    SAT_GLOBALS["wrapSize"] = wrapSize;


    //
    // ## Transform
    //
    // Represents a transform with `rotation`, `scale`, `position`, `size`, and `skew` properties.

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
        this.scale = new Vector(element.scaleX, element.scaleY);
        // 位置
        this.position = new Vector(element.x, element.y);
        // 宽高
        this.size = new Size(element.width, element.height);
        // 倾斜
        this.skew = new Vector(element.skewX, element.skewY);
    }

    SAT['Transform'] = Transform;

    Transform.prototype.setRotation = function (rotation) {
        this.element.rotation = rotation;
        this.rotation = rotation;
        return this;
    }
    /**
     * 设置缩放
     * @param {Vector} scale 缩放比例
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

    SAT_GLOBALS["wrapTransform"] = wrapTransform;

    SAT["GLOBALS"] = SAT_GLOBALS;
    return SAT;
}));