/**
 * @file: 11.完全复制.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:07
 * @project: WindowSWF-master
 * @description:
 */




function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }

    doc = fl.getDocumentDOM();//文档
    selection = doc.selection;//选择
    library = doc.library;//库文件

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


function PackSymbol() {
    // 元件编辑模式
    doc.enterEditMode("inPlace");
    doc.selectAll();
    var selection = doc.selection;
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        // symbol: 打散
        if (ele.IsSymbol(item)) {
            ele.CopySymbol("skip");
        } else {
            continue;
        }

        PackSymbol();
    }
    doc.exitEditMode();
}

var doc;//文档
var selection;//选择
var library;//库文件

function Main() {
    if (!checkDom()) {
        return;
    }

    ele.CopySymbol("ask");

    PackSymbol();
}

Main();