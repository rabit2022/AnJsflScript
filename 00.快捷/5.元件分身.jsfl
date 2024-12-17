/**
 * Created with JetBrains Rider.
 * User: admin
 * Date: 2024/12/4
 * Time: 18:36
 * To change this template use File | Settings | File Templates.
 */

var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }
    if (selection.length < 1) {
        alert("请选择元件？");
        return false;
    }
    if (selection.length > 1) {
        alert("请选择单个元件");
        return false;
    }
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
            // 打散
            doc.breakApart();
            doc.group();
        }else{
            // break;
            continue;
        }
        
        PackSymbol();
    }
    doc.exitEditMode();
}

function Main() {
    if (!checkDom()) {
        return;
    }

    ele.CopySymbol("ask");
    
    PackSymbol();
}

Main();
