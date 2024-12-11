/**
 * @file: 09.元件批复制.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 15:19
 * @project: WindowSWF-master
 * @description:
 */

/**
 * 判断是否是元素
 * @class {Ele}
 */
var Ele = function () {
}

// var p = IsElement.prototype = {};
/**
 * 判断是否是形状
 * @param {Element} element 元素
 * @returns {boolean}
 */
Ele.prototype.IsSymbol = function (element) {
    return element.elementType === "instance" && element.instanceType === "symbol";
}
var ele = new Ele();


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
var count = 0;
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
    
    var input_file_name = "复制" + count+" "+file_name;
    
    // 4.判断是否有重复名称
    while (findDuplicateName(input_file_name)) {
        count++;
        input_file_name = "复制" + count+" "+file_name;
    }

    // 5.交换元件
    doc.swapElement(targetName);

    // 6.更新元件名称
    selection[0].libraryItem.name = input_file_name;
}




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

var timeline=doc.getTimeline();//时间轴
var layers=timeline.layers;//图层

function Main() {
    if (!checkDom()) {
        return;
    }

    for (var i = 0; i < selection.length; i++) {
        if (ele.IsSymbol(selection[i])) {
            CopySymbol();
        }
    }
}
Main();