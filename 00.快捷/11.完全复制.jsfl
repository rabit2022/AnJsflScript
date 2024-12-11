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


// 复制元件
function CopySymbol() {
    // 1.清空选择
    library.selectNone();

    // 2.直接复制元件
    var origionName = selection[0].libraryItem.name;
    library.duplicateItem(origionName);

    // 3.获取新元件名称
    var targetName = library.getSelectedItems()[0].name;
    // var {_, file_name}=pathSplit(targetName);
    //
    // // 4.重新命名元件名称
    // var input_file_name = prompt("请输入新元件名称：", file_name);
    // if (input_file_name == null || input_file_name === "") {
    //     alert("元件名称不能为空！");
    //     library.deleteItem(targetName);
    //     return;
    // }

    // 5.交换元件
    doc.swapElement(targetName);

    // // 6.更新元件名称
    // selection[0].libraryItem.name = input_file_name;
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
            // // 打散
            // doc.breakApart();
            // doc.group();
            CopySymbol();
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

    CopySymbol();

    PackSymbol();
}

Main();