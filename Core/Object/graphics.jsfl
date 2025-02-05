/**
 * @file: Graphics.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/26 19:55
 * @project: AnJsflScript
 * @description:
 */
define(["sat"], function (sat) {
    var Vector = sat.SAT.Vector;
    var wrapRectByRadius=sat.SAT_GLOBALS.wrapRectByRadius;
    function Graphics() {

    }

    /**
     * 画圆，不要填充
     * @param {Vector}centerPos 圆心位置
     * @param {number}radius 半径
     * @deprecated 建议使用 {@link Graphics.drawCircleWithoutFill} ,效果更好
     */
    Graphics.drawCircle = function (centerPos, radius) {
        var doc = fl.getDocumentDOM();//文档

        var circleRect = wrapRectByRadius(centerPos, radius);
        doc.addNewPrimitiveOval(circleRect.toObj(), true);

        // 选中圆形
        doc.setSelectionRect(circleRect.toObj());
        // 分离到Shape
        doc.breakApart();

        return circleRect;
    }

    /**
     * 画圆，删除填充部分，效果更好
     * 比{@link Graphics.drawCircle} 的圆弧 粗一些
     * @param {Vector}centerPos 圆心位置
     * @param {number}radius 半径
     * @return {Rect} 圆弧所在矩形
     */
    Graphics.drawCircleWithoutFill = function (centerPos, radius) {
        var doc = fl.getDocumentDOM();//文档

        var circleRect = wrapRectByRadius(centerPos, radius);
        doc.addNewPrimitiveOval(circleRect.toObj());

        // 选中圆形
        doc.setSelectionRect(circleRect.toObj());
        // 分离到Shape
        doc.breakApart();

        var circleCenter = circleRect.getCenterVector();

        doc.mouseClick(circleCenter.getCenter().toObj(), true, true);//选中所有
        doc.mouseClick(circleCenter.getCenter().toObj(), false, true);//选中中间的圆形部分

        // 删除中间的圆形部分，只保留曲线部分
        doc.deleteSelection();
        return circleRect;
    }


    return Graphics;

});