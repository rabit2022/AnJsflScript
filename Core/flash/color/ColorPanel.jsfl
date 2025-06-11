/**
 * @file: ColorPanel.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/11 19:40
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    // 缓存stroke和fill
    var stroke_cache = null;
    var fill_cache = null;

    /**
     * 设置自定义颜色面板
     * @param {BaseStroke|Stroke} stroke 颜色值
     * @param {BaseFill|Fill} fill 颜色值
     */
    function setCustomPanel(stroke, fill) {
        var doc = fl.getDocumentDOM(); //文档

        // 缓存当前的stroke和fill
        if (stroke_cache === null) stroke_cache = doc.getCustomStroke("toolbar");
        if (fill_cache === null) fill_cache = doc.getCustomFill("toolbar");

        // 默认设置
        if (stroke === undefined && stroke_cache !== null) stroke = stroke_cache;
        if (fill === undefined && fill_cache !== null) fill = fill_cache;

        doc.setCustomStroke(stroke);
        doc.setCustomFill(fill);
    }

    /**
     * 重置自定义颜色面板
     */
    function resetCustomPanel() {
        var doc = fl.getDocumentDOM(); //文档

        doc.setCustomStroke(stroke_cache);
        doc.setCustomFill(fill_cache);
    }
    return {
        setCustomPanel: setCustomPanel,
        resetCustomPanel: resetCustomPanel
    };
});
