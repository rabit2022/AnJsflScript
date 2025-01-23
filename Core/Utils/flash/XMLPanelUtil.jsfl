﻿/**
 * @file: XMLPanelUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 21:29
 * @project: AnJsflScript
 * @description:
 */

function XMLPanelUtil() {

}

XMLPanelUtil.prototype.getXMLPath = function () {
    var XMLPANEL = fl.scriptURI.split(".jsfl").join(".xml");
    return XMLPANEL;
}

/**
 * 获取XML面板
 * @param {string} [panelPath] 面板路径，默认使用当前脚本的XML路径
 * @returns {XMLPanel}
 */
XMLPanelUtil.prototype.getXMLPanel = function (panelPath) {
    if (panelPath === undefined) {
        panelPath = this.getXMLPath();
    }

    var doc = fl.getDocumentDOM();//文档

    var panel = doc.xmlPanel(panelPath);
    if (panel.dismiss === "cancel") {
        alert("取消修改");
        return null;
    }
    return panel;
}
/**
 * 解析输入的字符串为数字
 * @param {string} inputStr 输入的字符串
 * @param {string} [alertMsg] 错误提示信息
 * @returns {number}
 */
XMLPanelUtil.prototype.parseNumber = function (inputStr, alertMsg) {
    if (inputStr === null || isNaN(Number(inputStr))) {
        if (alertMsg !== undefined) {
            alert(alertMsg);
        }
        // success = false;
        return null;
    }

    return Number(inputStr);
}

XMLPanelUtil.prototype.parseDirection = function (inputDirection, tipDictionary) {
    // var inputDirection = dialog.direction;
    if (tipDictionary === null) {
        tipDictionary = {"右": 1, "左": -1, " ": -1};
    }

    var firstTip = dictUtil.keys(tipDictionary)[0];
    var direction = tipDictionary[firstTip];

    if (inputDirection in tipDictionary) {
        direction = tipDictionary[inputDirection];
    } else if (inputDirection === null) {
        alert("方向不能为空，请重新输入。");
        return null;
    } else {
        alert("输入错误(方向只能输入空格或右)，请重新输入。");
        return null;
    }
}


var xmlPanelUtil = new XMLPanelUtil();