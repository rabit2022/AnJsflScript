/**
 * @file: 01.批量复制.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 12:40
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

function MoreElement(element) {
    this.element = element;
    this.positioin = new Point(element.x, element.y);
    this.offsetX = element.width;
}

MoreElement.prototype.Next = function (index) {
    var elementX=this.positioin.x+this.offsetX*index;
    return new Point(elementX,this.positioin.y);
}
/**
 * 选中当前元件
 * @param element
 */
function onlySelectCurrent(element){
    doc.selectNone();
    element.selected = true;
}
function SelectStart() {
    // 选中最开始的元件
    for (var i = 0; i < selection.length; i++) {
        var element = selection[i];
        element.selected = true;
    }
}
var doc=fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library=doc.library;//库文件


function Main() {
    if (!checkDom()) {
        return;
    }

    var copyCount=prompt("请输入复制次数：",9);
    if(copyCount==null||copyCount<0){
        alert("请输入正确的次数");
        return;
    }
    
    // 添加数据
    /**
     * 
     * @type {MoreElement[]}
     */
    var moreElements = [];
    for (var i = 0; i < selection.length; i++) {
        var element = selection[i];
        
        // 选中当前元件
        onlySelectCurrent(element);
        
        var moreElement = new MoreElement(element);
        moreElements.push(moreElement);
    }
    
    // 复制元件
    /**
     * 
     * @type {MoreElement}
     */
    var currentMoreElementsCopy ;
    for (var i = 0; i < moreElements.length; i++) {
        var moreElement = moreElements[i];
        
        for (var j = 0; j < copyCount; j++) {
            var nextPoint = moreElement.Next(j);
            // 复制元件
            onlySelectCurrent(moreElement.element);
            doc.clipCopy();
            doc.clipPaste();
            // 移动元件
            var newElement = doc.selection[0];
            newElement.x = nextPoint.x;
            newElement.y = nextPoint.y;
            
        }
    }

    SelectStart();

}
Main();
