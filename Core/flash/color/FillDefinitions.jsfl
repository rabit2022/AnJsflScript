/**
 * @file: FillDefinitions.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/4 20:58
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    var FILLS = {};
    var FILL_BUILDERS = {};
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     ______     ______   __     __         __
    // /\  == \   /\  __ \   /\  ___\   /\  ___\   /\  ___\ /\ \   /\ \       /\ \
    // \ \  __<   \ \  __ \  \ \___  \  \ \  __\   \ \  __\ \ \ \  \ \ \____  \ \ \____
    //  \ \_____\  \ \_\ \_\  \/\_____\  \ \_____\  \ \_\    \ \_\  \ \_____\  \ \_____\
    //   \/_____/   \/_/\/_/   \/_____/   \/_____/   \/_/     \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BaseFill
    // region BaseFill
    /**
     * 基类 BaseFill
     * @constructor
     * @class
     * @param {string} style - 填充样式
     */
    function BaseFill(style) {
        /**
         * 填充样式
         * @type {string}
         * @values ["bitmap", "solid", "linearGradient", "radialGradient", "noFill"]
         */
        this.style = style || "solid";
    }

    BaseFill.toString = function () {
        return "[class BaseFill]";
    };
    // endregion BaseFill
    // ------------------------------------------------------------------------------------------------------------------------
    //  __   __     ______     ______   __     __         __
    // /\ "-.\ \   /\  __ \   /\  ___\ /\ \   /\ \       /\ \
    // \ \ \-.  \  \ \ \/\ \  \ \  __\ \ \ \  \ \ \____  \ \ \____
    //  \ \_\\"\_\  \ \_____\  \ \_\    \ \_\  \ \_____\  \ \_____\
    //   \/_/ \/_/   \/_____/   \/_/     \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // NoFill
    // region NoFill
    /**
     * 无填充
     * @constructor
     * @class
     * @extends BaseFill
     */
    function NoFill() {
        BaseFill.call(this, "noFill");
    }

    NoFill.prototype = Object.create(BaseFill.prototype);
    NoFill.prototype.constructor = NoFill;

    FILLS["NoFill"] = NoFill;

    NoFill.toString = function () {
        return "[class NoFill]";
    };
    // endregion NoFill
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     __         __     _____     ______   __     __         __
    // /\  ___\   /\  __ \   /\ \       /\ \   /\  __-.  /\  ___\ /\ \   /\ \       /\ \
    // \ \___  \  \ \ \/\ \  \ \ \____  \ \ \  \ \ \/\ \ \ \  __\ \ \ \  \ \ \____  \ \ \____
    //  \/\_____\  \ \_____\  \ \_____\  \ \_\  \ \____-  \ \_\    \ \_\  \ \_____\  \ \_____\
    //   \/_____/   \/_____/   \/_____/   \/_/   \/____/   \/_/     \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // SolidFill
    // region SolidFill
    /**
     * 固体填充
     * @constructor
     * @class
     * @extends BaseFill
     */
    function SolidFill() {
        BaseFill.call(this, "solid");

        /**
         * 填充颜色
         * @type {string|number}
         * @example "#000000" 或 0x000000 或 0
         */
        this.color = "#000000";
    }

    SolidFill.prototype = Object.create(BaseFill.prototype);
    SolidFill.prototype.constructor = SolidFill;
    FILLS["SolidFill"] = SolidFill;
    SolidFill.toString = function () {
        return "[class SolidFill]";
    };
    // endregion SolidFill
    // ------------------------------------------------------------------------------------------------------------------------
    //  __         __     __   __     ______     ______     ______     ______     ______     ______
    // /\ \       /\ \   /\ "-.\ \   /\  ___\   /\  __ \   /\  == \   /\  ___\   /\  == \   /\  __ \
    // \ \ \____  \ \ \  \ \ \-.  \  \ \  __\   \ \  __ \  \ \  __<   \ \ \__ \  \ \  __<   \ \  __ \
    //  \ \_____\  \ \_\  \ \_\\"\_\  \ \_____\  \ \_\ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_\ \_\
    //   \/_____/   \/_/   \/_/ \/_/   \/_____/   \/_/\/_/   \/_/ /_/   \/_____/   \/_/ /_/   \/_/\/_/
    //
    //  _____     __     ______     __   __     ______   ______   __     __         __
    // /\  __-.  /\ \   /\  ___\   /\ "-.\ \   /\__  _\ /\  ___\ /\ \   /\ \       /\ \
    // \ \ \/\ \ \ \ \  \ \  __\   \ \ \-.  \  \/_/\ \/ \ \  __\ \ \ \  \ \ \____  \ \ \____
    //  \ \____-  \ \_\  \ \_____\  \ \_\\"\_\    \ \_\  \ \_\    \ \_\  \ \_____\  \ \_____\
    //   \/____/   \/_/   \/_____/   \/_/ \/_/     \/_/   \/_/     \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // LinearGradientFill
    // region LinearGradientFill
    /**
     * 线性渐变填充
     * @constructor
     * @class
     * @extends BaseFill
     */
    function LinearGradientFill() {
        BaseFill.call(this, "linearGradient");

        /**
         * 渐变中颜色的数组
         * @type {Array.<string|number>}
         */
        this.colorArray = [];

        /**
         * 渐变中颜色的位置数组
         * @type {Array.<number>}
         */
        this.posArray = [];

        /**
         * 矩阵对象，定义渐变填充的位置、方向和缩放
         * @type {Object}
         */
        this.matrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            tx: 0,
            ty: 0
        };

        /**
         * 是否将填充呈现为线性 RGB 渐变
         * @type {boolean}
         * @values [true, false]
         */
        this.linearRGB = false;

        /**
         * 渐变的溢出行为
         * @type {string}
         * @values ["extend", "repeat", "reflect"]
         */
        this.overflow = "extend";
    }

    LinearGradientFill.prototype = Object.create(BaseFill.prototype);
    LinearGradientFill.prototype.constructor = LinearGradientFill;

    FILLS["LinearGradientFill"] = LinearGradientFill;

    LinearGradientFill.toString = function () {
        return "[class LinearGradientFill]";
    };
    // endregion LinearGradientFill

    // region LinearGradientFillBuilder
    /**
     * 线性渐变填充构造器
     * @constructor
     * @class
     */
    function LinearGradientFillBuilder() {
        this.fill = new LinearGradientFill();
    }

    FILL_BUILDERS["LinearGradientFill"] = LinearGradientFillBuilder;

    /**
     * 添加颜色停止点
     * @param {number} pos - 颜色位置
     * @param {string|number} color - 颜色值
     * @returns {LinearGradientFillBuilder}
     */
    LinearGradientFillBuilder.prototype.addColorStop = function (pos, color) {
        this.fill.colorArray.push(color);
        this.fill.posArray.push(pos);
        return this;
    };
    /**
     * 设置矩阵
     * @param {number} a - 缩放或旋转缩放值
     * @param {number} b - 旋转值
     * @param {number} c - 旋转值
     * @param {number} d - 缩放或旋转缩放值
     * @param {number} tx - 平移值
     * @param {number} ty - 平移值
     * @returns {LinearGradientFillBuilder}
     */
    LinearGradientFillBuilder.prototype.setMatrix = function (a, b, c, d, tx, ty) {
        this.fill.matrix.a = a;
        this.fill.matrix.b = b;
        this.fill.matrix.c = c;
        this.fill.matrix.d = d;
        this.fill.matrix.tx = tx;
        this.fill.matrix.ty = ty;
        return this;
    };
    /**
     * 设置是否呈现为线性 RGB 渐变
     * @param {boolean} linearRGB - 是否呈现为线性 RGB 渐变
     * @returns {LinearGradientFillBuilder}
     */
    LinearGradientFillBuilder.prototype.setLinearRGB = function (linearRGB) {
        this.fill.linearRGB = linearRGB;
        return this;
    };
    /**
     * 设置溢出行为
     * @param {string} overflow - 渐变的溢出行为
     * @returns {LinearGradientFillBuilder}
     */
    LinearGradientFillBuilder.prototype.setOverflow = function (overflow) {
        this.fill.overflow = overflow;
        return this;
    };
    /**
     * 构建线性渐变填充
     * @returns {LinearGradientFill}
     */
    LinearGradientFillBuilder.prototype.build = function () {
        return this.fill;
    };
    // endregion LinearGradientFillBuilder

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     _____     __     ______     __         ______     ______     ______
    // /\  == \   /\  __ \   /\  __-.  /\ \   /\  __ \   /\ \       /\  ___\   /\  == \   /\  __ \
    // \ \  __<   \ \  __ \  \ \ \/\ \ \ \ \  \ \  __ \  \ \ \____  \ \ \__ \  \ \  __<   \ \  __ \
    //  \ \_\ \_\  \ \_\ \_\  \ \____-  \ \_\  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_\ \_\
    //   \/_/ /_/   \/_/\/_/   \/____/   \/_/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_/\/_/
    //
    //  _____     __     ______     __   __     ______   ______   __     __         __
    // /\  __-.  /\ \   /\  ___\   /\ "-.\ \   /\__  _\ /\  ___\ /\ \   /\ \       /\ \
    // \ \ \/\ \ \ \ \  \ \  __\   \ \ \-.  \  \/_/\ \/ \ \  __\ \ \ \  \ \ \____  \ \ \____
    //  \ \____-  \ \_\  \ \_____\  \ \_\\"\_\    \ \_\  \ \_\    \ \_\  \ \_____\  \ \_____\
    //   \/____/   \/_/   \/_____/   \/_/ \/_/     \/_/   \/_/     \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // RadialGradientFill
    // region RadialGradientFill
    /**
     * 径向渐变填充
     * @constructor
     * @class
     * @extends BaseFill
     */
    function RadialGradientFill() {
        BaseFill.call(this, "radialGradient");

        /**
         * 渐变中颜色的数组
         * @type {Array.<string|number>}
         */
        this.colorArray = [];

        /**
         * 渐变中颜色的位置数组
         * @type {Array.<number>}
         */
        this.posArray = [];

        /**
         * 矩阵对象，定义渐变填充的位置、方向和缩放
         * @type {Object}
         */
        this.matrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            tx: 0,
            ty: 0
        };

        /**
         * 渐变焦点距离变形点的水平偏移量
         * @type {number}
         */
        this.focalPoint = 0;

        /**
         * 是否将填充呈现为线性 RGB 渐变
         * @type {boolean}
         * @values [true, false]
         */
        this.linearRGB = false;

        /**
         * 渐变的溢出行为
         * @type {string}
         * @values ["extend", "repeat", "reflect"]
         */
        this.overflow = "extend";
    }

    RadialGradientFill.prototype = Object.create(BaseFill.prototype);
    RadialGradientFill.prototype.constructor = RadialGradientFill;

    FILLS["RadialGradientFill"] = RadialGradientFill;

    RadialGradientFill.toString = function () {
        return "[class RadialGradientFill]";
    };
    // endregion RadialGradientFill

    // region RadialGradientFillBuilder
    /**
     * 径向渐变填充构造器
     * @constructor
     * @class
     */
    function RadialGradientFillBuilder() {
        this.fill = new RadialGradientFill();
    }

    FILL_BUILDERS["RadialGradientFill"] = RadialGradientFillBuilder;

    /**
     * 添加颜色停止点
     * @param {number} pos - 颜色位置
     * @param {string|number} color - 颜色值
     * @returns {RadialGradientFillBuilder}
     */
    RadialGradientFillBuilder.prototype.addColorStop = function (pos, color) {
        this.fill.colorArray.push(color);
        this.fill.posArray.push(pos);
        return this;
    };
    /**
     * 设置矩阵
     * @param {number} a - 缩放或旋转缩放值
     * @param {number} b - 旋转值
     * @param {number} c - 旋转值
     * @param {number} d - 缩放或旋转缩放值
     * @param {number} tx - 平移值
     * @param {number} ty - 平移值
     * @returns {RadialGradientFillBuilder}
     */
    RadialGradientFillBuilder.prototype.setMatrix = function (a, b, c, d, tx, ty) {
        this.fill.matrix.a = a;
        this.fill.matrix.b = b;
        this.fill.matrix.c = c;
        this.fill.matrix.d = d;
        this.fill.matrix.tx = tx;
        this.fill.matrix.ty = ty;
        return this;
    };
    /**
     * 设置渐变焦点距离变形点的水平偏移量
     * @param {number} focalPoint - 渐变焦点距离变形点的水平偏移量
     * @returns {RadialGradientFillBuilder}
     */
    RadialGradientFillBuilder.prototype.setFocalPoint = function (focalPoint) {
        this.fill.focalPoint = focalPoint;
        return this;
    };
    /**
     * 设置是否呈现为线性 RGB 渐变
     * @param {boolean} linearRGB - 是否呈现为线性 RGB 渐变
     * @returns {RadialGradientFillBuilder}
     */
    RadialGradientFillBuilder.prototype.setLinearRGB = function (linearRGB) {
        this.fill.linearRGB = linearRGB;
        return this;
    };
    /**
     * 设置溢出行为
     * @param {string} overflow - 渐变的溢出行为
     * @returns {RadialGradientFillBuilder}
     */
    RadialGradientFillBuilder.prototype.setOverflow = function (overflow) {
        this.fill.overflow = overflow;
        return this;
    };
    /**
     * 构建径向渐变填充
     * @returns {RadialGradientFill}
     */
    RadialGradientFillBuilder.prototype.build = function () {
        return this.fill;
    };
    // endregion RadialGradientFillBuilder
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     __     ______   __    __     ______     ______   ______   __     __         __
    // /\  == \   /\ \   /\__  _\ /\ "-./  \   /\  __ \   /\  == \ /\  ___\ /\ \   /\ \       /\ \
    // \ \  __<   \ \ \  \/_/\ \/ \ \ \-./\ \  \ \  __ \  \ \  _-/ \ \  __\ \ \ \  \ \ \____  \ \ \____
    //  \ \_____\  \ \_\    \ \_\  \ \_\ \ \_\  \ \_\ \_\  \ \_\    \ \_\    \ \_\  \ \_____\  \ \_____\
    //   \/_____/   \/_/     \/_/   \/_/  \/_/   \/_/\/_/   \/_/     \/_/     \/_/   \/_____/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BitmapFill
    // region BitmapFill
    /**
     * 位图填充
     * @constructor
     * @class
     * @extends BaseFill
     */
    function BitmapFill() {
        BaseFill.call(this, "bitmap");

        /**
         * 位图填充的路径和名称
         * @type {string}
         */
        this.bitmapPath = "";

        /**
         * 是否裁剪大于位图的形状的位图填充
         * @type {boolean}
         * @values [true, false]
         */
        this.bitmapIsClipped = false;
    }

    BitmapFill.prototype = Object.create(BaseFill.prototype);
    BitmapFill.prototype.constructor = BitmapFill;

    FILLS["BitmapFill"] = BitmapFill;

    BitmapFill.toString = function () {
        return "[class BitmapFill]";
    };
    // endregion BitmapFill

    // region BitmapFillBuilder
    /**
     * 位图填充构造器
     * @constructor
     * @class
     */
    function BitmapFillBuilder() {
        this.fill = new BitmapFill();
    }

    FILL_BUILDERS["BitmapFill"] = BitmapFillBuilder;

    /**
     * 设置位图路径和名称
     * @param {string} bitmapPath - 位图路径和名称
     * @returns {BitmapFillBuilder}
     */
    BitmapFillBuilder.prototype.setBitmap = function (bitmapPath) {
        this.fill.bitmapPath = bitmapPath;
        return this;
    };
    /**
     * 设置是否裁剪大于位图的形状的位图填充
     * @param {boolean} bitmapIsClipped - 是否裁剪大于位图的形状的位图填充
     * @returns {BitmapFillBuilder}
     */
    BitmapFillBuilder.prototype.setBitmapIsClipped = function (bitmapIsClipped) {
        this.fill.bitmapIsClipped = bitmapIsClipped;
        return this;
    };
    /**
     * 构建位图填充
     * @returns {BitmapFill}
     */
    BitmapFillBuilder.prototype.build = function () {
        return this.fill;
    };
    // endregion BitmapFillBuilder

    // FILTERS["BUILDERS"] = FILTER_BUILDERS;
    FILLS["BUILDERS"] = FILL_BUILDERS;

    return FILLS;
});
