/**
 * @file: StrokeDefinitions.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/4 20:37
 * @project: AnJsflScript
 * @description:
 */

define([], function () {
    // var FILTERS = {};
    // var FILTER_BUILDERS = {};
    var STROKES = {};
    var STROKE_BUILDERS = {};
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     ______     ______     ______   ______
    // /\  == \   /\  __ \   /\  ___\   /\  ___\   /\  ___\   /\__  _\ /\  == \
    // \ \  __<   \ \  __ \  \ \___  \  \ \  __\   \ \___  \  \/_/\ \/ \ \  __<
    //  \ \_____\  \ \_\ \_\  \/\_____\  \ \_____\  \/\_____\    \ \_\  \ \_\ \_\
    //   \/_____/   \/_/\/_/   \/_____/   \/_____/   \/_____/     \/_/   \/_/ /_/
    //
    //  ______     __  __     ______
    // /\  __ \   /\ \/ /    /\  ___\
    // \ \ \/\ \  \ \  _"-.  \ \  __\
    //  \ \_____\  \ \_\ \_\  \ \_____\
    //   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BaseStroke
    // region BaseStroke
    /**
     * 基类 Stroke
     * @constructor
     * @class
     */
    function BaseStroke(style) {
        /**
         * 是否锐化转角
         * @type {boolean}
         * @values [true, false]
         */
        this.breakAtCorners = false;

        /**
         * 笔触端类型
         * @type {string}
         * @values ["none", "round", "square"]
         */
        this.capType = "none";

        /**
         * 是否对笔触设置笔触提示
         * @type {boolean}
         * @values [true, false]
         */
        this.strokeHinting = false;

        /**
         * 笔触样式
         * @type {string}
         * @values ["noStroke", "solid", "dashed", "dotted", "ragged", "stipple", "hatched"]
         */
        this.style = style || "solid";

        /**
         * 笔触大小
         * @type {number}
         */
        this.thickness = 1;

        /**
         * 笔触颜色
         * @type {string|number}
         * @example "#000000" 或 0x000000 或 0
         */
        this.color = "#000000";

        /**
         * 笔触的填充设置
         * @type {Fill}
         */
        this.shapeFill = {};

        /**
         * 笔触的缩放类型
         * @type {string}
         * @values ["normal", "horizontal", "vertical", "none"]
         */
        this.scaleType = "normal";

        /**
         * 笔触联接类型
         * @type {string}
         * @values ["miter", "round", "bevel"]
         */
        this.joinType = "miter";

        /**
         * 角度限制值，用于截断尖角
         * @type {number}
         */
        this.miterLimit = 4;
    }

    BaseStroke.toString = function () {
        return "[class BaseStroke]";
    };
    // endregion BaseStroke

    // region BaseStrokeBuilder
    /**
     * 基类 Stroke 构建器
     * @constructor
     * @class
     */
    function BaseStrokeBuilder() {
        this.stroke = new BaseStroke();
    }

    /**
     * 设置是否锐化转角
     * @param {boolean} breakAtCorners
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.breakAtCorners = function (breakAtCorners) {
        this.stroke.breakAtCorners = breakAtCorners;
        return this;
    };
    /**
     * 设置笔触端类型
     * @param {string} capType
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.capType = function (capType) {
        this.stroke.capType = capType;
        return this;
    };
    /**
     * 设置是否对笔触设置笔触提示
     * @param {boolean} strokeHinting
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.strokeHinting = function (strokeHinting) {
        this.stroke.strokeHinting = strokeHinting;
        return this;
    };
    /**
     * 设置笔触样式
     * @param {string} style
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.style = function (style) {
        this.stroke.style = style;
        return this;
    };
    /**
     * 设置笔触大小
     * @param {number} thickness
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.thickness = function (thickness) {
        this.stroke.thickness = thickness;
        return this;
    };
    /**
     * 设置笔触颜色
     * @param {string|number} color
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.color = function (color) {
        this.stroke.color = color;
        return this;
    };
    /**
     * 设置笔触的填充设置
     * @param {Fill} shapeFill
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.shapeFill = function (shapeFill) {
        this.stroke.shapeFill = shapeFill;
        return this;
    };
    /**
     * 设置笔触的缩放类型
     * @param {string} scaleType
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.scaleType = function (scaleType) {
        this.stroke.scaleType = scaleType;
        return this;
    };
    /**
     * 设置笔触联接类型
     * @param {string} joinType
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.joinType = function (joinType) {
        this.stroke.joinType = joinType;
        return this;
    };
    /**
     * 设置角度限制值，用于截断尖角
     * @param {number} miterLimit
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.miterLimit = function (miterLimit) {
        this.stroke.miterLimit = miterLimit;
        return this;
    };
    /**
     * 构建 Stroke 对象
     * @returns {BaseStroke}
     */
    BaseStrokeBuilder.prototype.build = function () {
        return this.stroke;
    };
    // endregion BaseStrokeBuilder

    // ------------------------------------------------------------------------------------------------------------------------
    //  __   __     ______     ______     ______   ______     ______     __  __     ______
    // /\ "-.\ \   /\  __ \   /\  ___\   /\__  _\ /\  == \   /\  __ \   /\ \/ /    /\  ___\
    // \ \ \-.  \  \ \ \/\ \  \ \___  \  \/_/\ \/ \ \  __<   \ \ \/\ \  \ \  _"-.  \ \  __\
    //  \ \_\\"\_\  \ \_____\  \/\_____\    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\
    //   \/_/ \/_/   \/_____/   \/_____/     \/_/   \/_/ /_/   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // NoStroke
    // region NoStroke
    /**
     * 无笔触样式
     * @constructor
     * @class
     * @extends BaseStroke
     */
    function NoStroke() {
        BaseStroke.call(this, "noStroke");
    }

    NoStroke.prototype = Object.create(BaseStroke.prototype);
    NoStroke.prototype.constructor = NoStroke;

    STROKES["NoStroke"] = NoStroke;

    NoStroke.toString = function () {
        return "[class NoStroke]";
    };
    // endregion NoStroke

    // region NoStrokeBuilder
    /**
     * 无笔触样式构建器
     * @constructor
     * @class
     */
    function NoStrokeBuilder() {
        this.stroke = new NoStroke();
    }

    NoStrokeBuilder.prototype = Object.create(BaseStrokeBuilder.prototype);
    NoStrokeBuilder.prototype.constructor = NoStrokeBuilder;

    STROKE_BUILDERS["NoStroke"] = NoStrokeBuilder;

    // endregion NoStrokeBuilder
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     __         __     _____     ______     ______
    // /\  ___\   /\  __ \   /\ \       /\ \   /\  __-.  /\  ___\   /\__  _\
    // \ \___  \  \ \ \/\ \  \ \ \____  \ \ \  \ \ \/\ \ \ \___  \  \/_/\ \/
    //  \/\_____\  \ \_____\  \ \_____\  \ \_\  \ \____-  \/\_____\    \ \_\
    //   \/_____/   \/_____/   \/_____/   \/_/   \/____/   \/_____/     \/_/
    //
    //  ______     ______     __  __     ______
    // /\  == \   /\  __ \   /\ \/ /    /\  ___\
    // \ \  __<   \ \ \/\ \  \ \  _"-.  \ \  __\
    //  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\
    //   \/_/ /_/   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // SolidStroke
    // region SolidStroke
    /**
     * 实线样式
     * @constructor
     * @class
     * @extends BaseStroke
     */
    function SolidStroke() {
        BaseStroke.call(this, "solid");
    }

    SolidStroke.prototype = Object.create(BaseStroke.prototype);
    SolidStroke.prototype.constructor = SolidStroke;
    STROKES["SolidStroke"] = SolidStroke;

    SolidStroke.toString = function () {
        return "[class SolidStroke]";
    };
    // endregion SolidStroke

    // region SolidStrokeBuilder
    /**
     * 实线样式构建器
     * @constructor
     * @class
     */
    function SolidStrokeBuilder() {
        this.stroke = new SolidStroke();
    }

    SolidStrokeBuilder.prototype = Object.create(BaseStrokeBuilder.prototype);
    SolidStrokeBuilder.prototype.constructor = SolidStrokeBuilder;

    STROKE_BUILDERS["SolidStroke"] = SolidStrokeBuilder;

    // endregion SolidStrokeBuilder
    // ------------------------------------------------------------------------------------------------------------------------
    //  _____     ______     ______     __  __     ______     _____     ______
    // /\  __-.  /\  __ \   /\  ___\   /\ \_\ \   /\  ___\   /\  __-.  /\  ___\
    // \ \ \/\ \ \ \  __ \  \ \___  \  \ \  __ \  \ \  __\   \ \ \/\ \ \ \___  \
    //  \ \____-  \ \_\ \_\  \/\_____\  \ \_\ \_\  \ \_____\  \ \____-  \/\_____\
    //   \/____/   \/_/\/_/   \/_____/   \/_/\/_/   \/_____/   \/____/   \/_____/
    //
    //  ______   ______     ______     __  __     ______
    // /\__  _\ /\  == \   /\  __ \   /\ \/ /    /\  ___\
    // \/_/\ \/ \ \  __<   \ \ \/\ \  \ \  _"-.  \ \  __\
    //    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\
    //     \/_/   \/_/ /_/   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // DashedStroke
    // region DashedStroke
    /**
     * 虚线样式
     * @constructor
     * @class
     * @extends BaseStroke
     */
    function DashedStroke() {
        BaseStroke.call(this, "dashed");

        /**
         * 虚线的实心部分长度
         * @type {number}
         */
        this.dash1 = 1;

        /**
         * 虚线的空心部分长度
         * @type {number}
         */
        this.dash2 = 1;
    }

    DashedStroke.prototype = Object.create(BaseStroke.prototype);
    DashedStroke.prototype.constructor = DashedStroke;

    STROKES["DashedStroke"] = DashedStroke;

    DashedStroke.toString = function () {
        return "[class DashedStroke]";
    };
    // endregion DashedStroke

    // region DashedStrokeBuilder
    /**
     * 虚线样式构建器
     * @constructor
     * @class
     */
    function DashedStrokeBuilder() {
        this.stroke = new DashedStroke();
    }

    DashedStrokeBuilder.prototype = Object.create(BaseStrokeBuilder.prototype);
    DashedStrokeBuilder.prototype.constructor = DashedStrokeBuilder;

    /**
     * 设置虚线的实心部分长度
     * @param {number} dash1
     * @returns {DashedStrokeBuilder}
     */
    DashedStrokeBuilder.prototype.dash1 = function (dash1) {
        this.stroke.dash1 = dash1;
        return this;
    };
    /**
     * 设置虚线的空心部分长度
     * @param {number} dash2
     * @returns {DashedStrokeBuilder}
     */
    DashedStrokeBuilder.prototype.dash2 = function (dash2) {
        this.stroke.dash2 = dash2;
        return this;
    };

    STROKE_BUILDERS["DashedStroke"] = DashedStrokeBuilder;

    // endregion DashedStrokeBuilder

    // ------------------------------------------------------------------------------------------------------------------------
    //  _____     ______     ______   ______   ______     _____     ______
    // /\  __-.  /\  __ \   /\__  _\ /\__  _\ /\  ___\   /\  __-.  /\  ___\
    // \ \ \/\ \ \ \ \/\ \  \/_/\ \/ \/_/\ \/ \ \  __\   \ \ \/\ \ \ \___  \
    //  \ \____-  \ \_____\    \ \_\    \ \_\  \ \_____\  \ \____-  \/\_____\
    //   \/____/   \/_____/     \/_/     \/_/   \/_____/   \/____/   \/_____/
    //
    //  ______   ______     ______     __  __     ______
    // /\__  _\ /\  == \   /\  __ \   /\ \/ /    /\  ___\
    // \/_/\ \/ \ \  __<   \ \ \/\ \  \ \  _"-.  \ \  __\
    //    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\
    //     \/_/   \/_/ /_/   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // DottedStroke

    // region DottedStroke
    /**
     * 点线样式
     * @constructor
     * @class
     * @extends BaseStroke
     */
    function DottedStroke() {
        BaseStroke.call(this, "dotted");

        /**
         * 点线中点之间的距离
         * @type {number}
         */
        this.dotSpace = 1;
    }

    DottedStroke.prototype = Object.create(BaseStroke.prototype);
    DottedStroke.prototype.constructor = DottedStroke;

    STROKES["DottedStroke"] = DottedStroke;

    DottedStroke.toString = function () {
        return "[class DottedStroke]";
    };
    // endregion DottedStroke

    // region DottedStrokeBuilder
    /**
     * 点线样式构建器
     * @constructor
     * @class
     */
    function DottedStrokeBuilder() {
        this.stroke = new DottedStroke();
    }

    DottedStrokeBuilder.prototype = Object.create(BaseStrokeBuilder.prototype);
    DottedStrokeBuilder.prototype.constructor = DottedStrokeBuilder;

    /**
     * 设置点线中点之间的距离
     * @param {number} dotSpace
     * @returns {DottedStrokeBuilder}
     */
    DottedStrokeBuilder.prototype.dotSpace = function (dotSpace) {
        this.stroke.dotSpace = dotSpace;
        return this;
    };

    STROKE_BUILDERS["DottedStroke"] = DottedStrokeBuilder;

    // endregion DottedStrokeBuilder
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     ______     ______     _____     ______
    // /\  == \   /\  __ \   /\  ___\   /\  ___\   /\  ___\   /\  __-.  /\  ___\
    // \ \  __<   \ \  __ \  \ \ \__ \  \ \ \__ \  \ \  __\   \ \ \/\ \ \ \___  \
    //  \ \_\ \_\  \ \_\ \_\  \ \_____\  \ \_____\  \ \_____\  \ \____-  \/\_____\
    //   \/_/ /_/   \/_/\/_/   \/_____/   \/_____/   \/_____/   \/____/   \/_____/
    //
    //  ______   ______     ______     __  __     ______
    // /\__  _\ /\  == \   /\  __ \   /\ \/ /    /\  ___\
    // \/_/\ \/ \ \  __<   \ \ \/\ \  \ \  _"-.  \ \  __\
    //    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\
    //     \/_/   \/_/ /_/   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // RaggedStroke
    // region RaggedStroke
    /**
     * 锯齿状线样式
     * @constructor
     * @class
     * @extends BaseStroke
     */
    function RaggedStroke() {
        BaseStroke.call(this, "ragged");

        /**
         * 锯齿状线的模式
         * @type {string}
         * @values ["solid", "simple", "random", "dotted", "random dotted", "triple dotted", "random triple dotted"]
         */
        this.pattern = "solid";

        /**
         * 锯齿状线的波高
         * @type {string}
         * @values ["flat", "wavy", "very wavy", "wild"]
         */
        this.waveHeight = "flat";

        /**
         * 锯齿状线的波长
         * @type {string}
         * @values ["very short", "short", "medium", "long"]
         */
        this.waveLength = "short";
    }

    RaggedStroke.prototype = Object.create(BaseStroke.prototype);
    RaggedStroke.prototype.constructor = RaggedStroke;

    STROKES["RaggedStroke"] = RaggedStroke;

    RaggedStroke.toString = function () {
        return "[class RaggedStroke]";
    };
    // endregion RaggedStroke

    // region RaggedStrokeBuilder
    /**
     * 锯齿状线样式构建器
     * @constructor
     * @class
     */
    function RaggedStrokeBuilder() {
        this.stroke = new RaggedStroke();
    }

    RaggedStrokeBuilder.prototype = Object.create(BaseStrokeBuilder.prototype);
    RaggedStrokeBuilder.prototype.constructor = RaggedStrokeBuilder;

    /**
     * 设置锯齿状线的模式
     * @param {string} pattern
     * @returns {RaggedStrokeBuilder}
     */
    RaggedStrokeBuilder.prototype.pattern = function (pattern) {
        this.stroke.pattern = pattern;
        return this;
    };
    /**
     * 设置锯齿状线的波高
     * @param {string} waveHeight
     * @returns {RaggedStrokeBuilder}
     */
    RaggedStrokeBuilder.prototype.waveHeight = function (waveHeight) {
        this.stroke.waveHeight = waveHeight;
        return this;
    };
    /**
     * 设置锯齿状线的波长
     * @param {string} waveLength
     * @returns {RaggedStrokeBuilder}
     */
    RaggedStrokeBuilder.prototype.waveLength = function (waveLength) {
        this.stroke.waveLength = waveLength;
        return this;
    };

    STROKE_BUILDERS["RaggedStroke"] = RaggedStrokeBuilder;

    // endregion RaggedStrokeBuilder
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______   __     ______   ______   __         ______     ______
    // /\  ___\   /\__  _\ /\ \   /\  == \ /\  == \ /\ \       /\  ___\   /\  ___\
    // \ \___  \  \/_/\ \/ \ \ \  \ \  _-/ \ \  _-/ \ \ \____  \ \  __\   \ \___  \
    //  \/\_____\    \ \_\  \ \_\  \ \_\    \ \_\    \ \_____\  \ \_____\  \/\_____\
    //   \/_____/     \/_/   \/_/   \/_/     \/_/     \/_____/   \/_____/   \/_____/
    //
    //  ______   ______     ______     __  __     ______
    // /\__  _\ /\  == \   /\  __ \   /\ \/ /    /\  ___\
    // \/_/\ \/ \ \  __<   \ \ \/\ \  \ \  _"-.  \ \  __\
    //    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\
    //     \/_/   \/_/ /_/   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // StippleStroke
    // region StippleStroke
    /**
     * 斑点线样式
     * @constructor
     * @class
     * @extends BaseStroke
     */
    function StippleStroke() {
        BaseStroke.call(this, "stipple");

        /**
         * 斑点线的点大小
         * @type {string}
         * @values ["tiny", "small", "medium", "large"]
         */
        this.dotSize = "tiny";

        /**
         * 斑点线的变体
         * @type {string}
         * @values ["one size", "small variation", "varied sizes", "random sizes"]
         */
        this.variation = "one size";

        /**
         * 斑点线的密度
         * @type {string}
         * @values ["very dense", "dense", "sparse", "very sparse"]
         */
        this.density = "dense";
    }

    StippleStroke.prototype = Object.create(BaseStroke.prototype);
    StippleStroke.prototype.constructor = StippleStroke;

    STROKES["StippleStroke"] = StippleStroke;

    StippleStroke.toString = function () {
        return "[class StippleStroke]";
    };
    // endregion StippleStroke

    // region StippleStrokeBuilder
    /**
     * 斑点线样式构建器
     * @constructor
     * @class
     */
    function StippleStrokeBuilder() {
        this.stroke = new StippleStroke();
    }

    StippleStrokeBuilder.prototype = Object.create(BaseStrokeBuilder.prototype);
    StippleStrokeBuilder.prototype.constructor = StippleStrokeBuilder;

    /**
     * 设置斑点线的点大小
     * @param {"tiny"|"small"|"medium"|"large"} dotSize
     * @returns {StippleStrokeBuilder}
     */
    StippleStrokeBuilder.prototype.dotSize = function (dotSize) {
        this.stroke.dotSize = dotSize;
        return this;
    };
    /**
     * 设置斑点线的变体
     * @param {"one size"|"small variation"|"varied sizes"|"random sizes"} variation
     * @returns {StippleStrokeBuilder}
     */
    StippleStrokeBuilder.prototype.variation = function (variation) {
        this.stroke.variation = variation;
        return this;
    };
    /**
     * 设置斑点线的密度
     * @param {"very dense"|"dense"|"sparse"|"very sparse"} density
     * @returns {StippleStrokeBuilder}
     */
    StippleStrokeBuilder.prototype.density = function (density) {
        this.stroke.density = density;
        return this;
    };

    STROKE_BUILDERS["StippleStroke"] = StippleStrokeBuilder;

    // endregion StippleStrokeBuilder
    // ------------------------------------------------------------------------------------------------------------------------
    //  __  __     ______     ______   ______     __  __     ______     _____
    // /\ \_\ \   /\  __ \   /\__  _\ /\  ___\   /\ \_\ \   /\  ___\   /\  __-.
    // \ \  __ \  \ \  __ \  \/_/\ \/ \ \ \____  \ \  __ \  \ \  __\   \ \ \/\ \
    //  \ \_\ \_\  \ \_\ \_\    \ \_\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
    //   \/_/\/_/   \/_/\/_/     \/_/   \/_____/   \/_/\/_/   \/_____/   \/____/
    //
    //  ______     ______   ______     ______     __  __     ______
    // /\  ___\   /\__  _\ /\  == \   /\  __ \   /\ \/ /    /\  ___\
    // \ \___  \  \/_/\ \/ \ \  __<   \ \ \/\ \  \ \  _"-.  \ \  __\
    //  \/\_____\    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\
    //   \/_____/     \/_/   \/_/ /_/   \/_____/   \/_/\/_/   \/_____/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // HatchedStroke
    // region HatchedStroke
    /**
     * 斑马线样式
     * @constructor
     * @class
     * @extends BaseStroke
     */
    function HatchedStroke() {
        BaseStroke.call(this, "hatched");

        /**
         * 斑马线的曲线类型
         * @type {string}
         * @values ["straight", "slight curve", "medium curve", "very curved"]
         */
        this.curve = "straight";

        /**
         * 斑马线的粗细
         * @type {string}
         * @values ["hairline", "thin", "medium", "thick"]
         */
        this.hatchThickness = "thin";

        /**
         * 斑马线的微动属性
         * @type {string}
         * @values ["none", "bounce", "loose", "wild"]
         */
        this.jiggle = "none";

        /**
         * 斑马线的旋转
         * @type {string}
         * @values ["none", "slight", "medium", "free"]
         */
        this.rotate = "none";

        /**
         * 斑马线的长度变化
         * @type {string}
         * @values ["equal", "slight variation", "medium variation", "random"]
         */
        this.length = "equal";

        /**
         * 斑马线的间距
         * @type {string}
         * @values ["very close", "close", "distant", "very distant"]
         */
        this.space = "close";
    }

    HatchedStroke.prototype = Object.create(BaseStroke.prototype);
    HatchedStroke.prototype.constructor = HatchedStroke;

    STROKES["HatchedStroke"] = HatchedStroke;

    HatchedStroke.toString = function () {
        return "[class HatchedStroke]";
    };
    // endregion HatchedStroke

    // region HatchedStrokeBuilder
    /**
     * 斑马线样式构建器
     * @constructor
     * @class
     */
    function HatchedStrokeBuilder() {
        this.stroke = new HatchedStroke();
    }

    HatchedStrokeBuilder.prototype = Object.create(BaseStrokeBuilder.prototype);
    HatchedStrokeBuilder.prototype.constructor = HatchedStrokeBuilder;

    /**
     * 设置斑马线的曲线类型
     * @param {"straight"|"slight curve"|"medium curve"|"very curved"} curve
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.curve = function (curve) {
        this.stroke.curve = curve;
        return this;
    };
    /**
     * 设置斑马线的粗细
     * @param {"hairline"|"thin"|"medium"|"thick"} hatchThickness
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.hatchThickness = function (hatchThickness) {
        this.stroke.hatchThickness = hatchThickness;
        return this;
    };
    /**
     * 设置斑马线的微动属性
     * @param {"none"|"bounce"|"loose"|"wild"} jiggle
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.jiggle = function (jiggle) {
        this.stroke.jiggle = jiggle;
        return this;
    };
    /**
     * 设置斑马线的旋转
     * @param {"none"|"slight"|"medium"|"free"} rotate
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.rotate = function (rotate) {
        this.stroke.rotate = rotate;
        return this;
    };
    /**
     * 设置斑马线的长度变化
     * @param {"equal"|"slight variation"|"medium variation"|"random"} length
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.length = function (length) {
        this.stroke.length = length;
        return this;
    };
    /**
     * 设置斑马线的间距
     * @param {"very close"|"close"|"distant"|"very distant"} space
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.space = function (space) {
        this.stroke.space = space;
        return this;
    };

    STROKE_BUILDERS["HatchedStroke"] = HatchedStrokeBuilder;

    // endregion HatchedStrokeBuilder

    STROKES["BUILDERS"] = STROKE_BUILDERS;

    return STROKES;
});
