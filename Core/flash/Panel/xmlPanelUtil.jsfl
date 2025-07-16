/**
 * @file: xmlPanelUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 21:29
 * @project: AnJsflScript
 * @description:
 */
define(["open", "os", "StringPaser"], function (open, os, sp) {
    const { parseNumber, parseDirection, parseColor } = sp;

    function XMLPanelUtil() {}

    XMLPanelUtil.getXMLPath = function () {
        var XMLPANEL = fl.scriptURI.split(".jsfl").join(".xml");
        return XMLPANEL;
    };

    XMLPanelUtil.getXMLText = function (absolutPath) {
        if (absolutPath === undefined) absolutPath = XMLPanelUtil.getXMLPath();
        var text = "";
        with (open(absolutPath, "r", "utf-8")) {
            text = f.read();
        }
        return text;
    };

    XMLPanelUtil.getXMLTextRP = function (relativePath) {
        var absolutePath = os.path.join(os.getcwd(), relativePath);
        return XMLPanelUtil.getXMLText(absolutePath);
    };

    /**
     * 获取XML面板
     * @param {string} [panelPath] 面板路径，默认使用当前脚本的XML路径
     */
    XMLPanelUtil.getXMLPanel = function (panelPath) {
        if (panelPath === undefined) {
            panelPath = XMLPanelUtil.getXMLPath();
        }
        // console.log("XMLPanelUtil.getXMLPanel", panelPath);

        var doc = fl.getDocumentDOM(); //文档

        var panel = doc.xmlPanel(panelPath);
        if (panel.dismiss === "cancel") {
            alert("取消修改");
            return null;
        }
        return panel;
    };

    /**
     * 获取XML面板
     * @param {string} [xmlText] 面板路径，默认使用当前脚本的XML路径
     */
    XMLPanelUtil.getXMLPanelT = function (xmlText) {
        if (xmlText === undefined) {
            throw new Error("xmlText不能为空");
        }

        var panel = fl.xmlPanelFromString(xmlText);
        if (panel.dismiss === "cancel") {
            alert("取消修改");
            return null;
        }
        return panel;
    };

    /**
     * 解析输入的字符串为字符串
     * @param {string} inputStr 输入的字符串
     * @param {string} [alertMsg] 错误提示信息
     * @returns {string}
     * @deprecated 没有必要
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
     * @deprecated 请使用 {@link StringPaser.parseNumber}
     */
    XMLPanelUtil.parseNumber = parseNumber;
    /**
     * @deprecated 请使用 {@link StringPaser.parseDirection}
     */
    XMLPanelUtil.parseDirection = parseDirection;
    /**
     * @deprecated 请使用 {@link StringPaser.parseColor}
     */
    XMLPanelUtil.parseColor = parseColor;

    return XMLPanelUtil;
});
