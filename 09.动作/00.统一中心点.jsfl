/**
 * @file: 00.统一中心点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:16
 * @project: WindowSWF-master
 * @description:
 */


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
    // if (selection.length === 1) {
    //     alert("请选择至少两个元件");
    //     return false;
    // }
    return true;
}


var doc=fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library=doc.library;//库文件
function Main() {
    if (!checkDom()) {
        return;
    }
    
    // 找到最右边的元素
    var maxElement=ele.getMaxRight();
    
    // 获取 transformPoint 
    var trPoint = wrapPoint(maxElement.getTransformationPoint());
    
    // 把所有元素移动到中心点
    for (var i = 0; i < selection.length; i++) {
        var element = selection[i];
        element.selected=true;

        element.setTransformationPoint(trPoint.toObj());
    }
}
Main();

