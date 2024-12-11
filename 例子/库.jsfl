/**
 * @file: 库.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:17
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
var ele = new Ele();

/**
 * 定义一个点类
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @constructor
 * @class {Point}
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

// 除法
/**
 * 除法，两个点的坐标的商
 * @param {number} num 除数
 * @returns {Point}
 */
Point.prototype.div = function (num) {
    return new Point(this.x / num, this.y / num);
}

// round
/**
 * 四舍五入
 * @returns {Point}
 */
Point.prototype.toIntPonit = function () {
    return new Point(Math.round(this.x), Math.round(this.y));
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

// 负
Point.prototype.neg = function () {
    return new Point(-this.x, -this.y);
}

/**
 * 转换为对象
 * @param {{x:number,y:number}} obj 点对象
 * @return {Point}
 */
function wrapPoint(obj) {
    return new Point(obj.x, obj.y);
}

function getZeroPoint() {
    return new Point(0, 0);
}

// {left:number,top:number,right:number,bottom:number}
/**
 * 矩形
 * @param {number} left 左边
 * @param {number} top 上边
 * @param {number} right 右边
 * @param {number} bottom 下边
 * @constructor
 */
function Rect(left, top, right, bottom){
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
}
//+
Rect.prototype.addOffset = function(offset){
    return new Rect(this.left+offset.x,this.top+offset.y,this.right+offset.x,this.bottom+offset.y);
}
// -
Rect.prototype.subOffset = function(offset){
    return new Rect(this.left-offset.x,this.top-offset.y,this.right-offset.x,this.bottom-offset.y);
}
// +
Rect.prototype.add = function(rect){
    return new Rect(this.left+rect.left,this.top+rect.top,this.right+rect.right,this.bottom+rect.bottom);
}
// -
Rect.prototype.sub = function(rect){
    return new Rect(this.left-rect.left,this.top-rect.top,this.right-rect.right,this.bottom-rect.bottom);
}

// /**
//  * 计算小的矩形在大矩形中的最大偏移量
//  * @param bigRect
//  * @param smallRect
//  */
// function maxOffsetRect(bigRect, smallRect) {
//     return new Rect(
// }
/**
 * 计算新的向量，确保小矩形不会超出大矩形的边界
 * @param {Rect} bigRect 大矩形
 * @param {Rect} smallRect 小矩形
 * @param {Point} moveVector 原始向量
 * @returns {Point} 新的向量
 */
function calculateSafeMoveVector(bigRect, smallRect, moveVector) {
    var maxOffsetRect = smallRect.sub(bigRect);
    fl.trace("maxOffsetRect: " + maxOffsetRect.toString())
    
    var newMoveVector = new Point(moveVector.x, moveVector.y);
    if (moveVector.x <0){
        newMoveVector.x = Math.max(moveVector.x, maxOffsetRect.right);
    }else if(moveVector.x > 0){
        newMoveVector.x = Math.min(moveVector.x, maxOffsetRect.left);
    }
    if (moveVector.y <0){
        newMoveVector.y = Math.max(moveVector.y, maxOffsetRect.bottom);
    }else if(moveVector.y > 0){
        newMoveVector.y = Math.min(moveVector.y, maxOffsetRect.top);
    }
    return newMoveVector;
}
    

// 中心点
Rect.prototype.center = function(){
    return new Point((this.left+this.right)/2,(this.top+this.bottom)/2);
}
// 包含
Rect.prototype.contains = function(rect){
    return this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom;
}

// 越界
Rect.prototype.outOfBounds = function(rect){
    return this.left >= rect.right || this.top >= rect.bottom || this.right <= rect.left || this.bottom <= rect.top;
}

Rect.prototype.toString = function(){
    return "Rect: " + this.left + " " + this.top + " " + this.right + " " + this.bottom;
}

Rect.prototype.toObj = function() {
    return {left: this.left, top: this.top, right: this.right, bottom: this.bottom};
}
/**
 * 转换为矩形对象
 * @param {{left:number,top:number,right:number,bottom:number}} obj 矩形对象
 */
function wrapRect(obj){
    return new Rect(obj.left, obj.top, obj.right, obj.bottom);
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
    // for (var i = 0; i < selection.length; i++) {
    //     var element = selection[i];
    //     element.selected = true;
    // }
    SelectAll(selection);
}

function SelectAll(elements) {
    // 选中所有元件
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.selected = true;
    }
}
/**
 * 新建一个矩阵
 * @returns {Matrix}
 */
function createMatrix(a, b, c, d, tx, ty) {
    var matrix = doc.viewMatrix;
    matrix.a = a;
    matrix.b = b;
    matrix.c = c;
    matrix.d = d;
    matrix.tx = tx;
    matrix.ty = ty;
    return matrix;
}

function getNormalMatrix() {
    var matrix = createMatrix(1, 0, 0, 1, 0, 0);
    return matrix;
}



var EASE_TYPES = {
    "No Ease": [5,-2,0],
    "Classic Ease": [5,-1,0],

    "Quad Ease-In": [5,0,0],
    "Cubic Ease-In": [5,3,0],
    "Quart Ease-In": [5,6,0],
    "Quint Ease-In": [5,9,0],
    "Sine Ease-In": [5,12,0],
    "Back Ease-In": [5,15,0],
    "Circ Ease-In": [5,18,0],
    "Bounce Ease-In": [5,21,0],
    "Elastic Ease-In": [5,24,0],

    "Quad Ease-Out": [5,1,0],
    "Cubic Ease-Out": [5,4,0],
    "Quart Ease-Out": [5,7,0],
    "Quint Ease-Out": [5,10,0],
    "Sine Ease-Out": [5,13,0],
    "Back Ease-Out": [5,16,0],
    "Circ Ease-Out": [5,19,0],
    "Bounce Ease-Out": [5,22,0],
    "Elastic Ease-Out": [5,25,0],

    "Quad Ease-In-Out": [5,2,0],
    "Cubic Ease-In-Out": [5,5,0],
    "Quart Ease-In-Out": [5,8,0],
    "Quint Ease-In-Out": [5,11,0],
    "Sine Ease-In-Out": [5,14,0],
    "Back Ease-In-Out": [5,17,0],
    "Circ Ease-In-Out": [5,20,0],
    "Bounce Ease-In-Out": [5,23,0],
    "Elastic Ease-In-Out": [5,26,0],
};

/**
 * 设置缓动曲线
 * @param {"No Ease"|"Classic Ease"|"Quad Ease-In"|"Cubic Ease-In"|"Quart Ease-In"|"Quint Ease-In"|"Sine Ease-In"|"Back Ease-In"|"Circ Ease-In"|"Bounce Ease-In"|"Elastic Ease-In"|"Quad Ease-Out"|"Cubic Ease-Out"|"Quart Ease-Out"|"Quint Ease-Out"|"Sine Ease-Out"|"Back Ease-Out"|"Circ Ease-Out"|"Bounce Ease-Out"|"Elastic Ease-Out"|"Quad Ease-In-Out"|"Cubic Ease-In-Out"|"Quart Ease-In-Out"|"Quint Ease-In-Out"|"Sine Ease-In-Out"|"Back Ease-In-Out"|"Circ Ease-In-Out"|"Bounce Ease-In-Out"|"Elastic Ease-In-Out"} easeType 缓动类型
 */
function setEaseCurve(easeType){
    var easeData = EASE_TYPES[easeType];
    if(!easeData){
        return;
    }
    timeline.setFrameProperty('easeType', easeData[0], easeData[1], easeData[2]);
}

/**
 * 
 * @param obj
 * @returns {string[]}
 */
function getFunctions(obj) {
    var functions = [];
    for (var key in obj) {
        functions.push(key);
    }
    return functions;
}




fl.UtilHasExec=true;