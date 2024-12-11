/**
 * @file: 00.统一中心点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:16
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

var doc=fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library=doc.library;//库文件
function Main() {
    if (!checkDom()) {
        return;
    }

    // 找到最大的右下角
    var maxRightBottom = new Point(0, 0);
    /**
     * 找到最大的元素
     * @type {Element}
     */
    var maxElement;
    for (var i = 0; i < selection.length; i++) {
        // 只选中一个元素
        // for (var j = 0; j < selection.length; j++) {
        //     var element = selection[j];
        //     element.selected = false;
        // }
        doc.selectNone();
        var item = selection[i];
        item.selected = true;

        var trPoint = new Point(item.x, item.y);
        var r = doc.getSelectionRect();
        var rightBottom = new Point(r.right, r.bottom);

        if (rightBottom.greater(maxRightBottom)) {
            maxRightBottom = rightBottom;
            maxElement = item;
        }
    }
    
    // 获取 transformPoint 
    var tr = maxElement.getTransformationPoint();
    var transformPoint = new Point(tr.x, tr.y);
    
    // 把所有元素移动到中心点
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        // var current = new Point(item.x, item.y);
        item.selected=true;

        item.setTransformationPoint(transformPoint.toObj());
    }
}
Main();

