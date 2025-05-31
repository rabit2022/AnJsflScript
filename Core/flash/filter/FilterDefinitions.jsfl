/**
 * @file: FilterDefinitions.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/29 20:05
 * @project: AnJsflScript
 * @description:
 * @see:http://help.adobe.com/en_US/flash/cs/extend/WSA4775F51-754E-4c47-8AAA-A3AB025E32E5.html
 */

// ------------------------------------------------------------------------------------------------------------------------
//  ______   __     __         ______   ______     ______
// /\  ___\ /\ \   /\ \       /\__  _\ /\  ___\   /\  == \
// \ \  __\ \ \ \  \ \ \____  \/_/\ \/ \ \  __\   \ \  __<
//  \ \_\    \ \_\  \ \_____\    \ \_\  \ \_____\  \ \_\ \_\
//   \/_/     \/_/   \/_____/     \/_/   \/_____/   \/_/ /_/
//
// ------------------------------------------------------------------------------------------------------------------------
// Filter
define(function () {
    var FILTERS = {};
    var FILTER_BUILDERS = {};
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     ______     ______   __     __
    // /\  == \   /\  __ \   /\  ___\   /\  ___\   /\  ___\ /\ \   /\ \
    // \ \  __<   \ \  __ \  \ \___  \  \ \  __\   \ \  __\ \ \ \  \ \ \____
    //  \ \_____\  \ \_\ \_\  \/\_____\  \ \_____\  \ \_\    \ \_\  \ \_____\
    //   \/_____/   \/_/\/_/   \/_____/   \/_____/   \/_/     \/_/   \/_____/
    //
    //  ______   ______     ______
    // /\__  _\ /\  ___\   /\  == \
    // \/_/\ \/ \ \  __\   \ \  __<
    //    \ \_\  \ \_____\  \ \_\ \_\
    //     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BaseFilter
    // region BaseFilter
    /**
     * 滤镜基类
     * @constructor
     * @param {string} name 滤镜类型名称
     */
    function BaseFilter(name) {
        /**
         * 滤镜类型名称
         * @type {string}
         */
        this.name = name;

        /**
         * 是否启用该滤镜
         * @type {boolean}
         */
        this.enabled = true;
    }

    /**
     * 设置滤镜属性
     * @param {string} prop 属性名
     * @param {*} value 属性值
     * @returns {Filter}
     */
    BaseFilter.prototype.set = function (prop, value) {
        this[prop] = value;
        return this;
    };

    /**
     * 获取滤镜属性
     * @param {string} prop 属性名
     * @returns {*}
     */
    BaseFilter.prototype.get = function (prop) {
        return this[prop];
    };

    /**
     * 复制滤镜属性
     * @param {Filter} filter 滤镜对象
     * @returns {Filter}
     */
    BaseFilter.prototype.copy = function (filter) {
        for (var prop in filter) {
            if (filter.hasOwnProperty(prop)) {
                this[prop] = filter[prop];
            }
        }
        return this;
    };

    /**
     * 克隆滤镜对象
     * @returns {Filter}
     */
    BaseFilter.prototype.clone = function () {
        var FilterConstructor = this.constructor;
        var filter = new FilterConstructor();
        filter.copy(this);
        return filter;
    };

    /**
     * 返回对象的字符串表示
     * @returns {string}
     */
    BaseFilter.prototype.toString = function () {
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
     * @returns {Object}
     */
    BaseFilter.prototype.toObj = function () {
        var obj = {};
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
                obj[prop] = this[prop];
            }
        }
        return obj;
    };

    /**
     * 从对象中创建滤镜对象
     * @param {Object} filter 对象
     * @returns {BaseFilter}
     */
    BaseFilter.from = function (filter) {
        var FilterConstructor = this.constructor;
        var filterObj = new FilterConstructor();
        filterObj.copy(filter);
        return filterObj;
    };

    /**
     * 返回对象的字符串表示
     * @returns {string}
     */
    BaseFilter.toString = function () {
        return "[class BaseFilter]";
    };
    // endregion BaseFilter

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     _____       __     __  __     ______     ______   ______     ______     __
    // /\  __ \   /\  __-.    /\ \   /\ \/\ \   /\  ___\   /\__  _\ /\  ___\   /\  __ \   /\ \
    // \ \  __ \  \ \ \/\ \  _\_\ \  \ \ \_\ \  \ \___  \  \/_/\ \/ \ \ \____  \ \ \/\ \  \ \ \____
    //  \ \_\ \_\  \ \____- /\_____\  \ \_____\  \/\_____\    \ \_\  \ \_____\  \ \_____\  \ \_____\
    //   \/_/\/_/   \/____/ \/_____/   \/_____/   \/_____/     \/_/   \/_____/   \/_____/   \/_____/
    //
    //  ______     ______     ______   __     __         ______   ______     ______
    // /\  __ \   /\  == \   /\  ___\ /\ \   /\ \       /\__  _\ /\  ___\   /\  == \
    // \ \ \/\ \  \ \  __<   \ \  __\ \ \ \  \ \ \____  \/_/\ \/ \ \  __\   \ \  __<
    //  \ \_____\  \ \_\ \_\  \ \_\    \ \_\  \ \_____\    \ \_\  \ \_____\  \ \_\ \_\
    //   \/_____/   \/_/ /_/   \/_/     \/_/   \/_____/     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // AdjustColorFilter
    // region AdjustColorFilter
    /**
     * 调整颜色  滤镜类
     * @constructor
     * @class
     */
    function AdjustColorFilter() {
        BaseFilter.call(this, "adjustColorFilter");

        /**
         * 滤镜的亮度值
         * @type {number}
         * @range [-100, 100]
         */
        this.brightness = 0;

        /**
         * 滤镜的对比度值
         * @type {number}
         * @range [-100, 100]
         */
        this.contrast = 0;

        /**
         * 滤镜的色相值
         * @type {number}
         * @range [-180, 180]
         */
        this.hue = 0;

        /**
         * 滤镜的饱和度值
         * @type {number}
         * @range [-100, 100]
         */
        this.saturation = 0;
    }

    // 继承基类
    AdjustColorFilter.prototype = Object.create(BaseFilter.prototype);
    AdjustColorFilter.prototype.constructor = AdjustColorFilter;

    // 静态属性
    AdjustColorFilter.from = BaseFilter.from;

    FILTERS["AdjustColorFilter"] = AdjustColorFilter;

    /**
     * 初始化滤镜属性
     * @param {number} brightness 亮度值
     * @param {number} contrast 对比度值
     * @param {number} hue 色相值
     * @param {number} saturation 饱和度值
     * @returns {Filter}
     */
    AdjustColorFilter.prototype.init = function (brightness, contrast, hue, saturation) {
        this.brightness = brightness;
        this.contrast = contrast;
        this.hue = hue;
        this.saturation = saturation;
        return this;
    };

    /**
     * 静态方法，返回类名的字符串表示
     * @returns {string}
     */
    AdjustColorFilter.toString = function () {
        return "[class AdjustColorFilter]";
    };
    // endregion AdjustColorFilter

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     __   __   ______     __         ______   __     __         ______
    // /\  == \   /\  ___\   /\ \ / /  /\  ___\   /\ \       /\  ___\ /\ \   /\ \       /\__  _\
    // \ \  __<   \ \  __\   \ \ \'/   \ \  __\   \ \ \____  \ \  __\ \ \ \  \ \ \____  \/_/\ \/
    //  \ \_____\  \ \_____\  \ \__|    \ \_____\  \ \_____\  \ \_\    \ \_\  \ \_____\    \ \_\
    //   \/_____/   \/_____/   \/_/      \/_____/   \/_____/   \/_/     \/_/   \/_____/     \/_/
    //
    //  ______     ______
    // /\  ___\   /\  == \
    // \ \  __\   \ \  __<
    //  \ \_____\  \ \_\ \_\
    //   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BevelFilter
    // region BevelFilter
    /**
     * 斜角滤镜类
     * @constructor
     */
    function BevelFilter() {
        BaseFilter.call(this, "bevelFilter");

        /**
         * 阴影或高光的角度（以度为单位）
         * @type {number}
         * @range [0, 360]
         */
        this.angle = 45;

        /**
         * X 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurX = 4;

        /**
         * Y 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurY = 4;

        /**
         * 滤镜效果与对象之间的距离（单位为像素）
         * @type {number}
         * @range [-255, 255]
         */
        this.distance = 4;

        /**
         * 高亮颜色
         * @type {string|number}
         */
        this.highlightColor = "#ffffff";

        /**
         * 阴影颜色
         * @type {string|number}
         */
        this.shadowColor = "#000000";

        /**
         * 滤镜的百分比强度
         * @type {number}
         * @range [0, 25500]
         */
        this.strength = 50;

        /**
         * 指定斜角或发光的类型
         * @type {string}
         * @values ["inner", "outer", "full"]
         */
        this.type = "inner";

        /**
         * 指定模糊质量
         * @type {string}
         * @values ["low", "medium", "high"]
         */
        this.quality = "medium";

        /**
         * 是否为内阴影
         * @type {boolean}
         */
        this.inner = false;

        /**
         * 是否为挖空滤镜
         * @type {boolean}
         */
        this.knockout = false;
    }

    // 继承基类
    BevelFilter.prototype = Object.create(BaseFilter.prototype);
    BevelFilter.prototype.constructor = BevelFilter;

    // 静态属性
    BevelFilter.from = BaseFilter.from;

    FILTERS["BevelFilter"] = BevelFilter;

    /**
     * 初始化滤镜属性
     * @param {number} angle 阴影或高光的角度（以度为单位）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @param {number} distance 滤镜效果与对象之间的距离（单位为像素）
     * @param {string|number} highlightColor 高亮颜色
     * @param {string|number} shadowColor 阴影颜色
     * @param {number} strength 滤镜的百分比强度
     * @param {string} type 指定斜角或发光的类型
     * @param {string} quality 指定模糊质量
     * @param {boolean} inner 是否为内阴影
     * @param {boolean} knockout 是否为挖空滤镜
     * @param {boolean} enabled 是否启用该滤镜
     * @returns {Filter}
     */
    BevelFilter.prototype.init = function (
        angle,
        blurX,
        blurY,
        distance,
        highlightColor,
        shadowColor,
        strength,
        type,
        quality,
        inner,
        knockout,
        enabled
    ) {
        this.angle = angle;
        this.blurX = blurX;
        this.blurY = blurY;
        this.distance = distance;
        this.highlightColor = highlightColor;
        this.shadowColor = shadowColor;
        this.strength = strength;
        this.type = type;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
        this.enabled = enabled;
        return this;
    };

    /**
     * 静态方法，返回类名的字符串表示
     * @returns {string}
     */
    BevelFilter.toString = function () {
        return "[class BevelFilter]";
    };
    // endregion BevelFilter

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     __         __  __     ______     ______   __     __
    // /\  == \   /\ \       /\ \/\ \   /\  == \   /\  ___\ /\ \   /\ \
    // \ \  __<   \ \ \____  \ \ \_\ \  \ \  __<   \ \  __\ \ \ \  \ \ \____
    //  \ \_____\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_\    \ \_\  \ \_____\
    //   \/_____/   \/_____/   \/_____/   \/_/ /_/   \/_/     \/_/   \/_____/
    //
    //  ______   ______     ______
    // /\__  _\ /\  ___\   /\  == \
    // \/_/\ \/ \ \  __\   \ \  __<
    //    \ \_\  \ \_____\  \ \_\ \_\
    //     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BlurFilter
    // region BlurFilter
    /**
     * 模糊滤镜类
     * @constructor
     */
    function BlurFilter() {
        BaseFilter.call(this, "blurFilter");

        /**
         * X 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurX = 4;

        /**
         * Y 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurY = 4;

        /**
         * 指定模糊质量
         * @type {string}
         * @values ["low", "medium", "high"]
         */
        this.quality = "medium";
    }

    // 继承基类
    BlurFilter.prototype = Object.create(BaseFilter.prototype);
    BlurFilter.prototype.constructor = BlurFilter;

    // 静态属性
    BlurFilter.from = BaseFilter.from;

    FILTERS["BlurFilter"] = BlurFilter;

    /**
     * 初始化滤镜属性
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @param {string} quality 指定模糊质量
     * @returns {Filter}
     */
    BlurFilter.prototype.init = function (blurX, blurY, quality, enabled) {
        this.blurX = blurX;
        this.blurY = blurY;
        this.quality = quality;
        return this;
    };

    /**
     * 静态方法，返回类名的字符串表示
     * @returns {string}
     */
    BlurFilter.toString = function () {
        return "[class BlurFilter]";
    };

    // endregion BlurFilter

    // ------------------------------------------------------------------------------------------------------------------------
    //  _____     ______     ______     ______   ______     __  __     ______     _____     ______
    // /\  __-.  /\  == \   /\  __ \   /\  == \ /\  ___\   /\ \_\ \   /\  __ \   /\  __-.  /\  __ \
    // \ \ \/\ \ \ \  __<   \ \ \/\ \  \ \  _-/ \ \___  \  \ \  __ \  \ \  __ \  \ \ \/\ \ \ \ \/\ \
    //  \ \____-  \ \_\ \_\  \ \_____\  \ \_\    \/\_____\  \ \_\ \_\  \ \_\ \_\  \ \____-  \ \_____\
    //   \/____/   \/_/ /_/   \/_____/   \/_/     \/_____/   \/_/\/_/   \/_/\/_/   \/____/   \/_____/
    //
    //  __     __     ______   __     __         ______   ______     ______
    // /\ \  _ \ \   /\  ___\ /\ \   /\ \       /\__  _\ /\  ___\   /\  == \
    // \ \ \/ ".\ \  \ \  __\ \ \ \  \ \ \____  \/_/\ \/ \ \  __\   \ \  __<
    //  \ \__/".~\_\  \ \_\    \ \_\  \ \_____\    \ \_\  \ \_____\  \ \_\ \_\
    //   \/_/   \/_/   \/_/     \/_/   \/_____/     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // DropShadowFilter
    // region DropShadowFilter
    /**
     * 投影滤镜类
     * @constructor
     */
    function DropShadowFilter() {
        BaseFilter.call(this, "dropShadowFilter");

        /**
         * 阴影的角度（以度为单位）
         * @type {number}
         * @range [0, 360]
         */
        this.angle = 45;

        /**
         * X 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurX = 4;

        /**
         * Y 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurY = 4;

        /**
         * 阴影与对象之间的距离（单位为像素）
         * @type {number}
         * @range [-255, 255]
         */
        this.distance = 4;

        /**
         * 阴影颜色
         * @type {string|number}
         */
        this.color = "#000000";

        /**
         * 滤镜的百分比强度
         * @type {number}
         * @range [0, 25500]
         */
        this.strength = 50;

        /**
         * 指定模糊质量
         * @type {string}
         * @values ["low", "medium", "high"]
         */
        this.quality = "medium";

        /**
         * 是否为内阴影
         * @type {boolean}
         */
        this.inner = false;

        /**
         * 是否为挖空滤镜
         * @type {boolean}
         */
        this.knockout = false;

        /**
         * 是否隐藏源图像
         * @type {boolean}
         */
        this.hideObject = false;
    }

    // 继承基类
    DropShadowFilter.prototype = Object.create(BaseFilter.prototype);
    DropShadowFilter.prototype.constructor = DropShadowFilter;

    // 静态属性
    DropShadowFilter.from = BaseFilter.from;

    FILTERS["DropShadowFilter"] = DropShadowFilter;

    /**
     * 初始化滤镜属性
     * @param {number} angle 阴影的角度（以度为单位）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @param {number} distance 阴影与对象之间的距离（单位为像素）
     * @param {string|number} color 阴影颜色
     * @param {number} strength 滤镜的百分比强度
     * @param {string} quality 指定模糊质量
     * @param {boolean} inner 是否为内阴影
     * @param {boolean} knockout 是否为挖空滤镜
     * @param {boolean} hideObject 是否隐藏源图像
     * @param {boolean} enabled 是否启用该滤镜
     * @returns {Filter}
     */
    DropShadowFilter.prototype.init = function (
        angle,
        blurX,
        blurY,
        distance,
        color,
        strength,
        quality,
        inner,
        knockout,
        hideObject,
        enabled
    ) {
        this.angle = angle;
        this.blurX = blurX;
        this.blurY = blurY;
        this.distance = distance;
        this.color = color;
        this.strength = strength;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
        this.hideObject = hideObject;
        this.enabled = enabled;
        return this;
    };

    /**
     * 静态方法，返回类名的字符串表示
     * @returns {string}
     */
    DropShadowFilter.toString = function () {
        return "[class DropShadowFilter]";
    };
    // endregion DropShadowFilter

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     __         ______     __     __     ______   __     __
    // /\  ___\   /\ \       /\  __ \   /\ \  _ \ \   /\  ___\ /\ \   /\ \
    // \ \ \__ \  \ \ \____  \ \ \/\ \  \ \ \/ ".\ \  \ \  __\ \ \ \  \ \ \____
    //  \ \_____\  \ \_____\  \ \_____\  \ \__/".~\_\  \ \_\    \ \_\  \ \_____\
    //   \/_____/   \/_____/   \/_____/   \/_/   \/_/   \/_/     \/_/   \/_____/
    //
    //  ______   ______     ______
    // /\__  _\ /\  ___\   /\  == \
    // \/_/\ \/ \ \  __\   \ \  __<
    //    \ \_\  \ \_____\  \ \_\ \_\
    //     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // GlowFilter
    // region GlowFilter

    /**
     * 高光滤镜类
     * @constructor
     * @class GlowFilter
     * @extends BaseFilter
     */
    function GlowFilter() {
        BaseFilter.call(this, "glowFilter");

        /**
         * X 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurX = 4;

        /**
         * Y 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurY = 4;

        /**
         * 高光颜色
         * @type {string|number}
         */
        this.color = "#ffffff";

        /**
         * 滤镜的百分比强度
         * @type {number}
         * @range [0, 25500]
         */
        this.strength = 50;

        /**
         * 指定模糊质量
         * @type {string}
         * @values ["low", "medium", "high"]
         */
        this.quality = "medium";

        /**
         * 是否为内高光
         * @type {boolean}
         */
        this.inner = false;

        /**
         * 是否为挖空滤镜
         * @type {boolean}
         */
        this.knockout = false;
    }

    // 继承基类
    GlowFilter.prototype = Object.create(BaseFilter.prototype);
    GlowFilter.prototype.constructor = GlowFilter;

    // 静态属性
    GlowFilter.from = BaseFilter.from;

    FILTERS["GlowFilter"] = GlowFilter;

    /**
     * 初始化滤镜属性
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @param {string|number} color 高光颜色
     * @param {number} strength 滤镜的百分比强度
     * @param {string} quality 指定模糊质量
     * @param {boolean} inner 是否为内高光
     * @param {boolean} knockout 是否为挖空滤镜
     * @returns {Filter}
     */
    GlowFilter.prototype.init = function (
        blurX,
        blurY,
        color,
        strength,
        quality,
        inner,
        knockout
    ) {
        this.blurX = blurX;
        this.blurY = blurY;
        this.color = color;
        this.strength = strength;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
        return this;
    };

    /**
     * 静态方法，返回类名的字符串表示
     * @returns {string}
     */
    GlowFilter.toString = function () {
        return "[class GlowFilter]";
    };
    // endregion GlowFilter

    // region GlowFilterBuilder
    /**
     * 高光滤镜建造者类
     * @constructor
     * @class GlowFilterBuilder
     */
    function GlowFilterBuilder() {
        this.glowFilter = new GlowFilter();
    }
    FILTER_BUILDERS["GlowFilterBuilder"] = GlowFilterBuilder;

    /**
     * 设置 X 方向的模糊量
     * @param {number} blurX X 方向的模糊量
     * @returns {GlowFilterBuilder} 返回当前建造者对象
     */
    GlowFilterBuilder.prototype.blurX = function (blurX) {
        this.glowFilter.blurX = blurX;
        return this;
    };

    /**
     * 设置 Y 方向的模糊量
     * @param {number} blurY Y 方向的模糊量
     * @returns {GlowFilterBuilder} 返回当前建造者对象
     */
    GlowFilterBuilder.prototype.blurY = function (blurY) {
        this.glowFilter.blurY = blurY;
        return this;
    };

    /**
     * 设置高光颜色
     * @param {string|number} color 高光颜色
     * @returns {GlowFilterBuilder} 返回当前建造者对象
     */
    GlowFilterBuilder.prototype.color = function (color) {
        this.glowFilter.color = color;
        return this;
    };

    /**
     * 设置滤镜的百分比强度
     * @param {number} strength 滤镜的百分比强度
     * @returns {GlowFilterBuilder} 返回当前建造者对象
     */
    GlowFilterBuilder.prototype.strength = function (strength) {
        this.glowFilter.strength = strength;
        return this;
    };

    /**
     * 设置模糊质量
     * @param {string} quality 模糊质量
     * @returns {GlowFilterBuilder} 返回当前建造者对象
     */
    GlowFilterBuilder.prototype.quality = function (quality) {
        this.glowFilter.quality = quality;
        return this;
    };

    /**
     * 设置是否为内高光
     * @param {boolean} inner 是否为内高光
     * @returns {GlowFilterBuilder} 返回当前建造者对象
     */
    GlowFilterBuilder.prototype.inner = function (inner) {
        this.glowFilter.inner = inner;
        return this;
    };

    /**
     * 设置是否为挖空滤镜
     * @param {boolean} knockout 是否为挖空滤镜
     * @returns {GlowFilterBuilder} 返回当前建造者对象
     */
    GlowFilterBuilder.prototype.knockout = function (knockout) {
        this.glowFilter.knockout = knockout;
        return this;
    };

    /**
     * 构建并返回最终的 GlowFilter 对象
     * @returns {GlowFilter} 构建好的 GlowFilter 对象
     */
    GlowFilterBuilder.prototype.build = function () {
        return this.glowFilter;
    };
    // endregion GlowFilterBuilder

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     _____     __     ______     __   __
    // /\  ___\   /\  == \   /\  __ \   /\  __-.  /\ \   /\  ___\   /\ "-.\ \
    // \ \ \__ \  \ \  __<   \ \  __ \  \ \ \/\ \ \ \ \  \ \  __\   \ \ \-.  \
    //  \ \_____\  \ \_\ \_\  \ \_\ \_\  \ \____-  \ \_\  \ \_____\  \ \_\\"\_\
    //   \/_____/   \/_/ /_/   \/_/\/_/   \/____/   \/_/   \/_____/   \/_/ \/_/
    //
    //  ______   ______     ______     __   __   ______     __         ______   __
    // /\__  _\ /\  == \   /\  ___\   /\ \ / /  /\  ___\   /\ \       /\  ___\ /\ \
    // \/_/\ \/ \ \  __<   \ \  __\   \ \ \'/   \ \  __\   \ \ \____  \ \  __\ \ \ \
    //    \ \_\  \ \_____\  \ \_____\  \ \__|    \ \_____\  \ \_____\  \ \_\    \ \_\
    //     \/_/   \/_____/   \/_____/   \/_/      \/_____/   \/_____/   \/_/     \/_/
    //
    //  __         ______   ______     ______
    // /\ \       /\__  _\ /\  ___\   /\  == \
    // \ \ \____  \/_/\ \/ \ \  __\   \ \  __<
    //  \ \_____\    \ \_\  \ \_____\  \ \_\ \_\
    //   \/_____/     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // GradientBevelFilter

    // region GradientBevelFilter
    /**
     * 高光滤镜类
     * @constructor
     */
    function GradientBevelFilter() {
        BaseFilter.call(this, "gradientBevelFilter");

        /**
         * X 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurX = 4;

        /**
         * Y 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurY = 4;

        /**
         * 滤镜效果与对象之间的距离（单位为像素）
         * @type {number}
         * @range [-255, 255]
         */
        this.distance = 4;

        /**
         * 滤镜的百分比强度
         * @type {number}
         * @range [0, 25500]
         */
        this.strength = 50;

        /**
         * 指定斜角或发光的类型
         * @type {string}
         * @values ["inner", "outer", "full"]
         */
        this.type = "inner";

        /**
         * 指定模糊质量
         * @type {string}
         * @values ["low", "medium", "high"]
         */
        this.quality = "medium";

        /**
         * 是否为内阴影
         * @type {boolean}
         */
        this.inner = false;

        /**
         * 是否为挖空滤镜
         * @type {boolean}
         */
        this.knockout = false;
    }

    // 继承基类
    GradientBevelFilter.prototype = Object.create(BaseFilter.prototype);
    GradientBevelFilter.prototype.constructor = GradientBevelFilter;

    // 静态属性
    GradientBevelFilter.from = BaseFilter.from;

    FILTERS["GradientBevelFilter"] = GradientBevelFilter;

    /**
     * 初始化滤镜属性
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @param {number} distance 滤镜效果与对象之间的距离（单位为像素）
     * @param {number} strength 滤镜的百分比强度
     * @param {string} type 指定斜角或发光的类型
     * @param {string} quality 指定模糊质量
     * @param {boolean} inner 是否为内阴影
     * @param {boolean} knockout 是否为挖空滤镜
     * @param {boolean} enabled 是否启用该滤镜
     * @returns {Filter}
     */
    GradientBevelFilter.prototype.init = function (
        blurX,
        blurY,
        distance,
        strength,
        type,
        quality,
        inner,
        knockout,
        enabled
    ) {
        this.blurX = blurX;
        this.blurY = blurY;
        this.distance = distance;
        this.strength = strength;
        this.type = type;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
        this.enabled = enabled;
        return this;
    };

    /**
     * 静态方法，返回类名的字符串表示
     * @returns {string}
     */
    GradientBevelFilter.toString = function () {
        return "[class GradientBevelFilter]";
    };
    // endregion GradientBevelFilter

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     _____     __     ______     __   __     ______   ______
    // /\  ___\   /\  == \   /\  __ \   /\  __-.  /\ \   /\  ___\   /\ "-.\ \   /\__  _\ /\  ___\
    // \ \ \__ \  \ \  __<   \ \  __ \  \ \ \/\ \ \ \ \  \ \  __\   \ \ \-.  \  \/_/\ \/ \ \ \__ \
    //  \ \_____\  \ \_\ \_\  \ \_\ \_\  \ \____-  \ \_\  \ \_____\  \ \_\\"\_\    \ \_\  \ \_____\
    //   \/_____/   \/_/ /_/   \/_/\/_/   \/____/   \/_/   \/_____/   \/_/ \/_/     \/_/   \/_____/
    //
    //  __         ______     __     __     ______   __     __         ______   ______     ______
    // /\ \       /\  __ \   /\ \  _ \ \   /\  ___\ /\ \   /\ \       /\__  _\ /\  ___\   /\  == \
    // \ \ \____  \ \ \/\ \  \ \ \/ ".\ \  \ \  __\ \ \ \  \ \ \____  \/_/\ \/ \ \  __\   \ \  __<
    //  \ \_____\  \ \_____\  \ \__/".~\_\  \ \_\    \ \_\  \ \_____\    \ \_\  \ \_____\  \ \_\ \_\
    //   \/_____/   \/_____/   \/_/   \/_/   \/_/     \/_/   \/_____/     \/_/   \/_____/   \/_/ /_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // GradientGlowFilter

    // region GradientGlowFilter
    /**
     * 渐变发光滤镜类
     * @constructor
     */
    function GradientGlowFilter() {
        BaseFilter.call(this, "gradientGlowFilter");

        /**
         * X 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurX = 4;

        /**
         * Y 方向的模糊量（单位为像素）
         * @type {number}
         * @range [0, 255]
         */
        this.blurY = 4;

        /**
         * 滤镜的百分比强度
         * @type {number}
         * @range [0, 25500]
         */
        this.strength = 50;

        /**
         * 指定斜角或发光的类型
         * @type {string}
         * @values ["inner", "outer", "full"]
         */
        this.type = "inner";

        /**
         * 指定模糊质量
         * @type {string}
         * @values ["low", "medium", "high"]
         */
        this.quality = "medium";

        /**
         * 是否为挖空滤镜
         * @type {boolean}
         */
        this.knockout = false;

        /**
         * 是否启用该滤镜
         * @type {boolean}
         */
        this.enabled = true;
    }

    // 继承基类
    GradientGlowFilter.prototype = Object.create(BaseFilter.prototype);
    GradientGlowFilter.prototype.constructor = GradientGlowFilter;

    // 静态属性
    GradientGlowFilter.from = BaseFilter.from;

    FILTERS["GradientGlowFilter"] = GradientGlowFilter;

    /**
     * 初始化滤镜属性
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @param {number} strength 滤镜的百分比强度
     * @param {string} type 指定斜角或发光的类型
     * @param {string} quality 指定模糊质量
     * @param {boolean} knockout 是否为挖空滤镜
     * @param {boolean} enabled 是否启用该滤镜
     * @returns {Filter}
     */
    GradientGlowFilter.prototype.init = function (
        blurX,
        blurY,
        strength,
        type,
        quality,
        knockout,
        enabled
    ) {
        this.blurX = blurX;
        this.blurY = blurY;
        this.strength = strength;
        this.type = type;
        this.quality = quality;
        this.knockout = knockout;
        this.enabled = enabled;
        return this;
    };

    /**
     * 静态方法，返回类名的字符串表示
     * @returns {string}
     */
    GradientGlowFilter.toString = function () {
        return "[class GradientGlowFilter]";
    };
    // endregion GradientGlowFilter

    FILTERS["BUILDERS"] = FILTER_BUILDERS;

    return FILTERS;
});
