/**
 * @file: 08.重置注册点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/9 19:22
 * @project: WindowSWF-master
 * @description:
 */

function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
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
Point.prototype.add = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
}

/**
 * 减法，两个点的坐标的差
 * @param {Point} point 另一个点
 * @returns {Point}
 */
Point.prototype.sub = function (point) {
    return new Point(this.x - point.x, this.y - point.y);
}

// 负
Point.prototype.neg = function () {
    return new Point(-this.x, -this.y);
}

// >
/**
 * 判断是否  在 另一个点 的右下方
 * @param {Point} point 另一个点
 * @returns {boolean}
 */
Point.prototype.greater = function (point) {
    return this.x > point.x && this.y > point.y;
}

Point.prototype.toString = function () {
    return "Point: " + this.x + " " + this.y;
}
/**
 * 转换为对象
 * @return {{x:number,y:number}}
 */
Point.prototype.toObj = function() {
    return {x: this.x, y: this.y};
}

function wrapPoint(obj) {
    return new Point(obj.x, obj.y);
}

function getZeroPoint() {
    return new Point(0, 0);
}


/**
 * 选中当前元件
 * @param element
 */
function onlySelectCurrent(element){
    doc.selectNone();
    element.selected = true;
}
/**
 * 选中最开始的元件
 */
function SelectStart() {
    // 选中最开始的元件
    for (var i = 0; i < selection.length; i++) {
        var element = selection[i];
        element.selected = true;
    }
}

function resetRegisterPoint(transformationPoint){
    doc.enterEditMode('inPlace');
    doc.selectAll();
    
    // 获取所有元件
    var selection1 = doc.selection;
    for (var i = 0; i < selection1.length; i++) {
        var element = selection1[i];
        // 选中当前元件
        onlySelectCurrent(element);
        
        doc.group();
        doc.moveSelectionBy(transformationPoint.neg().toObj());
        doc.unGroup();
        doc.selectNone();
    }

    doc.exitEditMode();
}


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

var timeline = doc.getTimeline();//时间轴
var layers = timeline.layers;//层
function Main() {
    if (!checkDom()) {
        return;
    }
    
    
    for (var i = 0; i < selection.length; i++) {
        // 获取元件的变换点
        var element = selection[0];
        var tr = element.getTransformationPoint();
        var transformationPoint = wrapPoint(tr);

        // 获取元件的注册点
        var registrationPoint = new Point(element.x, element.y);

        // 重置注册点
        resetRegisterPoint(transformationPoint);


        onlySelectCurrent(element);

        var halfPoint = new Point(transformationPoint.x / 2, transformationPoint.y / 2);
        doc.moveSelectionBy(halfPoint.toObj());
        // doc.selectNone();


        element.setTransformationPoint(getZeroPoint().toObj());
    }
}

Main();


