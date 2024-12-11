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
    
    var angle = selection[0].rotation;
    // alert("当前选区的旋转角度为："+angle);
    doc.rotateSelection(-angle, "center");//旋转选区
}
Main();