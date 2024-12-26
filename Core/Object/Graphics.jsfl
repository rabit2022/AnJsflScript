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
Graphics.prototype.drawCircle = function(centerPos, radius) {
    var doc = fl.getDocumentDOM();//文档
    
    var rect = wrapRectByRadius(centerPos, radius);
    doc.addNewPrimitiveOval(rect.toObj());
    return rect;
}

Graphics.prototype.drawCircleLine = function(centerPos, radius) {
    var doc = fl.getDocumentDOM();//文档
    var circleRect = this.drawCircle(centerPos, radius);
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


var graphics = new Graphics();