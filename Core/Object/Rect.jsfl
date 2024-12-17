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
/**
 * 点
 * @param {Point} offset 偏移量
 * @returns {Rect} 矩形
 */
Rect.prototype.addOffset = function(offset){
    return new Rect(this.left+offset.x,this.top+offset.y,this.right+offset.x,this.bottom+offset.y);
}
// -
/**
 * 偏移量
 * @param {Point} offset 偏移量
 * @returns {Rect} 矩形
 */
Rect.prototype.subOffset = function(offset){
    return new Rect(this.left-offset.x,this.top-offset.y,this.right-offset.x,this.bottom-offset.y);
}
/**
 * 矩形相加
 * @param {Rect} rect 矩形
 * @returns {Rect} 矩形
 */
Rect.prototype.add = function(rect){
    return new Rect(this.left+rect.left,this.top+rect.top,this.right+rect.right,this.bottom+rect.bottom);
}

/**
 * 矩形相减
 * @param {Rect} rect 矩形
 * @returns {Rect} 矩形   
 */
Rect.prototype.sub = function(rect){
    return new Rect(this.left-rect.left,this.top-rect.top,this.right-rect.right,this.bottom-rect.bottom);
}

/**
 * 矩形中心点
 * @returns {Point} 点
 */
Rect.prototype.center = function(){
    return new Point((this.left+this.right)/2,(this.top+this.bottom)/2);
}
/**
 * 是否包含,当前矩形 是否 在 目标矩形 内部
 * @param {Rect} rect 矩形
 * @returns {boolean} 包含返回true，否则返回false
 */
Rect.prototype.contains = function(rect){
    return this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom;
}

/**
 * 是否越界,当前矩形 是否 在 目标矩形 外部
 * @param {Rect} rect 矩形
 * @returns {boolean} 越界返回true，否则返回false
 */
Rect.prototype.outOfBounds = function(rect){
    return this.left >= rect.right || this.top >= rect.bottom || this.right <= rect.left || this.bottom <= rect.top;
}
/**
 * 字符串
 * @returns {string} 字符串
 */
Rect.prototype.toString = function(){
    return "Rect: " + this.left + " " + this.top + " " + this.right + " " + this.bottom;
}
/**
 * 转换为对象
 * @returns {{left:number,top:number,right:number,bottom:number}} 矩形对象
 */
Rect.prototype.toObj = function() {
    return {left: this.left, top: this.top, right: this.right, bottom: this.bottom};
}

/**
 * 转换为矩形对象
 * @param {{left:number,top:number,right:number,bottom:number}} obj 矩形对象
 * @returns {Rect} 矩形
 */
function wrapRect(obj){
    return new Rect(obj.left, obj.top, obj.right, obj.bottom);
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
    // fl.trace("maxOffsetRect: " + maxOffsetRect.toString())
    // fl.trace("moveVector: " + moveVector.toString())

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

    // fl.trace("newMoveVector: " + newMoveVector.toString())
    return newMoveVector;
}

