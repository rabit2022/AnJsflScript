/**
 * @file: XMLPanelUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/20 21:29
 * @project: AnJsflScript
 * @description:
 */

function XMLPanelUtil() {

}

XMLPanelUtil.prototype.getXMLPath=function() {
    var XMLPANEL = fl.scriptURI.split(".jsfl").join(".xml");
    return XMLPANEL;
}

/**
 * 获取XML面板
 * @param {string} [panelPath] 面板路径，默认使用当前脚本的XML路径
 * @returns {XMLPanel}
 */
XMLPanelUtil.prototype.getXMLPanel=function(panelPath) {
    if (panelPath === undefined){
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

XMLPanelUtil.prototype.parseNumber = function(inputStr,alertMsg) {
    fl.trace(inputStr);
    // var inputHorizontalCount = panel.horizontalCount;
    if (inputStr === null || isNaN(Number(inputStr))) {
        alert(alertMsg);
        // success = false;
        return null;
    }
    
    return Number(inputStr);
}

var xmlPanelUtil = new XMLPanelUtil();