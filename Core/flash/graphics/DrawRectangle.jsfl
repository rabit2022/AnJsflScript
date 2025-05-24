/**
 * @file: DrawRectangle.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/2 18:26
 * @project: AnJsflScript
 * @description:
 */

define(["chroma-js"], function (chroma) {
    // 矩形
    /**
     * 画矩形，删除边线
     * @param {Rectangle} rect 矩形
     * @param {string|W3CX11ColorName} [color='#000000'] 颜色
     * @return {Rectangle} 矩形所在矩形
     */
    function drawRectangleWithoutLine(rect, color) {
        drawRectangle(rect, color, false, true);
    }

    /**
     * 画矩形
     * @param {Rectangle} rect 矩形
     * @param {string|W3CX11ColorName} [color='#000000'] 颜色
     * @param {boolean} [bSuppressFill=false] 是否隐藏填充
     * @param {boolean} [bSuppressStroke=false] 是否隐藏边线
     * @return {Rectangle} 矩形所在矩形
     * @private
     */
    function drawRectangle(rect, color, bSuppressFill, bSuppressStroke) {
        if (color === undefined) color = "black";
        color = chroma(color).hex();
        if (bSuppressFill === undefined) bSuppressFill = false;
        if (bSuppressStroke === undefined) bSuppressStroke = false;

        var doc = fl.getDocumentDOM(); //文档

        // const rect = wrapRectByTopLeft(topLeft, size);
        doc.addNewRectangle(rect.toObj(), 0, bSuppressFill, bSuppressStroke);

        doc.mouseClick(rect.getCenterVector().toObj(), false, false);

        doc.setFillColor(color);

        return rect;
    }

    return {
        drawRectangleWithoutLine: drawRectangleWithoutLine,
        drawRectangle: drawRectangle
    };
});
