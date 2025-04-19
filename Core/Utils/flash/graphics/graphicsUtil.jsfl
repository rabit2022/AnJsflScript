﻿/**
 * @file: graphicsUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/26 19:55
 * @project: AnJsflScript
 * @description:
 */
define(['SAT'], function (sat) {
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle;
    const { wrapRectByTopLeft } = sat.GLOBALS;

    //
    // /**
    //  * 画圆，不要填充
    //  * @param {Vector}centerPos 圆心位置
    //  * @param {number}radius 半径
    //  * @deprecated 建议使用 {@link GraphicsUtil.drawCircleLineWithoutFill} ,效果更好
    //  */
    // GraphicsUtil.drawCircleLineWithoutFill_deprecated = function (centerPos, radius) {
    //     var doc = fl.getDocumentDOM(); //文档
    //
    //     var circleRect = new Rectangle(centerPos, radius);
    //     doc.addNewPrimitiveOval(circleRect.toObj(), true);
    //
    //     // 选中圆形
    //     doc.setSelectionRect(circleRect.toObj());
    //     // 分离到Shape
    //     doc.breakApart();
    //
    //     return circleRect;
    // };

    /**
     * 画圆，删除填充部分，效果更好
     * 比{@link GraphicsUtil.drawCircle} 的圆弧 粗一些
     * @param {Vector}centerPos 圆心位置
     * @param {number}radius 半径
     * @return {Rectangle} 圆弧所在矩形
     */
    function drawCircleLineWithoutFill(centerPos, radius) {
        var doc = fl.getDocumentDOM(); //文档

        var circleRect = new Rectangle(centerPos, radius);
        doc.addNewPrimitiveOval(circleRect.toObj());

        // 选中圆形
        doc.setSelectionRect(circleRect.toObj());
        // 分离到Shape
        doc.breakApart();

        var circleCenter = circleRect.getCenterVector();

        doc.mouseClick(circleCenter.getCenter().toObj(), true, true); //选中所有
        doc.mouseClick(circleCenter.getCenter().toObj(), false, true); //选中中间的圆形部分

        // 删除中间的圆形部分，只保留曲线部分
        doc.deleteSelection();
        return circleRect;
    }

    /**
     * 画圆，删除边线
     * @param {Vector}centerPos 圆心位置
     * @param {number}radius 半径
     * @return {Rectangle} 圆弧所在矩形
     */
    function drawCircleWithoutLine(centerPos, radius) {
        var doc = fl.getDocumentDOM(); //文档

        var circleRect = new Rectangle(centerPos, radius);
        // print('circleRect', circleRect.toString());
        doc.addNewPrimitiveOval(circleRect.toObj(), false, true);
        // 选中圆形
        // bug: bContactSensitiveSelection接触感应选择模式。必须设置为true，否则可能无法选中圆形，导致后面的代码出错。
        doc.setSelectionRect(circleRect.toObj(), true, true);

        // 分离到Shape
        doc.breakApart();
        return circleRect;
    }

    // 矩形
    /**
     * 画矩形，删除边线
     * @param {Rectangle}rect 矩形
     * @return {Rectangle} 矩形所在矩形
     */
    function drawRectangleWithoutLine(rect) {
        var doc = fl.getDocumentDOM(); //文档

        // const rect = wrapRectByTopLeft(topLeft, size);
        doc.addNewRectangle(rect.toObj(), 0, false, true);

        return rect;
    }

    return {
        drawCircleLineWithoutFill: drawCircleLineWithoutFill,
        drawCircleWithoutLine: drawCircleWithoutLine,
        drawRectangleWithoutLine: drawRectangleWithoutLine
    };
});
