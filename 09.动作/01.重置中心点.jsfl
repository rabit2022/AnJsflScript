/**
 * @file: 01.重置中心点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:16
 * @project: WindowSWF-master
 * @description:
 */


function checkDom() {
    doc = fl.getDocumentDOM();//文档
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }

    selection = doc.selection;//选择
    library = doc.library;//库文件

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

(function () {
    /**
     * 定义一个元素矩形类
     * @type{Element_Rectangle}
     * @param {Element} element 元素
     */
    function Element_Rectangle(element) {
        this.element = element;
        this.rectangle = new Rectangle(element.x, element.y, element.width, element.height);
    }

    Element_Rectangle.prototype.toString = function () {
        return "Element_Rectangle: " + this.element.name + " " + this.rectangle.toString() + " (" + this.rectangle.GetTopLeft().x + " " + this.rectangle.GetTopLeft().y + ") " + " (" + this.rectangle.GetTopRight().x + " " + this.rectangle.GetTopRight().y + ") " + " (" + this.rectangle.GetBottomLeft().x + " " + this.rectangle.GetBottomLeft().y + ") " + " (" + this.rectangle.GetBottomRight().x + " " + this.rectangle.GetBottomRight().y + ")";
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

    Rectangle.prototype.GetTopLeft = function () {
        // var half = this.GetHalf();
        return new Point(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2);
    }

    Rectangle.prototype.GetTopRight = function () {
        return new Point(this.position.x + this.size.width / 2, this.position.y - this.size.height / 2);
    }

    Rectangle.prototype.GetBottomLeft = function () {
        return new Point(this.position.x - this.size.width / 2, this.position.y + this.size.height / 2);
    }

    Rectangle.prototype.GetBottomRight = function () {
        return new Point(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
    }

    Rectangle.prototype.GetCenter = function () {
        return new Point(this.size.width / 2, this.size.height / 2);
    }

    Rectangle.prototype.toString = function () {
        return "Rectangle: " + this.position.toString() + " " + this.size.toString();
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
    Point.prototype.toObj = function () {
        return {x: this.x, y: this.y};
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

    Size.prototype.GetHeightBy = function (width) {
        return width / this.ratio;
    }

    Size.prototype.GetWidthBy = function (height) {
        return height * this.ratio;
    }

    Size.prototype.toString = function () {
        return "Size: " + this.width + " " + this.height;
    }

    // fl.Element_Rect = Element_Rect;
    fl.Element_Rectangle = Element_Rectangle;
    fl.Rectangle = Rectangle;
    fl.Point = Point;
    fl.Size = Size;
})();

/**
 * @type {Document}
 */
var doc;//文档

var selection;//选择
/**
 * @type {Library}
 */
var library;//库文件

function Main() {
    if (!checkDom()) {
        return;
    }

    
    for (var i = 0; i < selection.length; i++) {
        // 只选中一个元素
        // for (var j = 0; j < selection.length; j++) {
        //     var element = selection[j];
        //     element.selected = false;
        // }
        doc.selectNone();
        var item = selection[i];
        item.selected = true;
        
        
        /**
         * @type {Point}
         */
        var current = new fl.Point(item.x, item.y);
        var r = doc.getSelectionRect();
        /**
         * 
         * @type {Point}
         */
        var center = new fl.Point((r.left + r.right) / 2, (r.top + r.bottom) / 2);
        
        // var offset = current.sub(center);
        var offset = center.sub(current);
        
        item.setTransformationPoint(offset.toObj());
    }
    
    // 还原选择
    for (var j = 0; j < selection.length; j++) {
        var element = selection[j];
        element.selected = true;
    }
    


}

Main();

