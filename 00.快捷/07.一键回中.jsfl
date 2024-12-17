/**
 * @file: 06.一键回正.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 16:33
 * @project: WindowSWF-master
 * @description:
 */


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择


function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }
    if (selection.length < 1) {
        alert("请选择元件？");
        return false;
    }
    // if (selection.length > 1) {
    //     alert("请选择单个元件");
    //     return false;
    // }
    return true;
}

function Main() {
    if (!checkDom()) {
        return;
    }
   
    // 获取屏幕的宽高
    var screenWidth = doc.width;
    var screenHeight = doc.height;
    var screenCenterPoint = new Point(screenWidth / 2, screenHeight / 2);
    
    // 获取选中内容的边界
    var boundsCenterPoint =wrapRect(doc.getSelectionRect()).center();
    
    // 计算偏移量
    var offset=screenCenterPoint.sub(boundsCenterPoint);
    
    // 移动所有选中的元件到屏幕中心
    doc.moveSelectionBy(offset.toObj());
}
Main();

