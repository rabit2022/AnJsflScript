/**
 * @file: 08.重置注册点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/9 19:22
 * @project: WindowSWF-master
 * @description:
 */

function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }
    // if (selection.length < 1) {
    //     alert("请选择元件？");
    //     return false;
    // }
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


function resetRegisterPoint(transformationPoint){
    doc.enterEditMode('inPlace');
    doc.selectAll();
    
    // 获取所有元件
    var selection1 = doc.selection;
    for (var i = 0; i < selection1.length; i++) {
        var element = selection1[i];
        // 选中当前元件
        onlySelectCurrent(element);
        
        doc.group();
        doc.moveSelectionBy(transformationPoint.neg().toObj());
        doc.unGroup();
        doc.selectNone();
    }

    doc.exitEditMode();
}


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

var timeline = doc.getTimeline();//时间轴
var layers = timeline.layers;//层
function Main() {
    if (!checkDom()) {
        return;
    }
    
    
    for (var i = 0; i < selection.length; i++) {
        // 获取元件的变换点
        var element = selection[0];
        var tr = element.getTransformationPoint();
        var transformationPoint = wrapPoint(tr);

        // 获取元件的注册点
        var registrationPoint = new Point(element.x, element.y);

        // 重置注册点
        resetRegisterPoint(transformationPoint);


        onlySelectCurrent(element);

        var halfPoint = new Point(transformationPoint.x / 2, transformationPoint.y / 2);
        doc.moveSelectionBy(halfPoint.toObj());
        // doc.selectNone();


        element.setTransformationPoint(getZeroPoint().toObj());
    }
}

Main();


