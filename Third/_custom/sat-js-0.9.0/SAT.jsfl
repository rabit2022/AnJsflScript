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
(function(root, factory) {
    "use strict";
    if (typeof define === "function" && define["amd"]) {
        define(factory);
    } else if (typeof exports === "object") {
        module["exports"] = factory();
    } else {
        root["SAT"] = factory();
    }
}(this, function() {
    "use strict";

    var SAT = {};
    var SAT_GLOBALS = {};
    var SAT_CHECk = {};

    /**
     * 继承宏
     * @param {Function} SUB_CLASS 子类
     * @param {Function} SUPER_CLASS 父类
     * @param {Object} [properties] 子类属性
     */
    function INHERIT_MACRO(SUB_CLASS, SUPER_CLASS, properties) {
        // 继承父类原型
        SUB_CLASS.prototype = Object.create(SUPER_CLASS.prototype);
        SUB_CLASS.prototype.constructor = SUB_CLASS;

        // 添加父类引用
        SUB_CLASS.superConstructor = SUPER_CLASS;
        SUB_CLASS.superClass = SUPER_CLASS.prototype;

        // 继承父类 静态方法
        Object.assign(SUB_CLASS, SUPER_CLASS);

        // 添加属性或方法
        if (properties) {
            Object.assign(SUB_CLASS.prototype, properties);
        }
    }


    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______       __     ______     ______     ______
    // /\  ___\   /\  __ \   /\  == \     /\ \   /\  ___\   /\  ___\   /\__  _\
    // \ \___  \  \ \ \/\ \  \ \  __<    _\_\ \  \ \  __\   \ \ \____  \/_/\ \/
    //  \/\_____\  \ \_____\  \ \_____\ /\_____\  \ \_____\  \ \_____\    \ \_\
    //   \/_____/   \/_____/   \/_____/ \/_____/   \/_____/   \/_____/     \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // SObject
    /**
     * SObject 构造函数
     * @constructor
     * @note  子类必须有 无参构造函数，否则clone方法会报错
     */
    function SObject() {
    }

    /**
     * 复制 SObject 对象的属性
     * @param {SObject} other 要复制的 SObject 对象
     * @returns {SObject} 返回当前对象
     */
    SObject.prototype.copy = function(other) {
        // if (!(other instanceof SObject)) {
        //     throw new TypeError("The argument must be an instance of SObject.");
        // }
        for (var prop in other) {
            if (other.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                this[prop] = other[prop];
            }
        }
        return this;
    };

    /**
     * 克隆 SObject 对象
     * @returns {SObject} 返回克隆后的对象
     */
    SObject.prototype.clone = function() {
        var SObjectConstructor = this.constructor;
        var sObject = new SObjectConstructor();
        sObject.copy(this);
        return sObject;
    };

    /**
     * 将 SObject 对象转换为向量表示
     * @returns {Object} 返回一个表示向量的对象
     */
    SObject.prototype.toVector = function() {
        throw new Error("Not implemented");
    };

    /**
     * 返回对象的字符串表示
     * @returns {string} 返回对象的字符串表示
     */
    SObject.prototype.toString = function() {
        var props = [];
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                props.push(prop + "=" + this[prop]);
            }
        }
        return this.constructor.name + "(" + props.join(", ") + ")";
    };

    /**
     * 返回对象的属性值的普通对象表示
     * @returns {Object} 返回对象的属性值的普通对象表示
     */
    SObject.prototype.toObj = function() {
        var obj = {};
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                obj[prop] = this[prop];
            }
        }
        return obj;
    };

    /**
     * 静态方法，返回类的字符串表示
     * @returns {string} 返回类的字符串表示
     */
    SObject.toString = function() {
        return "[class " + this.name + "]";
    };


    // ------------------------------------------------------------------------------------------------------------------------
    //  __   __   ______     ______     ______   ______     ______
    // /\ \ / /  /\  ___\   /\  ___\   /\__  _\ /\  __ \   /\  == \
    // \ \ \'/   \ \  __\   \ \ \____  \/_/\ \/ \ \ \/\ \  \ \  __<
    //  \ \__|    \ \_____\  \ \_____\    \ \_\  \ \_____\  \ \_\ \_\
    //   \/_/      \/_____/   \/_____/     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // Vector
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
        SObject.apply(this, arguments);

        // if (x === undefined || y === undefined) {
        //     throw new Error("Both x and y must be defined");
        // }
        this["x"] = x || 0;
        this["y"] = y || 0;
    }

    INHERIT_MACRO(Vector, SObject);

    Vector.prototype.toVector = function() {
        return this;
    };

    SAT["Vector"] = Vector;
    // Alias `Vector` as `V`
    SAT["V"] = Vector;

    // Change this vector to be perpendicular to what it was before. (Effectively
    // rotates it 90 degrees in a clockwise direction)
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype["perp"] = Vector.prototype.perp = function() {
        var x = this["x"];
        this["x"] = this["y"];
        this["y"] = -x;
        return this;
    };

    // Rotate this vector (counter-clockwise) by the specified angle (in radians).
    /**
     * @param {number} angle The angle to rotate (in radians)
     * @return {Vector} This for chaining.
     */
    Vector.prototype["rotate"] = Vector.prototype.rotate = function(angle) {
        var x = this["x"];
        var y = this["y"];
        this["x"] = x * Math.cos(angle) - y * Math.sin(angle);
        this["y"] = x * Math.sin(angle) + y * Math.cos(angle);
        return this;
    };

    // Reverse this vector.
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype["reverse"] = Vector.prototype.reverse = function() {
        this["x"] = -this["x"];
        this["y"] = -this["y"];
        return this;
    };

    Vector.prototype["invert"] = Vector.prototype.invert = function() {
        if (this.x === 0 || this.y === 0) {
            throw new Error("x and y must not be zero");
        }
        return new Vector(1 / this.x, 1 / this.y);
    };

    // Normalize this vector.  (make it have length of `1`)
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype["normalize"] = Vector.prototype.normalize = function() {
        var d = this.len();
        if (d > 0) {
            this["x"] = this["x"] / d;
            this["y"] = this["y"] / d;
        }
        return this;
    };

    // Add another vector to this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaining.
     */
    Vector.prototype["add"] = Vector.prototype.add = function(other) {
        this["x"] += other["x"];
        this["y"] += other["y"];
        return this;
    };

    // Subtract another vector from this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaiing.
     */
    Vector.prototype["sub"] = Vector.prototype.sub = function(other) {
        this["x"] -= other["x"];
        this["y"] -= other["y"];
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
    Vector.prototype["scale"] = Vector.prototype.scale = function(x, y) {
        this["x"] *= x;
        this["y"] *= typeof y !== "undefined" ? y : x;
        return this;
    };

    // Project this vector on to another vector.
    /**
     * @param {Vector} other The vector to project onto.
     * @return {Vector} This for chaining.
     */
    Vector.prototype["project"] = Vector.prototype.project = function(other) {
        var amt = this.dot(other) / other.len2();
        this["x"] = amt * other["x"];
        this["y"] = amt * other["y"];
        return this;
    };

    // Project this vector onto a vector of unit length. This is slightly more efficient
    // than `project` when dealing with unit vectors.
    /**
     * @param {Vector} other The unit vector to project onto.
     * @return {Vector} This for chaining.
     */
    Vector.prototype["projectN"] = Vector.prototype.projectN = function(other) {
        var amt = this.dot(other);
        this["x"] = amt * other["x"];
        this["y"] = amt * other["y"];
        return this;
    };

    // Reflect this vector on an arbitrary axis.
    /**
     * @param {Vector} axis The vector representing the axis.
     * @return {Vector} This for chaining.
     */
    Vector.prototype["reflect"] = Vector.prototype.reflect = function(axis) {
        var x = this["x"];
        var y = this["y"];
        this.project(axis).scale(2);
        this["x"] -= x;
        this["y"] -= y;
        return this;
    };

    // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
    // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
    /**
     * @param {Vector} axis The unit vector representing the axis.
     * @return {Vector} This for chaining.
     */
    Vector.prototype["reflectN"] = Vector.prototype.reflectN = function(axis) {
        var x = this["x"];
        var y = this["y"];
        this.projectN(axis).scale(2);
        this["x"] -= x;
        this["y"] -= y;
        return this;
    };

    // Get the dot product of this vector and another.
    /**
     * @param {Vector}  other The vector to dot this one against.
     * @return {number} The dot product.
     */
    Vector.prototype["dot"] = Vector.prototype.dot = function(other) {
        return this["x"] * other["x"] + this["y"] * other["y"];
    };

    // Get the squared length of this vector.
    /**
     * @return {number} The length^2 of this vector.
     */
    Vector.prototype["len2"] = Vector.prototype.len2 = function() {
        return this.dot(this);
    };

    // Get the length of this vector.
    /**
     * @return {number} The length of this vector.
     */
    Vector.prototype["len"] = Vector.prototype.len = function() {
        return Math.sqrt(this.len2());
    };

    /**
     * 四舍五入
     * @returns {Vector}
     */
    Vector.prototype["round"] = Vector.prototype.round = function() {
        // return new Vector(Math.round(this.x), Math.round(this.y));
        this["x"] = Math.round(this["x"]);
        this["y"] = Math.round(this["y"]);
        return this;
    };

    /**
     * timeline.camera.setPosition(curFrameIndex, newCameraPos.x, newCameraPos.y);
     * 要求x,y必须为非0的整数
     * @returns {Vector}
     */
    Vector.prototype["noZero"] = Vector.prototype.noZero = function() {
        this["x"] = this["x"] ? this["x"] : 1;
        this["y"] = this["y"] ? this["y"] : 1;
        return this;
    };

    // equals
    /**
     * 相等
     * @param {Vector} other - 另一个向量
     * @returns {boolean}
     */
    Vector.prototype["equals"] = Vector.prototype.equals = function(other) {
        return this.x === other.x && this.y === other.y;
    };

    /**
     * 让一个点围绕另一个点沿椭圆轨道旋转
     * @param {Vector} pt - 要围绕的中心点
     * @param {Number} arcWidth - 椭圆轨道的宽度（水平方向的半径）
     * @param {Number} arcHeight - 椭圆轨道的高度（垂直方向的半径）
     * @param {Number} degrees - 旋转的角度（0 - 360 度）
     * @returns {Vector} - 返回当前点对象，其坐标已更新为旋转后的新位置
     */
    Vector.prototype["orbit"] = Vector.prototype.orbit = function(pt, arcWidth, arcHeight, degrees) {
        // 将角度转换为弧度，因为 Math.cos 和 Math.sin 需要弧度作为输入
        var radians = degrees * (Math.PI / 180);

        // 根据椭圆参数方程计算新坐标
        // 水平方向（x）：以中心点 pt.x 为基准，加上椭圆宽度乘以角度的余弦值
        this.x = pt.x + arcWidth * Math.cos(radians);

        // 垂直方向（y）：以中心点 pt.y 为基准，加上椭圆高度乘以角度的正弦值
        this.y = pt.y + arcHeight * Math.sin(radians);

        // 返回当前点对象，其坐标已更新为旋转后的新位置
        return this;
    };

    // --------------------------------------------------------------------------------
    // # Calculation methods

    /**
     * 取中心点
     * @returns {Vector}
     */
    Vector.prototype["getCenter"] = Vector.prototype.getCenter = function() {
        return new Vector(this.x / 2, this.y / 2);
    };

    /**
     * 判断是否  在 另一个点 的 某个方向上
     * @param {Vector} point 另一个点
     * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner 方向
     * @returns {boolean}
     */
    Vector.prototype["IsInDirectionOf"] = Vector.prototype.IsInDirectionOf = function(point, whichCorner) {
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
    };

    /**
     * 计算两个向量之间的角度
     * @param {Vector} other - 另一个向量
     * @returns {number} 角度值，单位为弧度
     */
    Vector.prototype["angleTo"] = Vector.prototype.angleTo = function(other) {
        var dot = this.dot(other);
        var len1 = this.len();
        var len2 = other.len();
        var angle = Math.acos(dot / (len1 * len2));
        return angle;
    };

    /**
     * 计算两个向量之间的距离
     * @param {Vector} other - 另一个向量
     * @returns {number} 距离值，单位为像素
     */
    Vector.prototype["distanceTo"] = Vector.prototype.distanceTo = function(other) {
        var x = this.x - other.x;
        var y = this.y - other.y;
        return Math.sqrt(x * x + y * y);
    };

    //interpolate
    /**
     * 计算两个向量之间的插值
     * @param {Vector} other - 另一个向量
     * @param {number} f - 0-1之间的数值，表示插值比例
     * @returns {Vector} 两个向量的插值
     */
    Vector.prototype["interpolate"] = Vector.prototype.interpolate = function(other, f) {
        f = typeof f === "undefined" ? 1 : f;
        return new Vector((this.x + other.x) * f, (this.y + other.y) * f);
    };

    // --------------------------------------------------------------------------------
    // # Utility methods

    /**
     * 转换为Size对象
     * @returns {Size}
     */
    Vector.prototype["toSize"] = Vector.prototype.toSize = function() {
        return new Size(this.x, this.y);
    };

    /**
     * 转换为Rectangle对象
     * @returns {Rectangle}
     */
    Vector.prototype["toRectangle"] = Vector.prototype.toRectangle = function() {
        return new Rectangle(0, 0, this.x, this.y);
    };

    /**
     * 转换为Scale对象
     * @returns {Scale}
     */
    Vector.prototype["toScale"] = Vector.prototype.toScale = function() {
        return new Scale(this.x, this.y);
    };
    /**
     * 转换为Skew对象
     * @returns {Skew}
     */
    Vector.prototype["toSkew"] = Vector.prototype.toSkew = function() {
        return new Skew(this.x, this.y);
    };

    // ----------------------------------------------------------------------------------------------------
    // # Static methods

    /**
     * Gets the interpolated distance in pixels from a source Vector a target Vector
     * 获取从源点到目标点的插值距离（像素）
     * @param    {Vector}        pt1            The source Vector
     * @param    {Vector}        pt2            The target Vector
     * @param    {Number}    f            A number from 0 to 1
     * @returns    {Vector}                The distance in pixels
     */
    Vector.interpolate = function(pt1, pt2, f) {
        f = typeof f === "undefined" ? 1 : f;
        return new Vector((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);
    };

    /**
     * Returns a new Vector, based on an angle around and length from the Origin (0, 0)
     * @param    {Number}    length        The length from the Origin
     * @param    {Number}    angle        The angle in degrees to rotate around the origin
     * @returns    {Vector}                    A new Vector object
     */
    Vector.polar = function(length, angle) {
        return new Vector(length * Math.sin(angle), length * Math.cos(angle));
    };

    /**
     * Gets the distance in pixels from a source Vector a target Vector
     * @param    {Vector}        pt1            The source Vector
     * @param    {Vector}        pt2            The target Vector
     * @returns    {Number}                The distance in pixels
     */
    Vector.distance = function(pt1, pt2) {
        var x = pt1.x - pt2.x;
        var y = pt1.y - pt2.y;
        return Math.sqrt(x * x + y * y);
    };

    Vector.from = wrapPosition;

    // ----------------------------------------------------------------------------------------------------
    // # Wrappers for Vector

    /**
     * 转换为Point对象
     * @param {VectorLike|Element|Vector} element 点对象
     * @return {Vector}
     */
    function wrapPosition(element) {
        return new Vector(element.x, element.y);
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

    SAT_GLOBALS["wrapPosition"] = wrapPosition;
    SAT_GLOBALS["getOrigin"] = getOrigin;
    SAT_GLOBALS["getTopLeft"] = getTopLeft;

    function IsVectorLike(obj) {
        return obj && typeof obj.x === "number" && typeof obj.y === "number";
    }

    SAT_CHECk["IsVectorLike"] = IsVectorLike;

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     ______   ______     __   __     ______
    // /\  == \   /\  ___\   /\  ___\   /\__  _\ /\  __ \   /\ "-.\ \   /\  ___\
    // \ \  __<   \ \  __\   \ \ \____  \/_/\ \/ \ \  __ \  \ \ \-.  \  \ \ \__ \
    //  \ \_\ \_\  \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\\"\_\  \ \_____\
    //   \/_/ /_/   \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/ \/_/   \/_____/
    //
    //  __         ______
    // /\ \       /\  ___\
    // \ \ \____  \ \  __\
    //  \ \_____\  \ \_____\
    //   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // Rectangle
    //
    // Represents a rectangle with `left`, `top`, `right`, and `bottom` properties.

    /**
     * Rectangle object.
     * Useful for quickly creating objects on the stage
     * @class Rectangle
     * @constructor
     */
    function Rectangle() {
        SObject.apply(this, arguments);

        // variables
        var args = arguments;
        var $dom = fl.getDocumentDOM();

        // switch
        switch (args.length) {
            // 0 arguments, use document size
            case 0:
                this.left = 0;
                this.top = 0;
                this.right = $dom.width;
                this.bottom = $dom.height;
                break;

            // 1 argument - should be a document, element, radius, or an Array of Elements (such as a selection)
            case 1:
                // Bounds,RectangleLike
                if (args[0] instanceof Rectangle || IsRectangleLike(args[0])) {
                    this.copy(args[0]);
                }

                // Document
                else if (args[0] instanceof Document) {
                    return new Rectangle();
                }

                // Element (element bounds)
                else if (args[0] instanceof Element || args[0] instanceof SymbolItem) {
                    this.left = args[0].left;
                    this.top = args[0].top;
                    this.right = args[0].left + args[0].width;
                    this.bottom = args[0].top + args[0].height;
                }

                // Number (radius)
                else if (typeof args[0] === "number") {
                    this.left = -args[0];
                    this.top = -args[0];
                    this.right = args[0];
                    this.bottom = args[0];
                }

                    // Array - selection or list of elements
                // 找到所有元素的最小矩形
                else if (args[0] instanceof Array && args[0].length) {
                    var rect = findBoundingRectangle(args[0]);
                    this.copy(rect);
                }

                // undefined
                else if (args[0] === undefined) {
                    throw new Error("Rectangle: 请选中一个元件。 ");
                }

                // other
                else {
                    // console.stack('Rectangle: Invalid argument 1');
                    throw new Error("Invalid argument 1");
                }

                break;

            // (width, height),(centerPos, radius)
            case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                    this.left = 0;
                    this.top = 0;
                    this.right = args[0];
                    this.bottom = args[1];
                } else if (args[0] instanceof Vector && typeof args[1] === "number") {
                    var radiusRect = new Rectangle(args[1]);
                    var centerPos = args[0];
                    var addRect = radiusRect.addOffset(centerPos);
                    this.copy(addRect);
                } else {
                    throw new Error("Invalid argument 2");
                }
                break;

            // left, top, right, bottom
            case 4:
                this.left = args[0];
                this.top = args[1];
                this.right = args[2];
                this.bottom = args[3];
                break;
        }
    }

    INHERIT_MACRO(Rectangle, SObject);

    Object.defineProperty(Rectangle.prototype, "width", {
        get: function() {
            return this.right - this.left;
        }
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function() {
            return this.bottom - this.top;
        }
    });
    Object.defineProperty(Rectangle.prototype, "center", {
        get: function() {
            return this.getCenterVector();
        }
    });
    Object.defineProperty(Rectangle.prototype, "size", {
        get: function() {
            return this.getSize();
        }
    });


    SAT["Rectangle"] = Rectangle;
    SAT["R"] = Rectangle;

    /**
     * 矩形 偏移后的 矩形
     * 移动矩形的边界
     * @param {Number|Vector|Rectangle} offset 偏移量
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.addOffset = function(offset) {
        if (typeof offset === "number") {
            offset = new Rectangle(offset, offset, offset, offset);
        } else if (offset instanceof Vector) {
            offset = new Rectangle(offset.x, offset.y, offset.x, offset.y);
        }
        return new Rectangle(this.left + offset.left, this.top + offset.top, this.right + offset.right, this.bottom + offset.bottom);
    };

    /**
     * 矩形 偏移前的 矩形
     * 移动矩形的边界
     * @param {Number|Vector|Rectangle} offset 偏移量
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.subOffset = function(offset) {
        if (typeof offset === "number") {
            offset = new Rectangle(offset, offset, offset, offset);
        } else if (offset instanceof Vector) {
            offset = new Rectangle(offset.x, offset.y, offset.x, offset.y);
        }
        return new Rectangle(this.left - offset.left, this.top - offset.top, this.right - offset.right, this.bottom - offset.bottom);
    };

    /**
     * 扩大矩形的边界
     * @param {Number|Vector|Rectangle} size 扩大量
     * @param {DirectionType} [whichDirection="all"] 哪个角点
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.expand = function(size, whichDirection) {
        // const offset = new Rectangle(-size, -size, size, size);
        // return this.addOffset(offset);
        if (whichDirection === undefined) whichDirection = "all";

        var offset = new Rectangle(0, 0, 0, 0);
        switch (whichDirection) {
            case "left":
                offset.left = -size;
                break;
            case "top":
                offset.top = -size;
                break;
            case "right":
                offset.right = size;
                break;
            case "bottom":
                offset.bottom = size;
                break;
            case "all":
                offset.left = -size;
                offset.top = -size;
                offset.right = size;
                offset.bottom = size;
                break;
            default:
                throw new Error("whichDirection 参数错误:" + whichDirection);
        }

        return this.addOffset(offset);
    };
    /**
     * 缩小矩形的边界
     * @param {Number|Vector|Rectangle} size 缩小量
     * @param {Direction} [whichDirection="all"] 哪个角点
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.shrink = function(size, whichDirection) {
        // const offset = new Rectangle(-size, -size, size, size);
        // return this.subOffset(offset);
        if (whichDirection === undefined) whichDirection = "all";

        var offset = new Rectangle(0, 0, 0, 0);
        switch (whichDirection) {
            case "left":
                offset.left = -size;
                break;
            case "top":
                offset.top = -size;
                break;
            case "right":
                offset.right = size;
                break;
            case "bottom":
                offset.bottom = size;
                break;
            case "all":
                offset.left = -size;
                offset.top = -size;
                offset.right = size;
                offset.bottom = size;
                break;
            default:
                throw new Error("whichDirection 参数错误:" + whichDirection);
        }

        return this.subOffset(offset);
    };


    /**
     * 矩形中心点
     * @returns {Vector} 点
     */
    Rectangle.prototype.getCenterVector = function() {
        return new Vector((this.left + this.right) / 2, (this.top + this.bottom) / 2);
    };

    /**
     * 矩形大小
     * @returns {Size} 大小
     */
    Rectangle.prototype.getSize = function() {
        return new Size(this.width, this.height);
    };

    /**
     * 是否包含,当前矩形 是否 在 目标矩形 内部
     * @param {Rectangle} rect 矩形
     * @returns {boolean} 包含返回true，否则返回false
     */
    Rectangle.prototype.contains = function(rect) {
        return (this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom);
    };

    /**
     * 获取矩形的某个角点
     * @param {Corner} whichCorner 角点或中心点
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
     * @param {Part} whichPart 部分
     * @param {number} [widthRatio=0.5] - 宽度方向的比例（0-1），表示提取部分的宽度占原始矩形宽度的比例。
     * @param {number} [heightRatio=0.5] - 高度方向的比例（0-1），表示提取部分的高度占原始矩形高度的比例。
     * @returns {Rectangle} - 返回一个新矩形对象，表示提取的部分。
     * @throws {Error} - 如果 `whichPart` 参数无效，将抛出错误。
     */
    Rectangle.prototype.getPart = function(whichPart, widthRatio, heightRatio) {
        if (typeof widthRatio === "undefined") widthRatio = 0.5;
        if (typeof heightRatio === "undefined") heightRatio = widthRatio;
        // console.log("whichPart", whichPart, "widthRatio", widthRatio, "heightRatio", heightRatio);

        // 解构矩形的基本属性
        const { left, right, top, bottom, width, height } = this;
        // console.log("left", left, "top", top, "right", right, "bottom", bottom, "width", width, "height", height);

        // 获取中心点坐标
        const { x: centerX, y: centerY } = this.getCenterVector();
        // console.log("centerX", centerX, "centerY", centerY);

        // 提前计算宽度和高度的占比
        const widthPart = width * widthRatio;
        const heightPart = height * heightRatio;
        // console.log("widthPart", widthPart, "heightPart", heightPart);

        // 提前计算宽度和高度的剩余部分
        const widthInversePart = width - widthPart;
        const heightInversePart = height - heightPart;
        // console.log("widthInversePart", widthInversePart, "heightInversePart", heightInversePart);

        // 提前计算宽度和高度的一半占比
        const halfWidthPart = widthPart / 2;
        const halfHeightPart = heightPart / 2;
        // console.log("halfWidthPart", halfWidthPart, "halfHeightPart", halfHeightPart);

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
                // console.log("right center",widthRatio,heightRatio);
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

    // --------------------------------------------------------------------------------
    // # Utility methods

    /**
     * 合并两个矩形，返回一个能够包含两个矩形的最小矩形。
     * @param {Rectangle} other - 要合并的另一个矩形。
     * @return {Rectangle} 合并后的矩形。
     */
    Rectangle.prototype.union = function(other) {
        // 计算合并后的矩形的左上角和右下角坐标
        var minLeft = Math.min(this.left, other.left);
        var minTop = Math.min(this.top, other.top);
        var maxRight = Math.max(this.right, other.right);
        var maxBottom = Math.max(this.bottom, other.bottom);

        return new Rectangle(minLeft, minTop, maxRight, maxBottom);
    };

    Rectangle.fromElements = findBoundingRectangle;
    Rectangle.fromTopLeft = wrapRectByTopLeft;
    Rectangle.fromCenter = wrapRectByCenter;
    Rectangle.fromVectors = function(vectors) {
        // 创建一个初始矩形
        var rect = new Rectangle(0, 0, 0, 0);

        // 遍历所有向量，更新矩形的边界
        for (var i = 0; i < vectors.length; i++) {
            var vector = vectors[i];

            // 在第一次迭代时初始化矩形的边界
            if (i === 0) {
                rect.left = vector.x;
                rect.top = vector.y;
                rect.right = vector.x;
                rect.bottom = vector.y;
            } else {
                // 更新矩形的边界
                rect.left = Math.min(rect.left, vector.x);
                rect.top = Math.min(rect.top, vector.y);
                rect.right = Math.max(rect.right, vector.x);
                rect.bottom = Math.max(rect.bottom, vector.y);
            }
        }
        return rect;
    };

    Rectangle.fromRects = function(rects) {
        // 创建一个初始矩形
        var rect = new Rectangle(0, 0, 0, 0);

        // 遍历所有矩形，更新矩形的边界
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];

            // 在第一次迭代时初始化矩形的边界
            if (i === 0) {
                rect.left = r.left;
                rect.top = r.top;
                rect.right = r.right;
                rect.bottom = r.bottom;
            } else {
                // 更新矩形的边界
                rect.left = Math.min(rect.left, r.left);
                rect.top = Math.min(rect.top, r.top);
                rect.right = Math.max(rect.right, r.right);
                rect.bottom = Math.max(rect.bottom, r.bottom);
            }
        }
        return rect;

    };
    /**
     * 旋转矩形
     * @param {number} angle 角度
     * @param {Corner} [whichCorner="center"] 哪个角点
     * @returns {Rectangle} 矩形
     */
    Rectangle.prototype.rotate = function(angle, whichCorner) {
        // 默认旋转中心为矩形中心
        whichCorner = whichCorner || "center";

        // 将角度转换为弧度
        var radians = angle * (Math.PI / 180);

        // 获取旋转中心点的坐标
        var center = this.getCorner(whichCorner);

        // 获取矩形的四个顶点坐标
        var topLeft = this.getCorner("top left");
        var topRight = this.getCorner("top right");
        var bottomLeft = this.getCorner("bottom left");
        var bottomRight = this.getCorner("bottom right");

        function rotate(vector, radians, center) {
            return vector.sub(center).rotate(radians).add(center);
        }

        // 旋转每个顶点
        var rotatedTopLeft = rotate(topLeft, radians, center);
        var rotatedTopRight = rotate(topRight, radians, center);
        var rotatedBottomLeft = rotate(bottomLeft, radians, center);
        var rotatedBottomRight = rotate(bottomRight, radians, center);

        // 根据旋转后的顶点重新计算矩形的边界
        var newRect = Rectangle.fromVectors([rotatedTopLeft, rotatedTopRight, rotatedBottomRight, rotatedBottomLeft]);

        return newRect;
    };

    /**
     * 由左上角坐标和宽高创建矩形
     * @returns {Rectangle} 矩形对象
     */
    function wrapRectByTopLeft() {
        // variables
        var args = arguments;
        switch (args.length) {
            // topLeft,size
            case 2:
                var topLeft = args[0];
                var size = args[1];
                return wrapRectByTopLeft(topLeft.x, topLeft.y, size.width, size.height);
                // eslint-disable-next-line no-unreachable
                break;
            case 4:
                var left = args[0];
                var top = args[1];
                var width = args[2];
                var height = args[3];
                return new Rectangle(left, top, left + width, top + height);
                // eslint-disable-next-line no-unreachable
                break;
            default:
                throw new Error("Invalid arguments");
        }

    }

    /**
     * 由中心点坐标和宽高创建矩形
     * @returns {Rectangle} 矩形对象
     */
    function wrapRectByCenter() {
        var args = arguments;
        switch (args.length) {
            // center,size
            case 2:
                var center = args[0];
                var size = args[1];
                return wrapRectByCenter(center.x, center.y, size.width, size.height);
                // eslint-disable-next-line no-unreachable
                break;
            // centerX,centerY,width,height
            case 4:
                var centerX = args[0];
                var centerY = args[1];
                var width = args[2];
                var height = args[3];
                return new Rectangle(centerX - width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2);
                // eslint-disable-next-line no-unreachable
                break;
            default:
                throw new Error("Invalid arguments");
        }
    }

    /**
     * Finds the smallest rectangle that contains all the given points.
     *
     * @param {Array<Element>} elements - An array of Elements.
     * @return {Rectangle} The smallest rectangle that contains all the points.
     */
    function findBoundingRectangle(elements) {
        if (!elements.length) {
            return null; // 如果数组为空，返回null
        }

        var top = elements[0].top;
        var left = elements[0].left;
        var right = elements[0].left + elements[0].width;
        var bottom = elements[0].top + elements[0].height;

        for (var i = 1; i < elements.length; i++) {
            var element = elements[i];
            var elementTop = element.top;
            var elementLeft = element.left;
            var elementRight = element.left + element.width;
            var elementBottom = element.top + element.height;

            if (elementTop < top) top = elementTop;
            if (elementLeft < left) left = elementLeft;
            if (elementRight > right) right = elementRight;
            if (elementBottom > bottom) bottom = elementBottom;
        }

        return new Rectangle(left, top, right, bottom);
    }

    /**
     * 获取元素的中心点坐标
     * @param {Element} element 元素
     * @return {Vector} 点
     */
    function getSymbolCenter(element) {
        var topLeft = getTopLeft(element);
        var size = wrapSize(element);

        var rect = wrapRectByTopLeft(topLeft, size);
        return rect.getCenterVector();
    }

    /**
     * 获取元素的 矩形
     * @param element
     * @returns {Rectangle}
     */
    function getSymbolRect(element) {
        const size = wrapSize(element);
        const center = getSymbolCenter(element);

        const finalRect = wrapRectByCenter(center, size);
        return finalRect;
    };
    var getSymbolBounds = getSymbolRect;

    /**
     * 获取舞台中心点坐标
     * @return {Vector} 点
     */
    function getStageCenter() {
        var doc = fl.getDocumentDOM();

        var rect = new Rectangle(doc);
        var stageCenter = rect.getCenterVector();
        return stageCenter;
    }

    /**
     * 获取舞台矩形
     * @return {Rectangle} 矩形对象
     */
    function getStageRect() {
        var doc = fl.getDocumentDOM();
        var rect = new Rectangle(doc);
        return rect;
    }

    var getStageBounds = getStageRect;

    /**
     * 获取舞台尺寸
     * @return {Size} 尺寸对象
     */
    function getStageSize() {
        var doc = fl.getDocumentDOM();
        return wrapSize(doc);
    }

    /**
     * 获取摄像机矩形
     * @param {Timeline} timeline 时间轴
     * @param {number} frameIndex 帧索引
     * @return {Rectangle} 矩形对象
     */
    function getCameraRect(timeline, frameIndex) {
        const { width: stageWidth, height: stageHeight } = getStageSize();

        var cameraPos = wrapPosition(timeline.camera.getPosition(frameIndex));
        var cameraZoomRatio = timeline.camera.getZoom(frameIndex) / 100;
        // var stageWidth = doc.width;
        // var stageHeight = doc.height;
        var cameraRect = new Rectangle(-cameraPos.x, -cameraPos.y, -cameraPos.x + stageWidth / cameraZoomRatio, -cameraPos.y + stageHeight / cameraZoomRatio);
        return cameraRect;
    }

    var getCameraBounds = getCameraRect;

    /**
     * 获取摄像机中心点坐标
     * @param {Timeline} timeline 时间轴
     * @param {number} frameIndex 帧索引
     * @return {Vector} 点
     */
    function getCameraCenter(timeline, frameIndex) {
        return getCameraRect(timeline, frameIndex).getCenterVector();
    }


    SAT_GLOBALS["wrapRectByTopLeft"] = wrapRectByTopLeft;
    SAT_GLOBALS["wrapRectByCenter"] = wrapRectByCenter;
    SAT_GLOBALS["findBoundingRectangle"] = findBoundingRectangle;

    SAT_GLOBALS["getSymbolCenter"] = getSymbolCenter;
    SAT_GLOBALS["getStageCenter"] = getStageCenter;

    SAT_GLOBALS["getSymbolRect"] = getSymbolRect;
    SAT_GLOBALS["getSymbolBounds"] = getSymbolBounds;

    SAT_GLOBALS["getStageBounds"] = getStageBounds;
    SAT_GLOBALS["getStageRect"] = getStageRect;

    SAT_GLOBALS["getStageSize"] = getStageSize;

    SAT_GLOBALS["getCameraRect"] = getCameraRect;
    SAT_GLOBALS["getCameraBounds"] = getCameraBounds;

    SAT_GLOBALS["getCameraCenter"] = getCameraCenter;


    /**
     * 当前对象是否与 RectangleLike 对象相等
     * @param {Rectangle|RectangleLike} obj 矩形对象
     * @returns {boolean} 相等返回true，否则返回false
     * @private
     */
    function IsRectangleLike(obj) {
        return (obj && typeof obj === "object" && typeof obj.left === "number" && typeof obj.top === "number" && typeof obj.right === "number" && typeof obj.bottom === "number");
    }

    SAT_CHECk["IsRectangleLike"] = IsRectangleLike;

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     __     ______     ______
    // /\  ___\   /\ \   /\___  \   /\  ___\
    // \ \___  \  \ \ \  \/_/  /__  \ \  __\
    //  \/\_____\  \ \_\   /\_____\  \ \_____\
    //   \/_____/   \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // Size
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
        SObject.apply(this, arguments);

        this.width = width;
        this.height = height;
    }

    SAT["Size"] = Size;
    SAT["S"] = Size;

    INHERIT_MACRO(Size, SObject);

    Object.defineProperty(Size.prototype, "ratio", {
        get: function() {
            return this.width / this.height;
        }
    });
    Object.defineProperty(Size.prototype, "max_size", {
        get: function() {
            return Math.max(this.width, this.height);
        }
    });
    Object.defineProperty(Size.prototype, "min_size", {
        get: function() {
            return Math.min(this.width, this.height);
        }
    });


    /**
     * 相加两个尺寸
     * @param {Size} size 尺寸
     * @returns {Size} 尺寸
     */
    Size.prototype.add = function(size) {
        return new Size(this.width + size.width, this.height + size.height);
    };
    /**
     * 相减两个尺寸
     * @param {Size} size 尺寸
     * @returns {Size} 尺寸
     */
    Size.prototype.sub = function(size) {
        return new Size(this.width - size.width, this.height - size.height);
    };

    Size.prototype.getRatioWidth = function(nowHeight) {
        return this.ratio * nowHeight;
    };

    Size.prototype.getRatioHeight = function(nowWidth) {
        return nowWidth / this.ratio;
    };

    Size.prototype.toVector = function() {
        return new Vector(this.width, this.height);
    };
    Size.from = wrapSize;

    function wrapSize(element) {
        return new Size(element.width, element.height);
    }

    SAT_GLOBALS["wrapSize"] = wrapSize;

    function IsSizeLike(obj) {
        return (obj && typeof obj === "object" && typeof obj.width === "number" && typeof obj.height === "number");
    }

    SAT_CHECk["IsSizeLike"] = IsSizeLike;

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     __         ______
    // /\  ___\   /\  ___\   /\  __ \   /\ \       /\  ___\
    // \ \___  \  \ \ \____  \ \  __ \  \ \ \____  \ \  __\
    //  \/\_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \_____\
    //   \/_____/   \/_____/   \/_/\/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // Scale
    function Scale(scaleX, scaleY) {
        SObject.apply(this, arguments);

        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

    SAT["Scale"] = Scale;
    SAT["SC"] = Scale;

    INHERIT_MACRO(Scale, SObject);


    Scale.prototype.toVector = function() {
        return new Vector(this.scaleX, this.scaleY);
    };
    Scale.from = wrapScale;

    function IsScaleLike(obj) {
        return (obj && typeof obj === "object" && typeof obj.scaleX === "number" && typeof obj.scaleY === "number");
    }

    SAT_CHECk["IsScaleLike"] = IsScaleLike;

    /**
     * 转换为Scale对象
     * @param {ScaleLike|Element|Scale} element 缩放对象
     * @return {Scale}
     */
    function wrapScale(element) {
        return new Scale(element.scaleX, element.scaleY);
    }

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     __  __     ______     __     __
    // /\  ___\   /\ \/ /    /\  ___\   /\ \  _ \ \
    // \ \___  \  \ \  _"-.  \ \  __\   \ \ \/ ".\ \
    //  \/\_____\  \ \_\ \_\  \ \_____\  \ \__/".~\_\
    //   \/_____/   \/_/\/_/   \/_____/   \/_/   \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // Skew
    function Skew(skewX, skewY) {
        this.skewX = skewX;
        this.skewY = skewY;
    }

    SAT["Skew"] = Skew;
    SAT["SK"] = Skew;

    INHERIT_MACRO(Scale, SObject);

    Skew.prototype.toVector = function() {
        return new Vector(this.skewX, this.skewY);
    };

    function IsSkewLike(obj) {
        return (obj && typeof obj === "object" && typeof obj.skewX === "number" && typeof obj.skewY === "number");
    }

    SAT_CHECk["IsSkewLike"] = IsSkewLike;

    /**
     * 转换为Skew对象
     * @param {Element|Skew|SkewLike} element 斜切对象
     * @return {Skew}
     */
    function wrapSkew(element) {
        return new Skew(element.skewX, element.skewY);
    }


    // ------------------------------------------------------------------------------------------------------------------------
    //  ______   ______     ______     __   __     ______     ______   ______
    // /\__  _\ /\  == \   /\  __ \   /\ "-.\ \   /\  ___\   /\  ___\ /\  __ \
    // \/_/\ \/ \ \  __<   \ \  __ \  \ \ \-.  \  \ \___  \  \ \  __\ \ \ \/\ \
    //    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\\"\_\  \/\_____\  \ \_\    \ \_____\
    //     \/_/   \/_/ /_/   \/_/\/_/   \/_/ \/_/   \/_____/   \/_/     \/_____/
    //
    //  ______     __    __
    // /\  == \   /\ "-./  \
    // \ \  __<   \ \ \-./\ \
    //  \ \_\ \_\  \ \_\ \ \_\
    //   \/_/ /_/   \/_/  \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // Transform
    //
    // Represents a transform with `rotation`, `scale`, `position`, `size`, and `skew` properties.

    /**
     * 转换对象
     * @param element 要转换的对象
     * @constructor
     * @class Transform
     */
    function Transform(element) {
        SObject.apply(this, arguments);

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

    SAT["Transform"] = Transform;
    SAT["TR"] = Transform;

    INHERIT_MACRO(Scale, SObject);

    Transform.prototype.setRotation = function(rotation) {
        this.element.rotation = rotation;
        this.rotation = rotation;
        return this;
    };

    // moveSelectionBy
    Transform.prototype.moveSelectionBy = function(distanceToMove) {
        this.element.x += distanceToMove.x;
        this.element.y += distanceToMove.y;
        this.position = this.position.clone().add(distanceToMove);
        return this;
    };
    /**
     * 设置缩放
     * @param {Vector|Scale} scale 缩放比例
     * @return {Transform} Transform
     */
    Transform.prototype.setScale = function(scale) {
        // 兼容性处理
        if (IsVectorLike(scale)) scale = scale.toScale();

        this.element.scaleX = scale.scaleX;
        this.element.scaleY = scale.scaleY;
        this.scale = scale;
        return this;
    };
    Transform.prototype.setPosition = function(position) {
        this.element.x = position.x;
        this.element.y = position.y;
        this.position = position;
        return this;
    };
    Transform.prototype.setSize = function(size) {
        this.element.width = size.width;
        this.element.height = size.height;
        this.size = size;
        return this;
    };
    /**
     * 设置倾斜
     * @param {Vector|Skew} skew 倾斜角度
     * @return {Transform} Transform
     */
    Transform.prototype.setSkew = function(skew) {
        // 兼容性处理
        if (IsVectorLike(skew)) skew = skew.toSkew();

        this.element.skewX = skew.skewX;
        this.element.skewY = skew.skewY;
        this.skew = skew;
        return this;
    };
    Transform.from = wrapTransform;

    /**
     * 包装一个对象为Transform对象
     * @param {Element} element 要包装的对象
     * @return {Transform} Transform
     */
    function wrapTransform(element) {
        return new Transform(element);
    }

    SAT_GLOBALS["wrapTransform"] = wrapTransform;

    function IsTransformLike(obj) {
        return (obj && typeof obj === "object" && typeof obj.rotation === "number" && IsVectorLike(obj.scale) && IsVectorLike(obj.position) && IsSizeLike(obj.size) && IsVectorLike(obj.skew));
    }

    SAT_CHECk["IsTransformLike"] = IsTransformLike;


    // ------------------------------------------------------------------------------------------------------------------------
    //  ______   ______     ______     __    __     ______     ______     ______
    // /\  ___\ /\  == \   /\  __ \   /\ "-./  \   /\  ___\   /\  == \   /\  __ \
    // \ \  __\ \ \  __<   \ \  __ \  \ \ \-./\ \  \ \  __\   \ \  __<   \ \  __ \
    //  \ \_\    \ \_\ \_\  \ \_\ \_\  \ \_\ \ \_\  \ \_____\  \ \_\ \_\  \ \_\ \_\
    //   \/_/     \/_/ /_/   \/_/\/_/   \/_/  \/_/   \/_____/   \/_/ /_/   \/_/\/_/
    //
    //  __   __     ______     ______
    // /\ "-.\ \   /\  ___\   /\  ___\
    // \ \ \-.  \  \ \ \__ \  \ \  __\
    //  \ \_\\"\_\  \ \_____\  \ \_____\
    //   \/_/ \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // FrameRange
    /**
     * 帧范围类
     * 左闭右开区间 [startFrame, endFrame)
     * @param {number} layerIndex 图层索引
     * @param {number} startFrame 开始帧
     * @param {number} [endFrame=startFrame+1] 结束帧
     * @constructor
     */
    function FrameRange(layerIndex, startFrame, endFrame) {
        SObject.apply(this, arguments);

        this.layerIndex = layerIndex;
        this.startFrame = startFrame;
        this.endFrame = endFrame || startFrame + 1;
    }

    SAT["FrameRange"] = FrameRange;
    SAT["FR"] = FrameRange;

    INHERIT_MACRO(FrameRange, SObject);

    /**
     * 帧范围的持续时间
     * @property {number} duration
     * @type {number}
     */
    Object.defineProperty(FrameRange.prototype, "duration", {
        get: function() {
            return this.endFrame - this.startFrame;
        }
    });


    /**
     * 判断两个帧范围是否有重叠
     * @param {FrameRange} other 另一个帧范围
     * @return {boolean} 是否有重叠
     */
    FrameRange.prototype.intersects = function(other) {
        return this.startFrame <= other.endFrame && other.startFrame <= this.endFrame;
    };

    /**
     * 判断 当前 FrameRange 是否包含   fr2 选中范围
     * @param {FrameRange|number} fr2 选中范围数组
     * @return {boolean} 是否包含
     */
    FrameRange.prototype.contain = function(fr2) {
        // contain(frameIndex: number) : boolean;
        if (typeof fr2 === "number") {
            return this.startFrame <= fr2 && this.endFrame > fr2;
        } else if (IsFrameRangeLike(fr2)) {
            if (this.layerIndex !== fr2.layerIndex) {
                return false;
            }
            return this.startFrame <= fr2.startFrame && this.endFrame >= fr2.endFrame;
        } else {
            throw new Error("Invalid argument type : "+fr2);
        }
    };

    /**
     * 转换为数组
     * @return {[number, number, number]} 数组
     */
    FrameRange.prototype.toArray = function() {
        return [this.layerIndex, this.startFrame, this.endFrame];
    };

    /**
     * 获取当前帧范围的第一帧
     * @return {FrameRange} 第一帧范围
     */
    FrameRange.prototype.getFirstFrame = function() {
        var fr = this.clone();
        fr.endFrame = fr.startFrame + 1;
        return fr;
    };

    function IsFrameRangeLike(obj) {
        return (obj && typeof obj === "object" && typeof obj.layerIndex === "number" && typeof obj.startFrame === "number" && typeof obj.endFrame === "number");
    }

    SAT_CHECk["IsFrameRangeLike"] = IsFrameRangeLike;

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______   ______     ______     __    __     ______     ______     ______
    // /\  ___\ /\  == \   /\  __ \   /\ "-./  \   /\  ___\   /\  == \   /\  __ \
    // \ \  __\ \ \  __<   \ \  __ \  \ \ \-./\ \  \ \  __\   \ \  __<   \ \  __ \
    //  \ \_\    \ \_\ \_\  \ \_\ \_\  \ \_\ \ \_\  \ \_____\  \ \_\ \_\  \ \_\ \_\
    //   \/_/     \/_/ /_/   \/_/\/_/   \/_/  \/_/   \/_____/   \/_/ /_/   \/_/\/_/
    //
    //  __   __     ______     ______     __         __     ______     ______
    // /\ "-.\ \   /\  ___\   /\  ___\   /\ \       /\ \   /\  ___\   /\__  _\
    // \ \ \-.  \  \ \ \__ \  \ \  __\   \ \ \____  \ \ \  \ \___  \  \/_/\ \/
    //  \ \_\\"\_\  \ \_____\  \ \_____\  \ \_____\  \ \_\  \/\_____\    \ \_\
    //   \/_/ \/_/   \/_____/   \/_____/   \/_____/   \/_/   \/_____/     \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // FrameRangeList

    /**
     * 帧列表类，继承自 Array
     * @constructor
     */
    function FrameRangeList() {
        Array.apply(this, arguments); // 调用 Array 的构造函数
        SObject.apply(this, arguments);
    }

    SAT["FrameRangeList"] = FrameRangeList;
    SAT["FRL"] = FrameRangeList;

    INHERIT_MACRO(FrameRangeList, Array);
    // INHERIT_MACRO(FrameRangeList, SObject);
    Object.assign(FrameRangeList.prototype, SObject.prototype);
    Object.assign(FrameRangeList, SObject);


    Object.defineProperty(FrameRangeList.prototype, "firstSlFrameIndex", {
        get: function() {
            if (this.length === 0) {
                return null;
            }
            return this[0].startFrame;
        }
    });
    Object.defineProperty(FrameRangeList.prototype, "firstSlLayerIndex", {
        get: function() {
            if (this.length === 0) {
                return null;
            }
            return this[0].layerIndex;
        }
    });
    Object.defineProperty(FrameRangeList.prototype, "firstSlLayer", {
        get: function() {
            if (this.length === 0) {
                return null;
            }
            var doc = fl.getDocumentDOM(); //文档对象
            var timeline = doc.getTimeline(); //时间轴
            var layers = timeline.layers; //图层

            var layerIndex = this.firstSlLayerIndex;

            return layers[layerIndex];
        }
    });
    Object.defineProperty(FrameRangeList.prototype, "firstSlFrame", {
        get: function() {
            if (this.length === 0) {
                return null;
            }
            var doc = fl.getDocumentDOM(); //文档对象
            var timeline = doc.getTimeline(); //时间轴

            var layers = timeline.layers; //图层
            var curLayerIndex = timeline.currentLayer; //当前图层索引
            var curLayer = layers[curLayerIndex]; //当前图层

            var frames = curLayer.frames; //当前图层的帧列表
            var curFrameIndex = timeline.currentFrame; //当前帧索引
            var curFrame = frames[curFrameIndex]; //当前帧

            var frameIndex = this.firstSlFrameIndex;
            // console.log("firstSlFrameIndex=" + frameIndex);

            return frames[frameIndex];
        }
    });


    /**
     * 从列表中过滤出不重复的 layerIndex
     * @returns {Array<number>} 不重复的 layerIndex 列表
     */
    FrameRangeList.prototype.getUniqueLayerIndexes = function() {
        var uniqueLayerIndexes = [];
        for (var i = 0; i < this.length; i++) {
            var currentLayerIndex = this[i].layerIndex;
            if (!uniqueLayerIndexes.includes(currentLayerIndex)) {
                uniqueLayerIndexes.push(currentLayerIndex);
            }
        }
        return uniqueLayerIndexes;
    };


    function IsElementBoundsLike(obj) {
        return (obj && typeof obj === "object" && typeof obj.left === "number" && typeof obj.top === "number" && typeof obj.width === "number" && typeof obj.height === "number");
    }

    SAT_CHECk["IsElementBoundsLike"] = IsElementBoundsLike;

    // ------------------------------------------------------------------------------------------------------------------------
    //  __         __     __   __     ______     ______     ______     ______
    // /\ \       /\ \   /\ "-.\ \   /\  ___\   /\  ___\   /\  ___\   /\  ___\
    // \ \ \____  \ \ \  \ \ \-.  \  \ \  __\   \ \___  \  \ \  __\   \ \ \__ \
    //  \ \_____\  \ \_\  \ \_\\"\_\  \ \_____\  \/\_____\  \ \_____\  \ \_____\
    //   \/_____/   \/_/   \/_/ \/_/   \/_____/   \/_____/   \/_____/   \/_____/
    //
    //  __    __     ______     __   __     ______
    // /\ "-./  \   /\  ___\   /\ "-.\ \   /\__  _\
    // \ \ \-./\ \  \ \  __\   \ \ \-.  \  \/_/\ \/
    //  \ \_\ \ \_\  \ \_____\  \ \_\\"\_\    \ \_\
    //   \/_/  \/_/   \/_____/   \/_/ \/_/     \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // LineSegment
    /**
     * 线段类
     * @param {Vector} startPoint 起点
     * @param {Vector} endPoint 终点
     * @constructor
     */
    function LineSegment(startPoint, endPoint) {
        SObject.apply(this, arguments);

        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    SAT["LineSegment"] = LineSegment;
    SAT["LS"] = LineSegment;

    INHERIT_MACRO(LineSegment, SObject);

    LineSegment.prototype.toVector = function() {
        var dx = this.endPoint.x - this.startPoint.x;
        var dy = this.endPoint.y - this.startPoint.y;
        return new Vector(dx, dy);
    };

    LineSegment.prototype.getBounds = function() {
        var left = Math.min(this.startPoint.x, this.endPoint.x);
        var top = Math.min(this.startPoint.y, this.endPoint.y);
        var right = Math.max(this.startPoint.x, this.endPoint.x);
        var bottom = Math.max(this.startPoint.y, this.endPoint.y);
        return {
            left: left, top: top, width: right - left, height: bottom - top
        };
    };

    LineSegment.prototype.getCenter = function() {
        var x = (this.startPoint.x + this.endPoint.x) / 2;
        var y = (this.startPoint.y + this.endPoint.y) / 2;
        return new Vector(x, y);
    };

    LineSegment.prototype.getLength = function() {
        var dx = this.endPoint.x - this.startPoint.x;
        var dy = this.endPoint.y - this.startPoint.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    LineSegment.prototype.getAngle = function() {
        var dx = this.endPoint.x - this.startPoint.x;
        var dy = this.endPoint.y - this.startPoint.y;
        return Math.atan2(dy, dx);
    };

    LineSegment.prototype.getNormal = function() {
        var dx = this.endPoint.x - this.startPoint.x;
        var dy = this.endPoint.y - this.startPoint.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        var normal = new Vector(-dy / length, dx / length);
        return normal;
    };

    LineSegment.prototype.getPointAt = function(t) {
        var x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * t;
        var y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * t;
        return new Vector(x, y);
    };

    LineSegment.prototype.getNearestPointTo = function(point) {
        var dx = this.endPoint.x - this.startPoint.x;
        var dy = this.endPoint.y - this.startPoint.y;
        var a = dx * dx + dy * dy;
        var b = 2 * (dx * (this.startPoint.x - point.x) + dy * (this.startPoint.y - point.y));
        var c = (this.startPoint.x - point.x) * (this.startPoint.x - point.x) + (this.startPoint.y - point.y) * (this.startPoint.y - point.y) - 1;
        var t = Math.max(0, Math.min(1, (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)));
        var x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * t;
        var y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * t;
        return new Vector(x, y);
    };

    LineSegment.prototype.getDistanceToPoint = function(point) {
        var nearestPoint = this.getNearestPointTo(point);
        var dx = nearestPoint.x - point.x;
        var dy = nearestPoint.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // static from(startPoint: Vector, direction: DirectionType,distance: number): LineSegment;
    /**
     * 从起点出发，方向为 direction，距离为 distance 的线段
     * @param {Vector} startPoint 起点
     * @param {DirectionType} direction 方向
     * @param {number} distance 距离
     * @return {LineSegment} 线段
     */
    LineSegment.from = function(startPoint, direction, distance) {
        var endPoint = getOrigin();
        switch (direction) {
            case "left":
                endPoint = startPoint.clone().add(new Vector(-distance, 0));
                break;
            case "top":
                endPoint = startPoint.clone().add(new Vector(0, -distance));
                break;
            case "right":
                endPoint = startPoint.clone().add(new Vector(distance, 0));
                break;
            case "bottom":
                endPoint = startPoint.clone().add(new Vector(0, distance));
                break;
            default:
                throw new Error("Invalid direction: " + direction);
        }
        return new LineSegment(startPoint, endPoint);
    };


    function IsLineSegmentLike(obj) {
        return (obj && typeof obj === "object" && IsVectorLike(obj.startPoint) && IsVectorLike(obj.endPoint));
    }

    SAT_CHECk["IsLineSegmentLike"] = IsLineSegmentLike;


    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     __     ______     ______     __         ______
    // /\  ___\   /\ \   /\  == \   /\  ___\   /\ \       /\  ___\
    // \ \ \____  \ \ \  \ \  __<   \ \ \____  \ \ \____  \ \  __\
    //  \ \_____\  \ \_\  \ \_\ \_\  \ \_____\  \ \_____\  \ \_____\
    //   \/_____/   \/_/   \/_/ /_/   \/_____/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // Circle
    /**
     * 圆类
     * @param {Vector} pos 圆心
     * @param {number} r 半径
     * @constructor
     */
    function Circle(pos, r) {
        SObject.apply(this, arguments);

        this.pos = pos;
        this.r = r;
    }

    SAT["Circle"] = Circle;
    SAT["C"] = Circle;

    INHERIT_MACRO(Circle, SObject);

    Circle.prototype.toVector = function() {
        return this.pos.clone();
    };

    // d
    Object.defineProperty(Circle.prototype, "d", {
        get: function() {
            return 2 * this.r;
        }
    });

    Circle.prototype.getBounds = function() {
        var left = this.pos.x - this.r;
        var top = this.pos.y - this.r;
        var right = this.pos.x + this.r;
        var bottom = this.pos.y + this.r;
        return new Rectangle(left, top, right, bottom);
    };

    Circle.prototype.getArea = function() {
        return Math.PI * this.r * this.r;
    };

    Circle.prototype.getCentroid = function() {
        return this.pos.clone();
    };

    Circle.prototype.getDistanceToPoint = function(point) {
        var dx = this.pos.x - point.x;
        var dy = this.pos.y - point.y;
        return Math.sqrt(dx * dx + dy * dy) - this.r;
    };

    Circle.prototype.getDistanceToSegment = function(segment) {
        var nearestPoint = segment.getNearestPointTo(this.pos);
        return this.getDistanceToPoint(nearestPoint);
    };

    Circle.prototype.containsPoint = function(point) {
        return this.getDistanceToPoint(point) <= 0;
    };

    function IsCircleLike(obj) {
        return (obj && typeof obj === "object" && IsVectorLike(obj.pos) && typeof obj.r === "number");
    }

    SAT_CHECk["IsCircleLike"] = IsCircleLike;

    var SAT_ENTITY = {
        ELEMENT: {
            getOrigin: getOrigin,
            getTopLeft: getTopLeft
        },
        SYMBOL: {
            getCenter: getSymbolCenter,
            getBounds: getSymbolBounds
        },
        STAGE: {
            getCenter: getStageCenter,
            getBounds: getStageBounds,
            getSize: getStageSize
        },
        CAMERA: {
            getBounds: getCameraBounds,
            getCenter: getCameraCenter
        }
    };


    SAT["GLOBALS"] = SAT_GLOBALS;
    SAT["CHECk"] = SAT_CHECk;
    SAT["ENTITY"] = SAT_ENTITY;

    return SAT;
}));

