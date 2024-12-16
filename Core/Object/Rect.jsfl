/**
 * @file: Rect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/16 16:23
 * @project: WindowSWF-master
 * @description:
 */


// {left:number,top:number,right:number,bottom:number}
/**
 * 矩形
 * @param {number} left 左边
 * @param {number} top 上边
 * @param {number} right 右边
 * @param {number} bottom 下边
 * @constructor
 * @class {Rect}
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


