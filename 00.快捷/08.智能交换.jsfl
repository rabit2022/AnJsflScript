/**
 * @file: 08.智能交换.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/6 19:37
 * @project: WindowSWF-master
 * @description:
 */


/**
 * 定义一个点类
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


/**
 * 加法，两个点的坐标的和
 * @param {Point} point 另一个点
 * @returns {Point}
 */
Point.prototype.add = function(point) {
    return new Point(this.x + point.x, this.y + point.y);
}

/**
 * 减法，两个点的坐标的差
 * @param {Point} point 另一个点
 * @returns {Point}
 */
Point.prototype.sub = function(point) {
    return new Point(this.x - point.x, this.y - point.y);
}

// >
/**
 * 判断是否  在 另一个点 的右下方
 * @param {Point} point 另一个点
 * @returns {boolean}
 */
Point.prototype.greater = function(point) {
    return this.x > point.x && this.y > point.y;
}

Point.prototype.toString = function() {
    return "Point: " + this.x + " " + this.y;
}



function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }
    if (selection.length!= 2) {
        alert("请选择两个元件");
        return false;    
    }
    // if (selection.length < 1) {
    //     alert("请选择元件？");
    //     return false;
    // }
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


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件


function Main() {
    if (!checkDom()) {
        return;
    }

    var elem1 = selection[0];
    var elem1Positon = new Point(elem1.x, elem1.y);
    var elem2 = selection[1];
    var elem2Positon = new Point(elem2.x, elem2.y);

    elem1.x = elem2Positon.x;
    elem1.y = elem2Positon.y;
    elem2.x = elem1Positon.x;
    elem2.y = elem1Positon.y;
}
Main();

