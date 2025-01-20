/**
 * @file: PromptUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 20:38
 * @project: AnJsflScript
 * @description:
 */


function Prompt(message) {
}

/**
 * 弹出提示框，获取输入的数字
 * @param {string} promptMessage 提示信息
 * @param {number} [defaultValue=0] 默认值
 * @param {string} [alertMessage="请重新输入。"] 输入错误时的提示信息
 * @returns {number} 输入的数字
 */
Prompt.prototype.parseNumber = function (promptMessage, defaultValue, alertMessage) {
    if (defaultValue === null) {
        defaultValue = 0;
    }
    if (alertMessage === null) {
        alertMessage = "请重新输入。";
    }

    var inputForce = prompt(promptMessage, defaultValue);
    if (inputForce === null || isNaN(Number(inputForce))) {
        alert(alertMessage);
        return null;
    }

    var force = Number(inputForce);
    return force;
}

/**
 * 弹出提示框，获取输入的方向
 * @param {string} promptMessage 提示信息
 * @param {object} [tipDictionary={"右": 1, "左": -1, "空格": -1}] 提示字典
 * @returns {number} 输入的方向
 */
Prompt.prototype.parseDirection = function (promptMessage, tipDictionary) {
    if (tipDictionary === null) {
        tipDictionary = {"右": 1, "左": -1, " ": -1};
    }
    
    var firstTip = dictUtil.keys(tipDictionary)[0];
    var inputDirection = prompt(promptMessage, firstTip);
    // 右为1，左为-1   默认为右，空格为左
    var direction = tipDictionary[firstTip];
    if (inputDirection in tipDictionary) {
        direction = tipDictionary[inputDirection];
    } else if (inputDirection === null) {
        alert("方向不能为空，请重新输入。");
        return null;
    }else {
        alert("输入错误(方向只能输入空格或右)，请重新输入。");
        return null;
    }
    return direction;
}

var MyPrompt = new Prompt();