/**
 * @file: 02.排兵布阵_neat.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 16:30
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
// "undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "xmlPanelUtil", "MoreElement", "COMPATIBILITY"], function (
    checkUtil,
    xmlPanelUtil,
    MoreElement,
    COMPATIBILITY
) {
    var checkDom = checkUtil.CheckDom,
        checkSelection = checkUtil.CheckSelection;
    const {parseNumber}=xmlPanelUtil;
    
    const {__WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__}=COMPATIBILITY;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    function checkXMLPanel() {
        // var panel = getXMLPanel();
        var panel = __WEBPACK_COMPATIBILITY_XML_PANEL_RELATIVE_PATH__("﻿<?xml version=\"1.0\"?>\r\n<dialog id=\"characterLayoutDialog\" title=\"人物排列设置\" buttons=\"accept,cancel\">\r\n    <grid>\r\n        <!--        <columns>-->\r\n        <!--            <column flex=\"1\"/>-->\r\n        <!--            <column flex=\"3\"/>-->\r\n        <!--        </columns>-->\r\n        <rows>\r\n            <row>\r\n                <label value=\"横向人物数量：\"/>\r\n            </row>\r\n            <row>\r\n                <textbox id=\"horizontalCount\" value=\"8\"/>\r\n            </row>\r\n            <separator/>\r\n\r\n            <row>\r\n                <label value=\"横向间距(单位：多少倍身宽)：\"/>\r\n            </row>\r\n            <row>\r\n                <textbox id=\"horizontalSpacing\" value=\"1.2\"/>\r\n            </row>\r\n            <separator/>\r\n\r\n            <row>\r\n                <label value=\"纵向人物数量：\"/>\r\n            </row>\r\n            <row>\r\n                <textbox id=\"verticalCount\" value=\"4\"/>\r\n            </row>\r\n            <separator/>\r\n\r\n            <row>\r\n                <label value=\"纵向间距：\"/>\r\n            </row>\r\n            <row>\r\n                <textbox id=\"verticalSpacing\" value=\"0.3\"/>\r\n            </row>\r\n            <separator/>\r\n\r\n\r\n        </rows>\r\n    </grid>\r\n</dialog>");
        if (panel === null) return null;

        var horizontalCount = parseNumber(
            panel.horizontalCount,
            "横向排布数量只能输入数字，请重新输入。"
        );
        if (horizontalCount === null) return null;
        var horizontalSpacing = parseNumber(
            panel.horizontalSpacing,
            "横向排布间距只能输入数字，请重新输入。"
        );
        if (horizontalSpacing === null) return null;
        var verticalCount = parseNumber(
            panel.verticalCount,
            "纵向排布数量只能输入数字，请重新输入。"
        );
        if (verticalCount === null) return null;
        var verticalSpacing = parseNumber(
            panel.verticalSpacing,
            "纵向排布间距只能输入数字，请重新输入。"
        );
        if (verticalSpacing === null) return null;

        return {
            horizontalCount: horizontalCount,
            horizontalSpacing: horizontalSpacing,
            verticalCount: verticalCount,
            verticalSpacing: verticalSpacing
        };
    }

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "Only one")) return;

        // 整齐排布
        var config = checkXMLPanel();
        if (config === null) return;
        const { horizontalCount, horizontalSpacing, verticalCount, verticalSpacing }= config;

        var firstElement = selection[0];
        var me = new MoreElement(firstElement, horizontalSpacing, verticalSpacing);

        for (var i = 0; i < horizontalCount; i++) {
            for (var j = 0; j < verticalCount; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }

                var nextPoint = me.NeatOffset(i, j);

                // 复制粘贴
                doc.clipCopy();
                doc.clipPaste();

                // 移动元件
                var newElement = doc.selection[0];
                newElement.x = nextPoint.x;
                newElement.y = nextPoint.y;
            }
        }
    }

    Main();
});
