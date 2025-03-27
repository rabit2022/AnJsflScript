/**
 * @file: PromptUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 20:38
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    function PromptUtil() {}

    /**
     * 弹出提示框，获取输入的数字
     * @param {string} promptMessage 提示信息
     * @param {number} [defaultValue=0] 默认值
     * @param {string} [alertMessage="请重新输入。"] 输入错误时的提示信息
     * @returns {number} 输入的数字
     */
    PromptUtil.parseNumber = function (promptMessage, defaultValue, alertMessage) {
        if (defaultValue === null) {
            defaultValue = 0;
        }
        if (alertMessage === null) {
            alertMessage = '请重新输入合法的数字。';
        }

        var inputForce = prompt(promptMessage, defaultValue);
        if (inputForce === null || isNaN(Number(inputForce))) {
            alert(alertMessage);
            return null;
        }

        return Number(inputForce);
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
                ? '请重新输入合法的数字。'
                : alertMessage;

        // 显示提示框并获取用户输入
        var input = prompt(promptMessage, defaultValue);
        if (input == null || input === '') {
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
            } else if (input.startsWith('+')) {
                frameAdjustment = parseInt(input.slice(1), 10); // 去掉正号后转换为整数
                hasSign = true;
            } else if (input.startsWith('-')) {
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
     * @param {number} [defaultValue=0] - 默认输入值，如果用户未输入则使用此值。
     * @returns {{num: number, mode: string}} 解析结果对象 {num, mode} 或 null（如果用户取消输入或输入无效）。
     */
    PromptUtil.parseNumberWithMode = function (defaultValue) {
        // 设置默认值
        defaultValue =
            defaultValue === undefined || defaultValue === null ? 0 : defaultValue;

        // 提示用户输入关键帧持续帧数
        var config = PromptUtil.parseNumberWithSign(
            '请输入关键帧持续帧数（“+3”为增加，“-3”为减少，无符号“3”为统一）',
            defaultValue,
            '请输入合法的数字，例如“+3”或“-3”或“3”'
        );

        // 如果用户取消输入或输入无效，直接返回
        if (config === null) return null;

        // 根据输入的符号判断模式
        var mode = config.hasSign ? (config.num < 0 ? 'decrease' : 'increase') : 'unify';

        return {
            num: config.num,
            mode: mode
        };
    };

    /**
     * 弹出提示框，获取输入的方向
     * @param {string} promptMessage 提示信息
     * @param {object} [tipDictionary={"右": 1, "左": -1, " ": -1}] 提示字典
     * @returns {number} 输入的方向
     */
    PromptUtil.parseDirection = function (promptMessage, tipDictionary) {
        if (tipDictionary === null) {
            tipDictionary = { 右: 1, 左: -1, ' ': -1 };
        }

        var firstTip = Object.keys(tipDictionary)[0];
        var inputDirection = prompt(promptMessage, firstTip);
        // 右为1，左为-1   默认为右，空格为左
        var direction = tipDictionary[firstTip];
        if (inputDirection in tipDictionary) {
            direction = tipDictionary[inputDirection];
        } else if (inputDirection === null) {
            alert('方向不能为空，请重新输入。');
            return null;
        } else {
            alert('输入错误(方向只能输入空格或右)，请重新输入。');
            return null;
        }
        return direction;
    };

    return PromptUtil;
});
