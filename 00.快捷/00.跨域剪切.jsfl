/**
 * @file: 00.跨域剪切.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 11:15
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


    // 记录当前视图矩阵
    var tempWorldViewMatrixAnti=doc.viewMatrix;
    fl.tempWorldViewMatrixAnti=tempWorldViewMatrixAnti;

    // LogMatrix(tempWorldViewMatrixAnti);

    // 复制元件
    // doc.clipCut();
    doc.clipCopy();
}
Main();


