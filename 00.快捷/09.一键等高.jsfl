/**
 * @file: 09.一键等高.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 21:30
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
    if (selection.length === 1) {
        alert("请选择至少两个元件");
        return false;
    }
    return true;
}

var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件


function Main() {
    if (!checkDom()) {
        return;
    }

    var maxElement = ele.getMaxRight(selection);

    // 获取高度
    var height = maxElement.height;
    
    // 设置元件的高度
    for (var i = 0; i < selection.length; i++) {
        var element = selection[i];
        if (element === maxElement) {
            continue;
        }
        var ratio = element.width / element.height;
        
        element.height = height;
        element.width = height * ratio;
    }


    
}
Main();
