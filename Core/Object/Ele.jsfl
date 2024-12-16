/**
 * @file: Ele.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:27
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
 * 判断是否是 元件
 * @param {Element} element 元素
 * @returns {boolean}
 */
Ele.prototype.IsSymbol = function (element) {
    return element.elementType === "instance" && element.instanceType === "symbol";
}

/**
 * 
 * @type {Ele}
 */
var ele = new Ele();
