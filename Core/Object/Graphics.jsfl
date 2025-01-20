/**
 * @file: Graphics.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/26 19:55
 * @project: AnJsflScript
 * @description:
 */

function Graphics() {

}

/**
 * 画圆，不要填充
 * @param {Point}centerPos 圆心位置
 * @param {number}radius 半径
 * @deprecated 建议使用 {@link Graphics.drawCircleWithoutFill} ,效果更好
 */
Graphics.prototype.drawCircle = function(centerPos, radius) {
    var doc = fl.getDocumentDOM();//文档
    
    var circleRect = wrapRectByRadius(centerPos, radius);
    doc.addNewPrimitiveOval(circleRect.toObj(),true);

    // 选中圆形
    doc.setSelectionRect(circleRect.toObj());
    // 分离到Shape
    doc.breakApart();

    return circleRect;
}

/**
 * 画圆，删除填充部分，效果更好
 * 比{@link Graphics.drawCircle} 的圆弧 粗一些
 * @param {Point}centerPos 圆心位置
 * @param {number}radius 半径
 * @return {Rect} 圆弧所在矩形
 */
Graphics.prototype.drawCircleWithoutFill = function(centerPos, radius) {
    var doc = fl.getDocumentDOM();//文档

    var circleRect = wrapRectByRadius(centerPos, radius);
    doc.addNewPrimitiveOval(circleRect.toObj());

    // 选中圆形
    doc.setSelectionRect(circleRect.toObj());
    // 分离到Shape
    doc.breakApart();
    
    var circleCenter = circleRect.center();

    doc.mouseClick(circleCenter.center().toObj(), true, true);//选中所有
    doc.mouseClick(circleCenter.center().toObj(), false, true);//选中中间的圆形部分

    // 删除中间的圆形部分，只保留曲线部分
    doc.deleteSelection();
    return circleRect;
}

// /**
//  * 画 圆弧
//  * @param {Point}centerPos 圆心位置
//  * @param {number}radius 半径
//  * @param {number}startAngle 起始角度
//  * @param {number}endAngle 终止角度
//  * @param {number}segments 弧线分段数
//  */
// Graphics.prototype.drawArc = function(centerPos, radius, startAngle, endAngle, segments) {
//     var doc = fl.getDocumentDOM();//文档
//     var rect = wrapRectByRadius(centerPos, radius);
//     doc.addNewPrimitiveArc(rect.toObj(), startAngle, endAngle, segments);
//     doc.setSelectionRect(rect.toObj());
//     doc.breakApart();
// }


var graphics = new Graphics();