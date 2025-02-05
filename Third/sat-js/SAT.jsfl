/**
 * @file: Vector.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/5 18:21
 * @project: AnJsflScript
 * @description:
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
    Vector.prototype['round'] = Vector.prototype.round = Vector.prototype.toIntPonit = function () {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }

    /**
     * timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);
     * 要求x,y必须为非0的整数
     * @returns {Vector}
     */
    Vector.prototype['noZero'] = Vector.prototype.noZero = function () {
        var point = wrapPosition(this);
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
     * @param {Vector} point 另一个点
     * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner 方向
     * @returns {boolean}
     */
    Vector.prototype['isInDirectionOf'] = Vector.prototype.IsInDirectionOf = function (point, whichCorner) {
        var deltaX = this.x - point.x;
        var deltaY = this.y - point.y;
        switch (whichCorner) {
            case "top right":
                return deltaX > 0 && deltaY > 0;
            case "top left":
                return deltaX < 0 && deltaY > 0;
            case "bottom right":
                return deltaX > 0 && deltaY < 0;
            case "bottom left":
                return deltaX < 0 && deltaY < 0;
            case "top center":
                return deltaY > 0;
            case "right center":
                return deltaX > 0;
            case "bottom center":
                return deltaY < 0;
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
        return new Rectangle(this.left + offset.x, this.top + offset.y, this.right + offset.x, this.bottom + offset.y);
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
        return new Rectangle(this.left - offset.x, this.top - offset.y, this.right - offset.x, this.bottom - offset.y);
    }
    // /**
    //  * 矩形相加
    //  * 扩展  矩形的边界
    //  * @param {Rectangle} rect 矩形
    //  * @returns {Rectangle} 矩形
    //  */
    // Rectangle.prototype.add = function (rect) {
    //     return new Rectangle(this.left + rect.left, this.top + rect.top, this.right + rect.right, this.bottom + rect.bottom);
    // }
    //
    // /**
    //  * 矩形相减
    //  * 小矩形的边界   与   大矩形的边界  的距离
    //  * @param {Rectangle} rect 矩形
    //  * @returns {Rectangle} 矩形
    //  */
    // Rectangle.prototype.sub = function (rect) {
    //     return new Rectangle(this.left - rect.left, this.top - rect.top, this.right - rect.right, this.bottom - rect.bottom);
    // }

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
     * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner whichCorner 角点
     * @returns {Vector} 点
     */
    Rectangle.prototype.getCorner = function (whichCorner) {
        switch (whichCorner) {
            case "top right":
                return new Vector(this.right, this.top);
            case "top left":
                return new Vector(this.left, this.top);
            case "bottom right":
                return new Vector(this.right, this.bottom);
            case "bottom left":
                return new Vector(this.left, this.bottom);
            case "top center":
                return new Vector((this.left + this.right) / 2, this.top);
            case "right center":
                return new Vector(this.right, (this.top + this.bottom) / 2);
            case "bottom center":
                return new Vector((this.left + this.right) / 2, this.bottom);
            case "left center":
                return new Vector(this.left, (this.top + this.bottom) / 2);
            case "center":
                return new Vector((this.left + this.right) / 2, (this.top + this.bottom) / 2);
            default:
                throw new Error("参数错误：whichCorner " + whichCorner);
        }
    }

    /**
     * 获取矩形的某个部分
     * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"|
     * "top"|"right"|"bottom"|"left"} whichPart 部分
     * @param {number} [ratio] 0-1 获取部分的比例
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.getPart = function (whichPart, ratio) {
        // var ratio = getPart / splitPart;
        if (ratio === undefined) {
            ratio = 0.5;
        }
        switch (whichPart) {
            case "top right":
                return new Rectangle(this.right - (this.width * (1 - ratio)), this.top, this.right, this.top + (this.height * ratio));
            case "top left":
                return new Rectangle(this.left, this.top, this.left + (this.width * ratio), this.top + (this.height * ratio));
            case "bottom right":
                return new Rectangle(this.right - (this.width * (1 - ratio)), this.bottom - (this.height * ratio), this.right, this.bottom);
            case "bottom left":
                return new Rectangle(this.left, this.bottom - (this.height * ratio), this.left + (this.width * ratio), this.bottom);
            case "top center":
                return new Rectangle((this.left + this.right) / 2 - (this.width * (1 - ratio)) / 2, this.top, (this.left + this.right) / 2 + (this.width * (1 - ratio)) / 2, this.top + (this.height * ratio));
            case "right center":
                return new Rectangle(this.right - (this.width * (1 - ratio)), (this.top + this.bottom) / 2 - (this.height * (1 - ratio)) / 2, this.right, (this.top + this.bottom) / 2 + (this.height * (1 - ratio)) / 2);
            case "bottom center":
                return new Rectangle((this.left + this.right) / 2 - (this.width * (1 - ratio)) / 2, this.bottom - (this.height * ratio), (this.left + this.right) / 2 + (this.width * (1 - ratio)) / 2, this.bottom);
            case "left center":
                return new Rectangle(this.left, (this.top + this.bottom) / 2 - (this.height * (1 - ratio)) / 2, this.left + (this.width * ratio), (this.top + this.bottom) / 2 + (this.height * (1 - ratio)) / 2);
            case "center":
                return new Rectangle((this.left + this.right) / 2 - (this.width * (1 - ratio)) / 2, (this.top + this.bottom) / 2 - (this.height * (1 - ratio)) / 2, (this.left + this.right) / 2 + (this.width * (1 - ratio)) / 2, (this.top + this.bottom) / 2 + (this.height * (1 - ratio)) / 2);
            case "top":
                return new Rectangle(this.left, this.top, this.right, this.top + (this.height * ratio));
            case "right":
                return new Rectangle(this.right - (this.width * (1 - ratio)), this.top, this.right, this.bottom);
            case "bottom":
                return new Rectangle(this.left, this.bottom - (this.height * ratio), this.right, this.bottom);
            case "left":
                return new Rectangle(this.left, this.top, this.left + (this.width * ratio), this.bottom);
            default:
                throw new Error("whichPart 参数错误");
        }
    }

   
//     Rectangle.prototype.expandAround = function (around) {
//         return new Rectangle(this.left - around, this.top - around, this.right + around, this.bottom + around);
//     }
//
// //  缩小矩形
//     Rectangle.prototype.shrinkAround = function (around) {
//         return new Rectangle(this.left + around, this.top + around, this.right - around, this.bottom - around);
//     }

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
        return new Point(this.width, this.height);
    }

    function wrapSize(element) {
        return new Size(element.width, element.height);
    }
    SAT_GLOBALS["wrapSize"] = wrapSize;

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
    SAT['Transform'] = Transform;

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
    SAT_GLOBALS["wrapTransform"] = wrapTransform;

    return {
        SAT: SAT,
        SAT_GLOBALS: SAT_GLOBALS
    }
}));