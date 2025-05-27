/**
 * @file: xmlPanelUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 21:29
 * @project: AnJsflScript
 * @description:
 */
define(["chroma-js"], function (chroma) {
    function XMLPanelUtil() {}

    XMLPanelUtil.getXMLPath = function () {
        var XMLPANEL = fl.scriptURI.split(".jsfl").join(".xml");
        return XMLPANEL;
    };

    /**
     * 获取XML面板
     * @param {string} [panelPath] 面板路径，默认使用当前脚本的XML路径
     */
    XMLPanelUtil.getXMLPanel = function (panelPath) {
        if (panelPath === undefined) {
            panelPath = XMLPanelUtil.getXMLPath();
        }

        var doc = fl.getDocumentDOM(); //文档

        var panel = doc.xmlPanel(panelPath);
        if (panel.dismiss === "cancel") {
            alert("取消修改");
            return null;
        }
        return panel;
    };

    /**
     * 弹出提示框，获取输入的数字
     * @param {string} inputStr 输入的字符串
     * @param {string} [alertMessage="请重新输入。"] 输入错误时的提示信息
     * @param {{start: number, end: number, step: number}} [range=null] 范围
     * @returns {number} 输入的数字
     */
    XMLPanelUtil.parseNumber = function (inputStr, alertMessage, range) {
        if (alertMessage === undefined || alertMessage === null) {
            alertMessage = "请重新输入合法的数字。";
        }

        var inputForce = inputStr;
        if (inputForce === null || isNaN(Number(inputForce))) {
            alert(alertMessage);
            return null;
        }

        var force = Number(inputForce);

        if (range !== null && range !== undefined) {
            // 检查边界值是否有效
            var hasStart = range.start !== undefined && range.start !== null;
            var hasEnd = range.end !== undefined && range.end !== null;

            if (hasStart || hasEnd) {
                // 情况1：有step时，使用Linq.js进行整数步进检查
                if (range.step !== undefined && range.step !== null) {
                    var rangeList = $range(range.start || 0, range.end || 0, range.step);
                    if (!rangeList.contains(force)) {
                        var rangeStr =
                            (hasStart ? range.start : "") +
                            (hasEnd ? (hasStart ? "," : "") + range.end : "") +
                            "," +
                            range.step;
                        alert(
                            "输入值超出步进范围 : range(" + rangeStr + ")，请重新输入。"
                        );
                        return null;
                    }
                }
                // 情况2：无step时，直接比较边界
                else {
                    var outOfRange = false;
                    if (hasStart && force < range.start) {
                        outOfRange = true;
                    }
                    if (hasEnd && force > range.end) {
                        outOfRange = true;
                    }
                    if (outOfRange) {
                        var rangeStr =
                            (hasStart ? "≥" + range.start : "") +
                            (hasStart && hasEnd ? " 且 " : "") +
                            (hasEnd ? "≤" + range.end : "");
                        alert("输入值超出允许范围 : " + rangeStr + "，请重新输入。");
                        return null;
                    }
                }
            }
        }

        return force;
    };
    /**
     * 解析输入的字符串为字符串
     * @param {string} inputStr 输入的字符串
     * @param {string} [alertMsg] 错误提示信息
     * @returns {string}
     */
    XMLPanelUtil.parseString = function (inputStr, alertMsg) {
        if (inputStr === null) {
            if (alertMsg !== undefined) {
                alert(alertMsg);
            }
            return null;
        }

        return inputStr;
    };
    /**
     * 解析输入的方向字符串为数字
     * @param {string} inputDirection 输入的方向字符串
     * @param {object} [tipDictionary={"右": 1, "左": -1, " ": -1}] 方向提示字典
     * @returns {number}
     */
    XMLPanelUtil.parseDirection = function (inputDirection, tipDictionary) {
        // var inputDirection = dialog.direction;
        if (tipDictionary === null) {
            tipDictionary = { 右: 1, 左: -1, " ": -1 };
        }

        var firstTip = Object.keys(tipDictionary)[0];
        var direction = tipDictionary[firstTip];

        if (inputDirection in tipDictionary) {
            direction = tipDictionary[inputDirection];
            return direction;
        } else if (inputDirection === null) {
            alert("方向不能为空，请重新输入。");
            return null;
        } else {
            alert("输入错误(方向只能输入空格或右)，请重新输入。");
            return null;
        }
    };

    /**
     * 解析输入的颜色字符串为颜色对象
     * @param {string} inputColor 输入的颜色字符串
     * @param {string} [alertMsg] 错误提示信息
     * @returns {string}
     */
    XMLPanelUtil.parseColor = function (inputColor, alertMsg) {
        var color = chroma(inputColor);

        if (!inputColor || !chroma.valid(color)) {
            if (alertMsg !== undefined) {
                alert(alertMsg);
            }
            return null;
        }

        return color.hex();
    };

    return XMLPanelUtil;
});
