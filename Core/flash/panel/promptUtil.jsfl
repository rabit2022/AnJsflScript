/**
 * @file: promptUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 20:38
 * @project: AnJsflScript
 * @description:
 */

define(["linqUtil", "xmlPanelUtil"], function (linqUtil, xmlPanelUtil) {
    const { $range } = linqUtil;

    function PromptUtil() {}

    /**
     * 弹出提示框，获取输入的数字
     * @param {string} promptMessage 提示信息
     * @param {number} [defaultValue=0] 默认值
     * @param {string} [alertMessage="请重新输入。"] 输入错误时的提示信息
     * @param {{start: number, end: number, step: number}} [range=null] 范围
     * @returns {number} 输入的数字
     */
    PromptUtil.parseNumber = function (promptMessage, defaultValue, alertMessage, range) {
        if (defaultValue === undefined || defaultValue === null) {
            defaultValue = 0;
        }
        var inputForce = prompt(promptMessage, defaultValue);

        return xmlPanelUtil.parseNumber(inputForce, alertMessage, range);
    };

    /**
     * 解析用户输入的数字或带有正负号的数字。
     * @param {string} promptMessage - 提示用户输入的文本。
     * @param {number} [defaultValue=0] - 默认输入值，如果用户未输入则使用此值。
     * @param {string} [alertMessage="请重新输入合法的数字。"] - 输入无效时显示的警告信息。
     * @returns {{num: number, hasSign: boolean}} 解析结果对象 {num, hasSign} 或 null（如果用户取消输入或输入无效）。
     */
    PromptUtil.parseNumberWithSign = function (
        promptMessage,
        defaultValue,
        alertMessage
    ) {
        // 设置默认值
        defaultValue =
            defaultValue === undefined || defaultValue === null ? 0 : defaultValue;
        alertMessage =
            alertMessage === undefined || alertMessage === null
                ? "请重新输入合法的数字。"
                : alertMessage;

        // 显示提示框并获取用户输入
        var input = prompt(promptMessage, defaultValue);
        if (input === null || input === "") {
            alert(alertMessage);
            return null;
        }

        // 解析输入值
        var result = _parseInput(input);
        if (!result) {
            alert(alertMessage);
            return null;
        }

        return result;

        /**
         * 解析用户输入的数字或带有正负号的数字。
         * @param {string} input - 用户输入的字符串。
         * @returns {{num: number, hasSign: boolean}} 解析结果对象 {num, hasSign} 或 null（如果输入无效）。
         */
        function _parseInput(input) {
            var frameAdjustment = 0; // 用于存储帧数调整的变量
            var hasSign = false; // 是否带有正负号

            // 检查输入是否为数字或带有正负号的数字
            if (!isNaN(Number(input))) {
                frameAdjustment = parseInt(input, 10); // 将输入转换为整数
                hasSign = false;
            } else if (input.startsWith("+")) {
                frameAdjustment = parseInt(input.slice(1), 10); // 去掉正号后转换为整数
                hasSign = true;
            } else if (input.startsWith("-")) {
                frameAdjustment = -parseInt(input.slice(1), 10); // 去掉负号后转换为负整数
                hasSign = true;
            } else {
                return null; // 输入无效
            }

            return {
                num: frameAdjustment,
                hasSign: hasSign
            };
        }
    };

    /**
     * 解析用户输入的关键帧持续帧数，并确定模式（增加、减少或统一）。
     * @param {string} promptMessage - 提示用户输入的文本。
     * @param {number} [defaultValue=0] - 默认输入值，如果用户未输入则使用此值。
     * @param {string} [alertMessage="请重新输入合法的数字。"] - 输入无效时显示的警告信息。
     * @returns {{num: number, mode: "increase"|"decrease"|"unify", direction: 1|-1}} 解析结果对象 {num, mode, direction} 或 null（如果用户取消输入或输入无效）。}} 解析结果对象 {num, mode} 或 null（如果用户取消输入或输入无效）。
     */
    PromptUtil.parseNumberWithMode = function (
        promptMessage,
        defaultValue,
        alertMessage
    ) {
        // 提示用户输入关键帧持续帧数
        var config = PromptUtil.parseNumberWithSign(
            promptMessage,
            defaultValue,
            alertMessage
        );
        const { num, hasSign } = config;

        // 如果用户取消输入或输入无效，直接返回
        if (config === null) return null;

        // 根据输入的符号判断模式
        var mode = hasSign ? (num < 0 ? "decrease" : "increase") : "unify";

        // 正负性
        var direction = Math.sign(num);

        return {
            num: num,
            mode: mode,
            direction: direction
        };
    };

    /**
     * 弹出提示框，获取输入的方向
     * @param {string} promptMessage 提示信息
     * @param {object} [tipDictionary={"右": 1, "左": -1, " ": -1}] 提示字典
     * @returns {number} 输入的方向
     */
    PromptUtil.parseDirection = function (promptMessage, tipDictionary) {
        return xmlPanelUtil.parseDirection(promptMessage, tipDictionary);
    };

    return PromptUtil;
});
