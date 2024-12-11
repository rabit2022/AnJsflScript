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

// 获取folder_name, file_name
function pathSplit(path) {
    // 首先，将所有反斜杠替换为正斜杠，以统一路径分隔符
    var normalizedPath = path.replace(/\\/g, '/');

    const pathArray= path.split("/");
    var folder_name = pathArray.slice(0, -1).join("/");
    var file_name = pathArray[pathArray.length - 1];
    // alert(folder_name+" "+file_name);
    return {folder_name: folder_name, file_name: file_name};
}


(function() {
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

    // Ele.prototype.IsInstance = function (element) {
    //     return element.elementType === "instance";
    // }

    // 将 Ele 构造函数赋值给全局变量或模块
    fl.Ele = Ele;
})();
var ele = new fl.Ele();

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

    CopySymbol();
    
    PackSymbol();
}

Main();
