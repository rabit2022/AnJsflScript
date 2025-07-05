/**
 * @file: ColorTransformDefinitions.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/4 22:47
 * @project: AnJsflScript
 * @description:
 */

define(["SObject", "FUNC", "chroma-js", "ElementSelect"], function (
    so,
    FUNC,
    chroma,
    es
) {
    const { SObject } = so;
    const { INHERIT_MACRO } = FUNC;

    const { SelectAll } = es;

    var COLOR_TRANSFORM = {};
    var COLOR_TRANSFORM_BUILDERS = {};
    var COLOR_TRANSFORM_INSTANCES = {};
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     ______     ______     ______     ______     __         ______     ______
    // /\  == \   /\  __ \   /\  ___\   /\  ___\   /\  ___\   /\  __ \   /\ \       /\  __ \   /\  == \
    // \ \  __<   \ \  __ \  \ \___  \  \ \  __\   \ \ \____  \ \ \/\ \  \ \ \____  \ \ \/\ \  \ \  __<
    //  \ \_____\  \ \_\ \_\  \/\_____\  \ \_____\  \ \_____\  \ \_____\  \ \_____\  \ \_____\  \ \_\ \_\
    //   \/_____/   \/_/\/_/   \/_____/   \/_____/   \/_____/   \/_____/   \/_____/   \/_____/   \/_/ /_/
    //
    //  ______   ______     ______     __   __     ______     ______   ______     ______     __    __
    // /\__  _\ /\  == \   /\  __ \   /\ "-.\ \   /\  ___\   /\  ___\ /\  __ \   /\  == \   /\ "-./  \
    // \/_/\ \/ \ \  __<   \ \  __ \  \ \ \-.  \  \ \___  \  \ \  __\ \ \ \/\ \  \ \  __<   \ \ \-./\ \
    //    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\\"\_\  \/\_____\  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \ \_\
    //     \/_/   \/_/ /_/   \/_/\/_/   \/_/ \/_/   \/_____/   \/_/     \/_____/   \/_/ /_/   \/_/  \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BaseColorTransform
    // region BaseColorTransform
    function BaseColorTransform(mode) {
        SObject.call(this, arguments);

        /**
         * 色彩效果
         * @type {string}
         * @values ["none", "tint", "brightness", "alpha", "color"]
         */
        this.mode = mode || "none";
    }

    INHERIT_MACRO(BaseColorTransform, SObject);
    // endregion BaseColorTransform

    // region BaseColorTransformBuilder

    function BaseColorTransformBuilder() {
        SObject.call(this, arguments);

        this.colorTransform = new BaseColorTransform();
    }

    INHERIT_MACRO(BaseColorTransformBuilder, SObject);

    BaseColorTransformBuilder.prototype.build = function () {
        return this.colorTransform;
    };
    // endregion BaseColorTransformBuilder

    // ------------------------------------------------------------------------------------------------------------------------
    //  __   __     ______     __   __     ______     ______     ______     __
    // /\ "-.\ \   /\  __ \   /\ "-.\ \   /\  ___\   /\  ___\   /\  __ \   /\ \
    // \ \ \-.  \  \ \ \/\ \  \ \ \-.  \  \ \  __\   \ \ \____  \ \ \/\ \  \ \ \____
    //  \ \_\\"\_\  \ \_____\  \ \_\\"\_\  \ \_____\  \ \_____\  \ \_____\  \ \_____\
    //   \/_/ \/_/   \/_____/   \/_/ \/_/   \/_____/   \/_____/   \/_____/   \/_____/
    //
    //  ______     ______     ______   ______     ______     __   __     ______
    // /\  __ \   /\  == \   /\__  _\ /\  == \   /\  __ \   /\ "-.\ \   /\  ___\
    // \ \ \/\ \  \ \  __<   \/_/\ \/ \ \  __<   \ \  __ \  \ \ \-.  \  \ \___  \
    //  \ \_____\  \ \_\ \_\    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\\"\_\  \/\_____\
    //   \/_____/   \/_/ /_/     \/_/   \/_/ /_/   \/_/\/_/   \/_/ \/_/   \/_____/
    //
    //  ______   ______     ______     __    __
    // /\  ___\ /\  __ \   /\  == \   /\ "-./  \
    // \ \  __\ \ \ \/\ \  \ \  __<   \ \ \-./\ \
    //  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \ \_\
    //   \/_/     \/_____/   \/_/ /_/   \/_/  \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // NoneColorTransform
    // region NoneColorTransform

    function NoneColorTransform() {
        BaseColorTransform.call(this, "none");
        this.mode = "Advanced";
        /**
         * xA+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Alpha=colorAlphaPercent*originalAlpha/100+colorAlphaAmount
         */
        this.colorAlphaAmount = 0;
        /**
         * 透明度
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Alpha=colorAlphaPercent*originalAlpha/100+colorAlphaAmount
         */
        this.colorAlphaPercent = 100;
        /**
         * xR+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Red=colorRedPercent*originalRed/100+colorRedAmount
         */
        this.colorRedAmount = 0;
        /**
         * 红色
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Red=colorRedPercent*originalRed/100+colorRedAmount
         */
        this.colorRedPercent = 100;
        /**
         * xG+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Green=colorGreenPercent*originalGreen/100+colorGreenAmount
         */
        this.colorGreenAmount = 0;
        /**
         * 绿色
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Green=colorGreenPercent*originalGreen/100+colorGreenAmount
         */
        this.colorGreenPercent = 100;
        /**
         * xB+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Blue=colorBluePercent*originalBlue/100+colorBlueAmount
         */
        this.colorBlueAmount = 0;
        /**
         * 蓝色
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Blue=colorBluePercent*originalBlue/100+colorBlueAmount
         */
        this.colorBluePercent = 100;
    }

    INHERIT_MACRO(NoneColorTransform, BaseColorTransform);

    COLOR_TRANSFORM["NoneColorTransform"] = NoneColorTransform;
    // endregion NoneColorTransform

    // region setInstanceNone
    function setInstanceNone(elements) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        elements.forEach(function (element) {
            element.colorMode = "none";
        });
    }

    COLOR_TRANSFORM_INSTANCES["setInstanceNone"] = setInstanceNone;

    // endregion setInstanceNone

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     ______     __     ______     __  __     ______   __   __     ______     ______
    // /\  == \   /\  == \   /\ \   /\  ___\   /\ \_\ \   /\__  _\ /\ "-.\ \   /\  ___\   /\  ___\
    // \ \  __<   \ \  __<   \ \ \  \ \ \__ \  \ \  __ \  \/_/\ \/ \ \ \-.  \  \ \  __\   \ \___  \
    //  \ \_____\  \ \_\ \_\  \ \_\  \ \_____\  \ \_\ \_\    \ \_\  \ \_\\"\_\  \ \_____\  \/\_____\
    //   \/_____/   \/_/ /_/   \/_/   \/_____/   \/_/\/_/     \/_/   \/_/ \/_/   \/_____/   \/_____/
    //
    //  ______     ______     ______     __         ______     ______     ______   ______     ______
    // /\  ___\   /\  ___\   /\  __ \   /\ \       /\  __ \   /\  == \   /\__  _\ /\  == \   /\  __ \
    // \ \___  \  \ \ \____  \ \ \/\ \  \ \ \____  \ \ \/\ \  \ \  __<   \/_/\ \/ \ \  __<   \ \  __ \
    //  \/\_____\  \ \_____\  \ \_____\  \ \_____\  \ \_____\  \ \_\ \_\    \ \_\  \ \_\ \_\  \ \_\ \_\
    //   \/_____/   \/_____/   \/_____/   \/_____/   \/_____/   \/_/ /_/     \/_/   \/_/ /_/   \/_/\/_/
    //
    //  __   __     ______     ______   ______     ______     __    __
    // /\ "-.\ \   /\  ___\   /\  ___\ /\  __ \   /\  == \   /\ "-./  \
    // \ \ \-.  \  \ \___  \  \ \  __\ \ \ \/\ \  \ \  __<   \ \ \-./\ \
    //  \ \_\\"\_\  \/\_____\  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \ \_\
    //   \/_/ \/_/   \/_____/   \/_/     \/_____/   \/_/ /_/   \/_/  \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // BrightnessColorTransform
    // region BrightnessColorTransform
    function BrightnessColorTransform() {
        BaseColorTransform.call(this, "Brightness");
        /**
         * 亮度
         * @type {number}
         * @range [-100, 100]
         * @default 0
         */
        this.brightnessPercent = 0;
    }

    INHERIT_MACRO(BrightnessColorTransform, BaseColorTransform);
    COLOR_TRANSFORM["BrightnessColorTransform"] = BrightnessColorTransform;
    // endregion BrightnessColorTransform

    // region BrightnessColorTransformBuilder
    function BrightnessColorTransformBuilder() {
        BaseColorTransformBuilder.call(this);
        this.colorTransform = new BrightnessColorTransform();
    }

    INHERIT_MACRO(BrightnessColorTransformBuilder, BaseColorTransformBuilder);
    COLOR_TRANSFORM_BUILDERS["BrightnessColorTransformBuilder"] =
        BrightnessColorTransformBuilder;

    BrightnessColorTransformBuilder.prototype.setBrightnessPercent = function (
        brightnessPercent
    ) {
        this.colorTransform.brightnessPercent = brightnessPercent;
        return this;
    };
    // endregion BrightnessColorTransformBuilder

    // region setInstanceBrightness
    function setInstanceBrightness(elements, brightness) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }
        SelectAll(elements);

        var doc = fl.getDocumentDOM(); //文档
        doc.setInstanceBrightness(brightness);
    }

    COLOR_TRANSFORM_INSTANCES["setInstanceBrightness"] = setInstanceBrightness;

    // endregion setInstanceBrightness
    // ------------------------------------------------------------------------------------------------------------------------
    //  ______   __     __   __     ______   ______     ______     __         ______     ______
    // /\__  _\ /\ \   /\ "-.\ \   /\__  _\ /\  ___\   /\  __ \   /\ \       /\  __ \   /\  == \
    // \/_/\ \/ \ \ \  \ \ \-.  \  \/_/\ \/ \ \ \____  \ \ \/\ \  \ \ \____  \ \ \/\ \  \ \  __<
    //    \ \_\  \ \_\  \ \_\\"\_\    \ \_\  \ \_____\  \ \_____\  \ \_____\  \ \_____\  \ \_\ \_\
    //     \/_/   \/_/   \/_/ \/_/     \/_/   \/_____/   \/_____/   \/_____/   \/_____/   \/_/ /_/
    //
    //  ______   ______     ______     __   __     ______     ______   ______     ______     __    __
    // /\__  _\ /\  == \   /\  __ \   /\ "-.\ \   /\  ___\   /\  ___\ /\  __ \   /\  == \   /\ "-./  \
    // \/_/\ \/ \ \  __<   \ \  __ \  \ \ \-.  \  \ \___  \  \ \  __\ \ \ \/\ \  \ \  __<   \ \ \-./\ \
    //    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\\"\_\  \/\_____\  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \ \_\
    //     \/_/   \/_/ /_/   \/_/\/_/   \/_/ \/_/   \/_____/   \/_/     \/_____/   \/_/ /_/   \/_/  \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // TintColorTransform
    // region TintColorTransform
    function TintColorTransform() {
        BaseColorTransform.call(this, "Tint");
        /**
         * 色调
         * @type {number}
         * @range [0, 100]
         * @default 0
         */
        this.tintPercent = 0;
        /**
         * 红色
         * @type {number}
         * @range [0, 255]
         * @default 0
         */
        this.tintRed = 0;
        /**
         * 绿色
         * @type {number}
         * @range [0, 255]
         * @default 0
         */
        this.tintGreen = 0;
        /**
         * 蓝色
         * @type {number}
         * @range [0, 255]
         * @default 0
         */
        this.tintBlue = 0;
    }

    INHERIT_MACRO(TintColorTransform, BaseColorTransform);
    COLOR_TRANSFORM["TintColorTransform"] = TintColorTransform;
    // endregion TintColorTransform

    // region TintColorTransformBuilder
    function TintColorTransformBuilder() {
        BaseColorTransformBuilder.call(this);
        this.colorTransform = new TintColorTransform();
    }

    INHERIT_MACRO(TintColorTransformBuilder, BaseColorTransformBuilder);
    COLOR_TRANSFORM_BUILDERS["TintColorTransformBuilder"] = TintColorTransformBuilder;

    TintColorTransformBuilder.prototype.setTintPercent = function (tintPercent) {
        this.colorTransform.tintPercent = tintPercent;
        return this;
    };

    TintColorTransformBuilder.prototype.setTintRed = function (tintRed) {
        this.colorTransform.tintRed = tintRed;
        return this;
    };

    TintColorTransformBuilder.prototype.setTintGreen = function (tintGreen) {
        this.colorTransform.tintGreen = tintGreen;
        return this;
    };

    TintColorTransformBuilder.prototype.setTintBlue = function (tintBlue) {
        this.colorTransform.tintBlue = tintBlue;
        return this;
    };

    TintColorTransformBuilder.prototype.setInstanceTint = function (color, strength) {
        const { red, green, blue } = chroma(color).rgb();
        this.colorTransform.tintRed = red;
        this.colorTransform.tintGreen = green;
        this.colorTransform.tintBlue = blue;

        this.colorTransform.tintPercent = strength;
        return this;
    };

    // endregion TintColorTransformBuilder

    // region setInstanceTint
    function setInstanceTint(elements, color, strength) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }
        SelectAll(elements);

        var doc = fl.getDocumentDOM(); //文档
        doc.setInstanceTint(color, strength);
    }

    function setInstanceTintRGB(elements, tintPercent, tintRed, tintGreen, tintBlue) {
        const color = chroma.rgb(tintRed, tintGreen, tintBlue).hex();
        setInstanceTint(elements, color, tintPercent);
    }

    COLOR_TRANSFORM_INSTANCES["setInstanceTint"] = setInstanceTint;
    COLOR_TRANSFORM_INSTANCES["setInstanceTintRGB"] = setInstanceTintRGB;

    // endregion setInstanceTint

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     _____     __   __   ______     __   __     ______     ______     _____     ______
    // /\  __ \   /\  __-.  /\ \ / /  /\  __ \   /\ "-.\ \   /\  ___\   /\  ___\   /\  __-.  /\  ___\
    // \ \  __ \  \ \ \/\ \ \ \ \'/   \ \  __ \  \ \ \-.  \  \ \ \____  \ \  __\   \ \ \/\ \ \ \ \____
    //  \ \_\ \_\  \ \____-  \ \__|    \ \_\ \_\  \ \_\\"\_\  \ \_____\  \ \_____\  \ \____-  \ \_____\
    //   \/_/\/_/   \/____/   \/_/      \/_/\/_/   \/_/ \/_/   \/_____/   \/_____/   \/____/   \/_____/
    //
    //  ______     __         ______     ______     ______   ______     ______     __   __     ______
    // /\  __ \   /\ \       /\  __ \   /\  == \   /\__  _\ /\  == \   /\  __ \   /\ "-.\ \   /\  ___\
    // \ \ \/\ \  \ \ \____  \ \ \/\ \  \ \  __<   \/_/\ \/ \ \  __<   \ \  __ \  \ \ \-.  \  \ \___  \
    //  \ \_____\  \ \_____\  \ \_____\  \ \_\ \_\    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\\"\_\  \/\_____\
    //   \/_____/   \/_____/   \/_____/   \/_/ /_/     \/_/   \/_/ /_/   \/_/\/_/   \/_/ \/_/   \/_____/
    //
    //  ______   ______     ______     __    __
    // /\  ___\ /\  __ \   /\  == \   /\ "-./  \
    // \ \  __\ \ \ \/\ \  \ \  __<   \ \ \-./\ \
    //  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \ \_\
    //   \/_/     \/_____/   \/_/ /_/   \/_/  \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // AdvancedColorTransform
    // region AdvancedColorTransform
    function AdvancedColorTransform() {
        BaseColorTransform.call(this, "Advanced");
        /**
         * 色彩效果
         * @type {string}
         * @values ["none", "tint", "brightness", "alpha", "advanced"]
         */
        this.mode = "Advanced";
        /**
         * xA+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Alpha=colorAlphaPercent*originalAlpha/100+colorAlphaAmount
         */
        this.colorAlphaAmount = 0;
        /**
         * 透明度
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Alpha=colorAlphaPercent*originalAlpha/100+colorAlphaAmount
         */
        this.colorAlphaPercent = 100;
        /**
         * xR+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Red=colorRedPercent*originalRed/100+colorRedAmount
         */
        this.colorRedAmount = 0;
        /**
         * 红色
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Red=colorRedPercent*originalRed/100+colorRedAmount
         */
        this.colorRedPercent = 100;
        /**
         * xG+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Green=colorGreenPercent*originalGreen/100+colorGreenAmount
         */
        this.colorGreenAmount = 0;
        /**
         * 绿色
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Green=colorGreenPercent*originalGreen/100+colorGreenAmount
         */
        this.colorGreenPercent = 100;
        /**
         * xB+
         * @type {number}
         * @range [0, 255]
         * @default 0
         * @description Blue=colorBluePercent*originalBlue/100+colorBlueAmount
         */
        this.colorBlueAmount = 0;
        /**
         * 蓝色
         * @type {number}
         * @range [0, 100]
         * @default 100
         * @description Blue=colorBluePercent*originalBlue/100+colorBlueAmount
         */
        this.colorBluePercent = 100;
    }

    INHERIT_MACRO(AdvancedColorTransform, BaseColorTransform);
    COLOR_TRANSFORM["AdvancedColorTransform"] = AdvancedColorTransform;
    // endregion AdvancedColorTransform

    // region AdvancedColorTransformBuilder
    function AdvancedColorTransformBuilder() {
        BaseColorTransformBuilder.call(this);
        this.colorTransform = new AdvancedColorTransform();
    }

    INHERIT_MACRO(AdvancedColorTransformBuilder, BaseColorTransformBuilder);
    COLOR_TRANSFORM_BUILDERS["AdvancedColorTransformBuilder"] =
        AdvancedColorTransformBuilder;

    AdvancedColorTransformBuilder.prototype.setColorAlphaAmount = function (
        colorAlphaAmount
    ) {
        this.colorTransform.colorAlphaAmount = colorAlphaAmount;
        return this;
    };

    AdvancedColorTransformBuilder.prototype.setColorAlphaPercent = function (
        colorAlphaPercent
    ) {
        this.colorTransform.colorAlphaPercent = colorAlphaPercent;
        return this;
    };

    AdvancedColorTransformBuilder.prototype.setColorRedAmount = function (
        colorRedAmount
    ) {
        this.colorTransform.colorRedAmount = colorRedAmount;
        return this;
    };

    AdvancedColorTransformBuilder.prototype.setColorRedPercent = function (
        colorRedPercent
    ) {
        this.colorTransform.colorRedPercent = colorRedPercent;
        return this;
    };

    AdvancedColorTransformBuilder.prototype.setColorGreenAmount = function (
        colorGreenAmount
    ) {
        this.colorTransform.colorGreenAmount = colorGreenAmount;
        return this;
    };

    AdvancedColorTransformBuilder.prototype.setColorGreenPercent = function (
        colorGreenPercent
    ) {
        this.colorTransform.colorGreenPercent = colorGreenPercent;
        return this;
    };

    AdvancedColorTransformBuilder.prototype.setColorBlueAmount = function (
        colorBlueAmount
    ) {
        this.colorTransform.colorBlueAmount = colorBlueAmount;
        return this;
    };

    AdvancedColorTransformBuilder.prototype.setColorBluePercent = function (
        colorBluePercent
    ) {
        this.colorTransform.colorBluePercent = colorBluePercent;
        return this;
    };
    // endregion AdvancedColorTransformBuilder

    // region setInstanceAdvancedColor
    function setInstanceAdvancedColor(elements, advancedColorTransform) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        SelectAll(elements);

        elements.forEach(function (element) {
            element.colorMode = "advanced";

            element.colorAlphaAmount = advancedColorTransform.colorAlphaAmount;
            element.colorAlphaPercent = advancedColorTransform.colorAlphaPercent;
            element.colorRedAmount = advancedColorTransform.colorRedAmount;
            element.colorRedPercent = advancedColorTransform.colorRedPercent;
            element.colorGreenAmount = advancedColorTransform.colorGreenAmount;
            element.colorGreenPercent = advancedColorTransform.colorGreenPercent;
            element.colorBlueAmount = advancedColorTransform.colorBlueAmount;
            element.colorBluePercent = advancedColorTransform.colorBluePercent;
        });
    }

    COLOR_TRANSFORM_INSTANCES["setInstanceAdvancedColor"] = setInstanceAdvancedColor;
    // endregion setInstanceAdvancedColor

    // ------------------------------------------------------------------------------------------------------------------------
    //  ______     __         ______   __  __     ______     ______     ______
    // /\  __ \   /\ \       /\  == \ /\ \_\ \   /\  __ \   /\  ___\   /\  __ \
    // \ \  __ \  \ \ \____  \ \  _-/ \ \  __ \  \ \  __ \  \ \ \____  \ \ \/\ \
    //  \ \_\ \_\  \ \_____\  \ \_\    \ \_\ \_\  \ \_\ \_\  \ \_____\  \ \_____\
    //   \/_/\/_/   \/_____/   \/_/     \/_/\/_/   \/_/\/_/   \/_____/   \/_____/
    //
    //  __         ______     ______     ______   ______     ______     __   __
    // /\ \       /\  __ \   /\  == \   /\__  _\ /\  == \   /\  __ \   /\ "-.\ \
    // \ \ \____  \ \ \/\ \  \ \  __<   \/_/\ \/ \ \  __<   \ \  __ \  \ \ \-.  \
    //  \ \_____\  \ \_____\  \ \_\ \_\    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\\"\_\
    //   \/_____/   \/_____/   \/_/ /_/     \/_/   \/_/ /_/   \/_/\/_/   \/_/ \/_/
    //
    //  ______     ______   ______     ______     __    __
    // /\  ___\   /\  ___\ /\  __ \   /\  == \   /\ "-./  \
    // \ \___  \  \ \  __\ \ \ \/\ \  \ \  __<   \ \ \-./\ \
    //  \/\_____\  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \ \_\
    //   \/_____/   \/_/     \/_____/   \/_/ /_/   \/_/  \/_/
    //
    // ------------------------------------------------------------------------------------------------------------------------
    // AlphaColorTransform
    // region AlphaColorTransform
    function AlphaColorTransform() {
        BaseColorTransform.call(this, "Alpha");
        /**
         * 透明度
         * @type {number}
         * @range [0, 100]
         * @default 100
         */
        this.alphaPercent = 100;
    }

    INHERIT_MACRO(AlphaColorTransform, BaseColorTransform);
    COLOR_TRANSFORM["AlphaColorTransform"] = AlphaColorTransform;
    // endregion AlphaColorTransform

    // region AlphaColorTransformBuilder
    function AlphaColorTransformBuilder() {
        BaseColorTransformBuilder.call(this);
        this.colorTransform = new AlphaColorTransform();
    }

    INHERIT_MACRO(AlphaColorTransformBuilder, BaseColorTransformBuilder);
    COLOR_TRANSFORM_BUILDERS["AlphaColorTransformBuilder"] = AlphaColorTransformBuilder;

    AlphaColorTransformBuilder.prototype.setAlphaPercent = function (alphaPercent) {
        this.colorTransform.alphaPercent = alphaPercent;
        return this;
    };
    // endregion AlphaColorTransformBuilder

    // region setInstanceAlpha
    function setInstanceAlpha(elements, alphaPercent) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        SelectAll(elements);

        var doc = fl.getDocumentDOM(); //文档
        doc.setInstanceAlpha(alphaPercent);
    }

    COLOR_TRANSFORM_INSTANCES["setInstanceAlpha"] = setInstanceAlpha;
    // endregion setInstanceAlpha

    COLOR_TRANSFORM["BUILDERS"] = COLOR_TRANSFORM_BUILDERS;
    COLOR_TRANSFORM["INSTANCES"] = COLOR_TRANSFORM_INSTANCES;

    return COLOR_TRANSFORM;
});
