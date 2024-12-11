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

/**
 * 定义一个元素类
 * @param {Element} element 元素对象
 */
function Element_Rectangle(element) {
    this.element = element;
    this.rectangle = new Rectangle(element.x, element.y, element.width, element.height);
}

/**
 * 定义一个矩形类
 * @param {number} centerX 横坐标
 * @param {number} centerY 纵坐标
 * @param {number} width 宽度
 * @param {number} height 高度
 */
function Rectangle(centerX, centerY, width, height) {
    this.position = new Point(centerX, centerY);
    this.size = new Size(width, height);
}

Rectangle.prototype.GetTopLeft=function() {
    return new Point(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2);
}

Rectangle.prototype.GetTopRight=function() {
    return new Point(this.position.x + this.size.width / 2, this.position.y - this.size.height / 2);
}

Rectangle.prototype.GetBottomLeft=function() {
    return new Point(this.position.x - this.size.width / 2, this.position.y + this.size.height / 2);
}

Rectangle.prototype.GetBottomRight=function() {
    return new Point(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
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


/**
 * 定义一个大小类
 * @param {number} width 宽度
 * @param {number} height 高度
 */
function Size(width, height) {
    this.width = width;
    this.height = height;
    this.ratio = this.width / this.height;
}

Size.prototype.GetHeightBy=function(width) {
    return width / this.ratio;
}

Size.prototype.GetWidthBy=function(height) {
    return height * this.ratio;
}


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件


function Main() {
    if (!checkDom()) {
        return;
    }
    
    /**
     * 选中的元件
     * @type {Element_Rectangle[]}
     */
    var selectedRect = [];
    for (var i = 0; i < selection.length; i++) {
        var rect = new Element_Rectangle(selection[i]);
        selectedRect.push(rect);
    }

    //获取最右边的元件
    var maxTopRight = selectedRect[0];
    for (var i = 1; i < selectedRect.length; i++) {
        var maxTopRightPoint = maxTopRight.rectangle.GetTopRight();
        var selectedTopRightPoint = selectedRect[i].rectangle.GetTopRight();
        if (selectedTopRightPoint.greater(maxTopRightPoint)) {
            maxTopRight = selectedRect[i];
        }
    }

    // 获取高度
    var height = maxTopRight.rectangle.size.height;

    // 设置其他元件的高度
    for (var i = 0; i < selectedRect.length; i++) {
        if (selectedRect[i] === maxTopRight) {
            continue;
        }
        var width = selectedRect[i].rectangle.size.GetWidthBy(height);
        // fl.trace(width);

        selectedRect[i].element.height = height;
        selectedRect[i].element.width = width;

    }
    
}
Main();
