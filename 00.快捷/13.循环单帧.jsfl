/**
 * @file: 13.循环单帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 22:22
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


/**
 * 判断是否是元素
 * @class {Ele}
 */
var Ele = function () {
}

// var p = IsElement.prototype = {};
/**
 * 判断是否是 元件
 * @param {Element} element 元素
 * @returns {boolean}
 */
Ele.prototype.IsSymbol = function (element) {
    return element.elementType === "instance" && element.instanceType === "symbol";
}
var ele = new Ele();


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

function Main() {
    if (!checkDom()) {
        return;
    }

    // // 如果全部都是 "loop", targetLoop = "loop"
    // // 否则 统一设置为 "single frame"
    // var targetLoop = "single frame";
    //
    // var tempLoop = 0;
    // for (var i = 0; i < selection.length; i++) {
    //     var element = selection[i];
    //     // 跳过  非元件
    //     if (!ele.IsSymbol(element)) {
    //         continue;
    //     }
    //
    //     // 计数loop的元素数量
    //     if (element.loop === "loop") {
    //         tempLoop++;
    //     } else {
    //         // 一旦发现有一个元素的loop属性不等于"loop"，即可确定targetLoop应为"single frame"
    //         // targetLoop = "single frame";
    //         break; 
    //     }
    // }
    //
    // // 如果所有检查过的元素loop属性都等于"loop"，则设置targetLoop为"loop"
    // if (tempLoop > 0 && tempLoop === selection.length) {
    //     targetLoop = "loop";
    // }
    //
    // // 设置所有选中元素的loop属性
    // for (var i = 0; i < selection.length; i++) {
    //     var element = selection[i]; 
    //     if (ele.IsSymbol(element)) {
    //         element.loop = targetLoop;
    //     }
    // }
    
    // 原始版本
    var firstElement = selection[0];
    if (!ele.IsSymbol(firstElement)) {
        return;
    }
    
    if (firstElement.loop === "single frame") {
        firstElement.loop = "loop";
    } else {
        firstElement.loop = "single frame";
    }
    
    
}
Main();