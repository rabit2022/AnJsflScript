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

// 查找是否有重复名称
function findDuplicateName(baseName) {
    var items = library.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === baseName) {
            return true;
        }
    }
    return false;
}

// 获取folder_name, file_name
function pathSplit(path) {
    var index = path.lastIndexOf("/");
    if (index === -1) {
        return {
            folder_name: "",
            file_name: path
        };
    }
    return {
        folder_name: path.substring(0, index),
        file_name: path.substring(index + 1)
    };
}

// 合并folder_name, file_name
function pathJoin(folder_name, file_name) {
    if (folder_name === "") {
        return file_name;
    }
    return folder_name + "/" + file_name;
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
    var {_, file_name}=pathSplit(targetName);

    // 4.重新命名元件名称
    var input_file_name = prompt("请输入新元件名称：", file_name);
    if (input_file_name == null || input_file_name === "") {
        alert("元件名称不能为空！");
        library.deleteItem(targetName);
        return;
    }

    // 5.交换元件
    doc.swapElement(targetName);
    
    // 6.更新元件名称
    selection[0].libraryItem.name = input_file_name;
}

function Main() {
    if (!checkDom()) {
        return;
    }
    
    CopySymbol();
}


// function copyLibEleInDoc(element){
//     library.duplicateItem(element.libraryItem.name);
//     // doc.swapElement(element.libraryItem.name+" 复制");
// }

Main();