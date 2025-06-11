/**
 * @file: StrokeDefinitions.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/4 20:37
 * @project: AnJsflScript
 * @description:
 */

define(["chroma-js""SObject", "FUNC"], function (chroma,so,FUNC) {
    const { INHERIT_MACRO } = FUNC;
    const { SObject } = so;


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
        SObject.call(this,arguments);
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
         * @note 如果设置为{}，Animate 会闪退
         */
        this.shapeFill = {
            tag: 0,
            color: "#000000",
            style: style || "solid",
            matrix: {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            }
        };

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

    INHERIT_MACRO(BaseStroke, SObject);
    // endregion BaseStroke

    // region BaseStrokeBuilder
    /**
     * 基类 Stroke 构建器
     * @constructor
     * @class
     */
    function BaseStrokeBuilder() {
        SObject.call(this,arguments);

        this.stroke = new BaseStroke();
    }
    INHERIT_MACRO(BaseStrokeBuilder, SObject);

    /**
     * 设置是否锐化转角
     * @param {boolean} breakAtCorners
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setBreakAtCorners = function (breakAtCorners) {
        this.stroke.breakAtCorners = breakAtCorners;
        return this;
    };
    /**
     * 设置笔触端类型
     * @param {string} capType
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setCapType = function (capType) {
        this.stroke.capType = capType;
        return this;
    };
    /**
     * 设置是否对笔触设置笔触提示
     * @param {boolean} strokeHinting
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setStrokeHinting = function (strokeHinting) {
        this.stroke.strokeHinting = strokeHinting;
        return this;
    };
    /**
     * 设置笔触样式
     * @param {string} style
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setStyle = function (style) {
        this.stroke.style = style;
        this.stroke.shapeFill.style = style;
        return this;
    };
    /**
     * 设置笔触大小
     * @param {number} thickness
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setThickness = function (thickness) {
        this.stroke.thickness = thickness;
        return this;
    };
    /**
     * 设置笔触颜色
     * @param {string|number|W3CX11ColorName} color
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setColor = function (color) {
        color = chroma(color).hex();

        this.stroke.color = color;
        this.stroke.shapeFill.color = color;
        return this;
    };
    /**
     * 设置笔触颜色的透明度
     * @param {number} alpha
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setAlpha = function (alpha) {
        var color = chroma(this.stroke.color).alpha(alpha).hex();

        this.stroke.color = color;
        this.stroke.shapeFill.color = color;
        return this;
    };
    /**
     * 设置笔触的填充设置
     * @param {Fill} shapeFill
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setShapeFill = function (shapeFill) {
        this.stroke.shapeFill = shapeFill;
        return this;
    };
    /**
     * 设置笔触的缩放类型
     * @param {string} scaleType
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setScaleType = function (scaleType) {
        this.stroke.scaleType = scaleType;
        return this;
    };
    /**
     * 设置笔触联接类型
     * @param {string} joinType
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setJoinType = function (joinType) {
        this.stroke.joinType = joinType;
        return this;
    };
    /**
     * 设置角度限制值，用于截断尖角
     * @param {number} miterLimit
     * @returns {BaseStrokeBuilder}
     */
    BaseStrokeBuilder.prototype.setMiterLimit = function (miterLimit) {
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
    INHERIT_MACRO(NoStroke, SObject);

    STROKES["NoStroke"] = NoStroke;

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

    INHERIT_MACRO(NoStrokeBuilder, BaseStrokeBuilder);

    STROKE_BUILDERS["NoStrokeBuilder"] = NoStrokeBuilder;

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
    INHERIT_MACRO(SolidStroke, SObject);

    STROKES["SolidStroke"] = SolidStroke;

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

    INHERIT_MACRO(SolidStrokeBuilder, BaseStrokeBuilder);

    STROKE_BUILDERS["SolidStrokeBuilder"] = SolidStrokeBuilder;

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
    INHERIT_MACRO(DashedStroke, SObject);


    STROKES["DashedStroke"] = DashedStroke;

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

    INHERIT_MACRO(DashedStrokeBuilder, BaseStrokeBuilder);

    /**
     * 设置虚线的实心部分长度
     * @param {number} dash1
     * @returns {DashedStrokeBuilder}
     */
    DashedStrokeBuilder.prototype.setDash1 = function (dash1) {
        this.stroke.dash1 = dash1;
        return this;
    };
    /**
     * 设置虚线的空心部分长度
     * @param {number} dash2
     * @returns {DashedStrokeBuilder}
     */
    DashedStrokeBuilder.prototype.setDash2 = function (dash2) {
        this.stroke.dash2 = dash2;
        return this;
    };

    STROKE_BUILDERS["DashedStrokeBuilder"] = DashedStrokeBuilder;

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

    INHERIT_MACRO(DottedStroke, SObject);

    STROKES["DottedStroke"] = DottedStroke;

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

    INHERIT_MACRO(DottedStrokeBuilder, BaseStrokeBuilder);

    /**
     * 设置点线中点之间的距离
     * @param {number} dotSpace
     * @returns {DottedStrokeBuilder}
     */
    DottedStrokeBuilder.prototype.setDotSpace = function (dotSpace) {
        this.stroke.dotSpace = dotSpace;
        return this;
    };

    STROKE_BUILDERS["DottedStrokeBuilder"] = DottedStrokeBuilder;

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
    INHERIT_MACRO(RaggedStroke, SObject);

    STROKES["RaggedStroke"] = RaggedStroke;

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

    INHERIT_MACRO(RaggedStrokeBuilder, BaseStrokeBuilder);

    /**
     * 设置锯齿状线的模式
     * @param {string} pattern
     * @returns {RaggedStrokeBuilder}
     */
    RaggedStrokeBuilder.prototype.setPattern = function (pattern) {
        this.stroke.pattern = pattern;
        return this;
    };
    /**
     * 设置锯齿状线的波高
     * @param {string} waveHeight
     * @returns {RaggedStrokeBuilder}
     */
    RaggedStrokeBuilder.prototype.setWaveHeight = function (waveHeight) {
        this.stroke.waveHeight = waveHeight;
        return this;
    };
    /**
     * 设置锯齿状线的波长
     * @param {string} waveLength
     * @returns {RaggedStrokeBuilder}
     */
    RaggedStrokeBuilder.prototype.setWaveLength = function (waveLength) {
        this.stroke.waveLength = waveLength;
        return this;
    };

    STROKE_BUILDERS["RaggedStrokeBuilder"] = RaggedStrokeBuilder;

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
    INHERIT_MACRO(StippleStroke, SObject);

    STROKES["StippleStroke"] = StippleStroke;

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

    INHERIT_MACRO(StippleStrokeBuilder, BaseStrokeBuilder);

    /**
     * 设置斑点线的点大小
     * @param {"tiny"|"small"|"medium"|"large"} dotSize
     * @returns {StippleStrokeBuilder}
     */
    StippleStrokeBuilder.prototype.setDotSize = function (dotSize) {
        this.stroke.dotSize = dotSize;
        return this;
    };
    /**
     * 设置斑点线的变体
     * @param {"one size"|"small variation"|"varied sizes"|"random sizes"} variation
     * @returns {StippleStrokeBuilder}
     */
    StippleStrokeBuilder.prototype.setVariation = function (variation) {
        this.stroke.variation = variation;
        return this;
    };
    /**
     * 设置斑点线的密度
     * @param {"very dense"|"dense"|"sparse"|"very sparse"} density
     * @returns {StippleStrokeBuilder}
     */
    StippleStrokeBuilder.prototype.setDenensity = function (density) {
        this.stroke.density = density;
        return this;
    };

    STROKE_BUILDERS["StippleStrokeBuilder"] = StippleStrokeBuilder;

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

    INHERIT_MACRO(HatchedStroke, SObject);

    STROKES["HatchedStroke"] = HatchedStroke;

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

    INHERIT_MACRO(HatchedStrokeBuilder, BaseStrokeBuilder);

    /**
     * 设置斑马线的曲线类型
     * @param {"straight"|"slight curve"|"medium curve"|"very curved"} curve
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.setCurve = function (curve) {
        this.stroke.curve = curve;
        return this;
    };
    /**
     * 设置斑马线的粗细
     * @param {"hairline"|"thin"|"medium"|"thick"} hatchThickness
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.setHatchThickness = function (hatchThickness) {
        this.stroke.hatchThickness = hatchThickness;
        return this;
    };
    /**
     * 设置斑马线的微动属性
     * @param {"none"|"bounce"|"loose"|"wild"} jiggle
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.setJiggle = function (jiggle) {
        this.stroke.jiggle = jiggle;
        return this;
    };
    /**
     * 设置斑马线的旋转
     * @param {"none"|"slight"|"medium"|"free"} rotate
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.setRotate = function (rotate) {
        this.stroke.rotate = rotate;
        return this;
    };
    /**
     * 设置斑马线的长度变化
     * @param {"equal"|"slight variation"|"medium variation"|"random"} length
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.setLength = function (length) {
        this.stroke.length = length;
        return this;
    };
    /**
     * 设置斑马线的间距
     * @param {"very close"|"close"|"distant"|"very distant"} space
     * @returns {HatchedStrokeBuilder}
     */
    HatchedStrokeBuilder.prototype.setSpace = function (space) {
        this.stroke.space = space;
        return this;
    };

    STROKE_BUILDERS["HatchedStrokeBuilder"] = HatchedStrokeBuilder;

    // endregion HatchedStrokeBuilder

    STROKES["BUILDERS"] = STROKE_BUILDERS;

    return STROKES;
});
