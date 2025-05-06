/**
 * @file: DrawRectangle.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/2 18:26
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    // 矩形
    /**
     * 画矩形，删除边线
     * @param {Rectangle} rect 矩形
     * @param {string|number} [color='#000000'] 颜色
     * @return {Rectangle} 矩形所在矩形
     */
    function drawRectangleWithoutLine(rect, color) {
        if (color === undefined) color = "#000000";

        var doc = fl.getDocumentDOM(); //文档

        // const rect = wrapRectByTopLeft(topLeft, size);
        doc.addNewRectangle(rect.toObj(), 0, false, true);

        doc.setFillColor(color);

        return rect;
    }

    return {
        drawRectangleWithoutLine: drawRectangleWithoutLine
    };
});
