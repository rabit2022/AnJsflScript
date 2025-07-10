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
define(["SObject", "FUNC"], function (so, FUNC) {
    const { INHERIT_MACRO } = FUNC;
    const { SObject } = so;

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
        SObject.call(this, arguments);
        /**
         * 滤镜类型名称
         * @type {string}
         * @readonly
         * @values ["adjustColorFilter", "bevelFilter", "blurFilter", "dropShadowFilter", "glowFilter", "gradientGlowFilter"]
         */
        this.name = name;

        /**
         * 是否启用该滤镜
         * @type {boolean}
         */
        this.enabled = true;
    }

    INHERIT_MACRO(BaseFilter, SObject);

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
    // endregion BaseFilter

    // region BaseFilterBuilder
    /**
     * 滤镜构造器基类
     * @constructor
     */
    function BaseFilterBuilder() {
        SObject.call(this, arguments);
        this.filter = new BaseFilter();
    }

    INHERIT_MACRO(BaseFilterBuilder, SObject);

    /**
     * 设置滤镜是否启用
     * @param {boolean} enabled 是否启用
     * @returns {BaseFilterBuilder}
     */
    BaseFilterBuilder.prototype.setEnabled = function (enabled) {
        this.filter.enabled = enabled;
        return this;
    };

    /**
     * 构建滤镜对象
     * @returns {BaseFilter}
     */
    BaseFilterBuilder.prototype.build = function () {
        return this.filter;
    };

    /**
     * 克隆滤镜构造器
     * @note 由于内部的滤镜对象是单例的，因此克隆构造器时需要克隆滤镜对象
     * @returns {BaseFilterBuilder}
     */
    BaseFilterBuilder.prototype.clone = function () {
        this.filter = this.filter.clone();
        SObject.prototype.clone();
        return this;
    };
    // endregion BaseFilterBuilder

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

    INHERIT_MACRO(AdjustColorFilter, BaseFilter);

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

    // endregion AdjustColorFilter

    // region AdjustColorFilterBuilder
    /**
     * 调整颜色滤镜构造器
     * @constructor
     */
    function AdjustColorFilterBuilder() {
        BaseFilterBuilder.call(this, arguments);
        this.filter = new AdjustColorFilter();
    }

    INHERIT_MACRO(AdjustColorFilterBuilder, BaseFilterBuilder);

    /**
     * 设置滤镜的亮度值
     * @param {number} brightness 亮度值
     * @returns {AdjustColorFilterBuilder}
     */
    AdjustColorFilterBuilder.prototype.setBrightness = function (brightness) {
        this.filter.brightness = brightness;
        return this;
    };

    /**
     * 设置滤镜的对比度值
     * @param {number} contrast 对比度值
     * @returns {AdjustColorFilterBuilder}
     */
    AdjustColorFilterBuilder.prototype.setContrast = function (contrast) {
        this.filter.contrast = contrast;
        return this;
    };

    /**
     * 设置滤镜的色相值
     * @param {number} hue 色相值
     * @returns {AdjustColorFilterBuilder}
     */
    AdjustColorFilterBuilder.prototype.setHue = function (hue) {
        this.filter.hue = hue;
        return this;
    };

    /**
     * 设置滤镜的饱和度值
     * @param {number} saturation 饱和度值
     * @returns {AdjustColorFilterBuilder}
     */
    AdjustColorFilterBuilder.prototype.setSaturation = function (saturation) {
        this.filter.saturation = saturation;
        return this;
    };

    /**
     * 构建滤镜对象
     * @returns {AdjustColorFilter}
     */
    AdjustColorFilterBuilder.prototype.build = function () {
        return this.filter;
    };

    FILTER_BUILDERS["AdjustColorFilterBuilder"] = AdjustColorFilterBuilder;
    // endregion AdjustColorFilterBuilder

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

    INHERIT_MACRO(BevelFilter, BaseFilter);

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

    // endregion BevelFilter

    // region BevelFilterBuilder
    /**
     * 斜角滤镜构造器
     * @constructor
     */
    function BevelFilterBuilder() {
        BaseFilterBuilder.call(this, arguments);
        this.filter = new BevelFilter();
    }

    INHERIT_MACRO(BevelFilterBuilder, BaseFilterBuilder);

    /**
     * 设置阴影或高光的角度（以度为单位）
     * @param {number} angle 阴影或高光的角度（以度为单位）
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setAngle = function (angle) {
        this.filter.angle = angle;
        return this;
    };

    /**
     * 设置 X 方向的模糊量（单位为像素）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setBlurX = function (blurX) {
        this.filter.blurX = blurX;
        return this;
    };

    /**
     * 设置 Y 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setBlurY = function (blurY) {
        this.filter.blurY = blurY;
        return this;
    };

    /**
     * 设置滤镜效果与对象之间的距离（单位为像素）
     * @param {number} distance 滤镜效果与对象之间的距离（单位为像素）
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setDistance = function (distance) {
        this.filter.distance = distance;
        return this;
    };

    /**
     * 设置高亮颜色
     * @param {string|number} highlightColor 高亮颜色
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setHighlightColor = function (highlightColor) {
        this.filter.highlightColor = highlightColor;
        return this;
    };

    /**
     * 设置阴影颜色
     * @param {string|number} shadowColor 阴影颜色
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setShadowColor = function (shadowColor) {
        this.filter.shadowColor = shadowColor;
        return this;
    };

    /**
     * 设置滤镜的百分比强度
     * @param {number} strength 滤镜的百分比强度
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setStrength = function (strength) {
        this.filter.strength = strength;
        return this;
    };

    /**
     * 设置斜角或发光的类型
     * @param {string} type 指定斜角或发光的类型
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setType = function (type) {
        this.filter.type = type;
        return this;
    };

    /**
     * 设置模糊质量
     * @param {string} quality 指定模糊质量
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setQuality = function (quality) {
        this.filter.quality = quality;
        return this;
    };

    /**
     * 设置是否为内阴影
     * @param {boolean} inner 是否为内阴影
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setInner = function (inner) {
        this.filter.inner = inner;
        return this;
    };

    /**
     * 设置是否为挖空滤镜
     * @param {boolean} knockout 是否为挖空滤镜
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setKnockout = function (knockout) {
        this.filter.knockout = knockout;
        return this;
    };

    /**
     * 设置是否启用该滤镜
     * @param {boolean} enabled 是否启用该滤镜 enabled
     * @returns {BevelFilterBuilder}
     */
    BevelFilterBuilder.prototype.setEnabled = function (enabled) {
        this.filter.enabled = enabled;
        return this;
    };

    /**
     * 构建滤镜对象
     * @returns {BevelFilter}
     */
    BevelFilterBuilder.prototype.build = function () {
        return this.filter;
    };

    FILTER_BUILDERS["BevelFilterBuilder"] = BevelFilterBuilder;
    // endregion BevelFilterBuilder

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

    INHERIT_MACRO(BlurFilter, BaseFilter);

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

    // endregion BlurFilter

    // region BlurFilterBuilder
    /**
     * 模糊滤镜构造器
     * @constructor
     */
    function BlurFilterBuilder() {
        BaseFilterBuilder.call(this, arguments);
        this.filter = new BlurFilter();
    }

    INHERIT_MACRO(BlurFilterBuilder, BaseFilterBuilder);

    /**
     * 设置 X 方向的模糊量（单位为像素）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @returns {BlurFilterBuilder}
     */
    BlurFilterBuilder.prototype.setBlurX = function (blurX) {
        this.filter.blurX = blurX;
        return this;
    };

    /**
     * 设置 Y 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @returns {BlurFilterBuilder}
     */
    BlurFilterBuilder.prototype.setBlurY = function (blurY) {
        this.filter.blurY = blurY;
        return this;
    };

    /**
     * 设置模糊量（单位为像素）
     * @param {number} blur 模糊量（单位为像素）
     * @returns {BlurFilterBuilder}
     */
    BlurFilterBuilder.prototype.setBlur = function (blur) {
        this.filter.blurX = blur;
        this.filter.blurY = blur;
        return this;
    };

    /**
     * 设置指定模糊质量
     * @param {string} quality 指定模糊质量
     * @returns {BlurFilterBuilder}
     */
    BlurFilterBuilder.prototype.setQuality = function (quality) {
        this.filter.quality = quality;
        return this;
    };

    /**
     * 构建滤镜对象
     * @returns {BlurFilter}
     */
    BlurFilterBuilder.prototype.build = function () {
        return this.filter;
    };

    FILTER_BUILDERS["BlurFilterBuilder"] = BlurFilterBuilder;
    // endregion BlurFilterBuilder

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

    INHERIT_MACRO(DropShadowFilter, BaseFilter);

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

    // endregion DropShadowFilter

    // region DropShadowFilterBuilder
    /**
     * 投影滤镜构造器
     * @constructor
     */
    function DropShadowFilterBuilder() {
        BaseFilterBuilder.call(this, arguments);
        this.filter = new DropShadowFilter();
    }

    INHERIT_MACRO(DropShadowFilterBuilder, BaseFilterBuilder);

    /**
     * 设置阴影的角度（以度为单位）
     * @param {number} angle 阴影的角度（以度为单位）
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setAngle = function (angle) {
        this.filter.angle = angle;
        return this;
    };

    /**
     * 设置 X 方向的模糊量（单位为像素）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setBlurX = function (blurX) {
        this.filter.blurX = blurX;
        return this;
    };

    /**
     * 设置 Y 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setBlurY = function (blurY) {
        this.filter.blurY = blurY;
        return this;
    };

    /**
     * 设置模糊量（单位为像素）
     * @param {number} blur 模糊量（单位为像素）
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setBlur = function (blur) {
        this.filter.blurX = blur;
        this.filter.blurY = blur;
        return this;
    };

    /**
     * 设置阴影与对象之间的距离（单位为像素）
     * @param {number} distance 阴影与对象之间的距离（单位为像素）
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setDistance = function (distance) {
        this.filter.distance = distance;
        return this;
    };

    /**
     * 设置阴影颜色
     * @param {string|number} color 阴影颜色
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setColor = function (color) {
        this.filter.color = color;
        return this;
    };

    /**
     * 设置滤镜的百分比强度
     * @param {number} strength 滤镜的百分比强度
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setStrength = function (strength) {
        this.filter.strength = strength;
        return this;
    };

    /**
     * 设置指定模糊质量
     * @param {string} quality 指定模糊质量
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setQuality = function (quality) {
        this.filter.quality = quality;
        return this;
    };

    /**
     * 设置是否为内阴影
     * @param {boolean} inner 是否为内阴影
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setInner = function (inner) {
        this.filter.inner = inner;
        return this;
    };

    /**
     * 设置是否为挖空滤镜
     * @param {boolean} knockout 是否为挖空滤镜
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setKnockout = function (knockout) {
        this.filter.knockout = knockout;
        return this;
    };

    /**
     * 设置是否隐藏源图像
     * @param {boolean} hideObject 是否隐藏源图像
     * @returns {DropShadowFilterBuilder}
     */
    DropShadowFilterBuilder.prototype.setHideObject = function (hideObject) {
        this.filter.hideObject = hideObject;
        return this;
    };

    /**
     * 构建滤镜对象
     * @returns {DropShadowFilter}
     */
    DropShadowFilterBuilder.prototype.build = function () {
        return this.filter;
    };

    FILTER_BUILDERS["DropShadowFilterBuilder"] = DropShadowFilterBuilder;
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

    INHERIT_MACRO(GlowFilter, BaseFilter);

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

    // endregion GlowFilter

    // region GlowFilterBuilder
    /**
     * 高光滤镜建造者类
     * @constructor
     * @class GlowFilterBuilder
     */
    function GlowFilterBuilder() {
        BaseFilterBuilder.call(this, arguments);
        this.glowFilter = new GlowFilter();
    }

    INHERIT_MACRO(GlowFilterBuilder, BaseFilterBuilder);

    FILTER_BUILDERS["GlowFilterBuilder"] = GlowFilterBuilder;

    /**
     * 设置 X 方向的模糊量（单位为像素）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setBlurX = function (blurX) {
        this.glowFilter.blurX = blurX;
        return this;
    };
    /**
     * 设置 Y 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setBlurY = function (blurY) {
        this.glowFilter.blurY = blurY;
        return this;
    };

    /**
     * 设置模糊量（单位为像素）
     * @param {number} blur 模糊量（单位为像素）
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setBlur = function (blur) {
        this.glowFilter.blurX = blur;
        this.glowFilter.blurY = blur;
        return this;
    };

    /**
     * 设置高光颜色
     * @param {string|number} color 高光颜色
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setColor = function (color) {
        this.glowFilter.color = color;
        return this;
    };

    /**
     * 设置滤镜的百分比强度
     * @param {number} strength 滤镜的百分比强度
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setStrength = function (strength) {
        this.glowFilter.strength = strength;
        return this;
    };
    /**
     * 设置指定模糊质量
     * @param {string} quality 指定模糊质量
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setQuality = function (quality) {
        this.glowFilter.quality = quality;
        return this;
    };
    /**
     * 设置是否为内高光
     * @param {boolean} inner 是否为内高光
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setInner = function (inner) {
        this.glowFilter.inner = inner;
        return this;
    };
    /**
     * 设置是否为挖空滤镜
     * @param {boolean} knockout 是否为挖空滤镜
     * @returns {GlowFilterBuilder}
     */
    GlowFilterBuilder.prototype.setKnockout = function (knockout) {
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

    INHERIT_MACRO(GradientBevelFilter, BaseFilter);

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

    // endregion GradientBevelFilter

    // region GradientBevelFilterBuilder
    /**
     * 高光滤镜建造者类
     * @constructor
     */
    function GradientBevelFilterBuilder() {
        BaseFilterBuilder.call(this, arguments);
        this.gradientBevelFilter = new GradientBevelFilter();
    }

    INHERIT_MACRO(GradientBevelFilterBuilder, BaseFilterBuilder);

    FILTER_BUILDERS["GradientBevelFilterBuilder"] = GradientBevelFilterBuilder;

    /**
     * 设置 X 方向的模糊量（单位为像素）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setBlurX = function (blurX) {
        this.gradientBevelFilter.blurX = blurX;
        return this;
    };

    /**
     * 设置 Y 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setBlurY = function (blurY) {
        this.gradientBevelFilter.blurY = blurY;
        return this;
    };

    /**
     * 设置滤镜效果与对象之间的距离（单位为像素）
     * @param {number} distance 滤镜效果与对象之间的距离（单位为像素）
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setDistance = function (distance) {
        this.gradientBevelFilter.distance = distance;
        return this;
    };

    /**
     * 设置滤镜的百分比强度
     * @param {number} strength 滤镜的百分比强度
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setStrength = function (strength) {
        this.gradientBevelFilter.strength = strength;
        return this;
    };

    /**
     * 设置指定斜角或发光的类型
     * @param {string} type 指定斜角或发光的类型
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setType = function (type) {
        this.gradientBevelFilter.type = type;
        return this;
    };

    /**
     * 设置指定模糊质量
     * @param {string} quality 指定模糊质量
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setQuality = function (quality) {
        this.gradientBevelFilter.quality = quality;
        return this;
    };

    /**
     * 设置是否为内阴影
     * @param {boolean} inner 是否为内阴影
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setInner = function (inner) {
        this.gradientBevelFilter.inner = inner;
        return this;
    };

    /**
     * 设置是否为挖空滤镜
     * @param {boolean} knockout 是否为挖空滤镜
     * @returns {GradientBevelFilterBuilder}
     */
    GradientBevelFilterBuilder.prototype.setKnockout = function (knockout) {
        this.gradientBevelFilter.knockout = knockout;
        return this;
    };

    /**
     * 构建并返回最终的 GradientBevelFilter 对象
     * @returns {GradientBevelFilter} 构建好的 GradientBevelFilter 对象
     */
    GradientBevelFilterBuilder.prototype.build = function () {
        return this.gradientBevelFilter;
    };
    // endregion GradientBevelFilterBuilder

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

        /**
         * 斜角的角度
         * @type {number}
         * @range [0, 360]
         */
        this.angle = 45;
        /**
         * 斜角的锐度
         * @type {number}
         * @range [0, 255]
         */
        this.distance = 4;

        /**
         * 斜角的颜色数组
         * @type {Array}
         */
        this.colorArray = [];

        /**
         * 斜角的位置数组
         * @type {Array}
         */
        this.posArray = [];
    }

    INHERIT_MACRO(GradientGlowFilter, BaseFilter);

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

    // endregion GradientGlowFilter

    // region GradientGlowFilterBuilder
    /**
     * 渐变发光滤镜建造者类
     * @constructor
     */
    function GradientGlowFilterBuilder() {
        BaseFilterBuilder.call(this, arguments);
        this.gradientGlowFilter = new GradientGlowFilter();
    }

    INHERIT_MACRO(GradientGlowFilterBuilder, BaseFilterBuilder);

    FILTER_BUILDERS["GradientGlowFilterBuilder"] = GradientGlowFilterBuilder;

    /**
     * 设置 X 方向的模糊量（单位为像素）
     * @param {number} blurX X 方向的模糊量（单位为像素）
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setBlurX = function (blurX) {
        this.gradientGlowFilter.blurX = blurX;
        return this;
    };

    /**
     * 设置 Y 方向的模糊量（单位为像素）
     * @param {number} blurY Y 方向的模糊量（单位为像素）
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setBlurY = function (blurY) {
        this.gradientGlowFilter.blurY = blurY;
        return this;
    };

    GradientGlowFilterBuilder.prototype.setBlur = function (blur) {
        this.gradientGlowFilter.blurX = blur;
        this.gradientGlowFilter.blurY = blur;
        return this;
    };

    /**
     * 设置滤镜的百分比强度
     * @param {number} strength 滤镜的百分比强度
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setStrength = function (strength) {
        this.gradientGlowFilter.strength = strength;
        return this;
    };

    /**
     * 设置指定斜角或发光的类型
     * @param {string} type 指定斜角或发光的类型
     * @returns {GradientGlowFilterBuilder}
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setType = function (type) {
        this.gradientGlowFilter.type = type;
        return this;
    };

    /**
     * 设置指定模糊质量
     * @param {string} quality 指定模糊质量
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setQuality = function (quality) {
        this.gradientGlowFilter.quality = quality;
        return this;
    };

    /**
     * 设置是否为挖空滤镜
     * @param {boolean} knockout 是否为挖空滤镜
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setKnockout = function (knockout) {
        this.gradientGlowFilter.knockout = knockout;
        return this;
    };

    /**
     * 设置斜角的角度
     * @param {number} angle 斜角的角度
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setAngle = function (angle) {
        this.gradientGlowFilter.angle = angle;
        return this;
    };

    /**
     * 设置斜角的锐度
     * @param {number} distance 斜角的锐度
     * @returns {GradientGlowFilterBuilder}
     */
    GradientGlowFilterBuilder.prototype.setDistance = function (distance) {
        this.gradientGlowFilter.distance = distance;
        return this;
    };

    GradientGlowFilterBuilder.prototype.addColorStop = function (pos, color) {
        this.gradientGlowFilter.colorArray.push(color);
        this.gradientGlowFilter.posArray.push(pos);
        return this;
    };

    /**
     * 构建并返回最终的 GradientGlowFilter 对象
     * @returns {GradientGlowFilter} 构建好的 GradientGlowFilter 对象
     */
    GradientGlowFilterBuilder.prototype.build = function () {
        return this.gradientGlowFilter;
    };

    // endregion GradientGlowFilterBuilder

    FILTERS["BUILDERS"] = FILTER_BUILDERS;

    return FILTERS;
});
