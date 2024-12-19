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
/**
 * 矩形 偏移后的 矩形
 * 移动矩形的边界
 * @param {Point} offset 偏移量
 * @returns {Rect} 矩形
 */
Rect.prototype.addOffset = function(offset){
    return new Rect(this.left+offset.x,this.top+offset.y,this.right+offset.x,this.bottom+offset.y);
}
/**
 * 矩形 偏移前的 矩形
 * 移动矩形的边界
 * @param {Point} offset 偏移量
 * @returns {Rect} 矩形
 */
Rect.prototype.subOffset = function(offset){
    return new Rect(this.left-offset.x,this.top-offset.y,this.right-offset.x,this.bottom-offset.y);
}
/**
 * 矩形相加
 * 扩展  矩形的边界
 * @param {Rect} rect 矩形
 * @returns {Rect} 矩形
 */
Rect.prototype.add = function(rect){
    return new Rect(this.left+rect.left,this.top+rect.top,this.right+rect.right,this.bottom+rect.bottom);
}

/**
 * 矩形相减
 * 小矩形的边界   与   大矩形的边界  的距离 
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
 * 矩形的宽度
 * @returns {number} 宽度
 */
Rect.prototype.width = function(){
    return this.right - this.left;
}

/**
 * 矩形的高度
 * @returns {number} 高度
 */
Rect.prototype.height = function(){
    return this.bottom - this.top;
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
 * 获取矩形的某个角点
 * @param {"top right"|"top left"|"bottom right"|"bottom left"|"top center"|"right center"|"bottom center"|"left center"|"center"} whichCorner whichCorner 角点
 * @returns {Point} 点
 */
Rect.prototype.getCorner = function(whichCorner){
    switch (whichCorner) {
        case "top right":
            return new Point(this.right, this.top);
        case "top left":
            return new Point(this.left, this.top);
        case "bottom right":
            return new Point(this.right, this.bottom);
        case "bottom left":
            return new Point(this.left, this.bottom);
        case "top center":
            return new Point((this.left+this.right)/2, this.top);
        case "right center":
            return new Point(this.right, (this.top+this.bottom)/2);
        case "bottom center":
            return new Point((this.left+this.right)/2, this.bottom);
        case "left center":
            return new Point(this.left, (this.top+this.bottom)/2);
        case "center":
            return new Point((this.left+this.right)/2, (this.top+this.bottom)/2);
        default:
            // return new Point(0,0);
            throw new Error("whichCorner 参数错误");
    }
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
    // 小矩形的边界   与   大矩形的边界  的距离 
    // <0  小矩形在大矩形的  外面
    // >0  小矩形在大矩形的  里面
    // =0  小矩形在大矩形的  边界上
    var maxOffsetRect = smallRect.sub(bigRect);
    // fl.trace("maxOffsetRect: " + maxOffsetRect.toString())
    // fl.trace("moveVector: " + moveVector.toString())

    // moveVector=cameraOffset.sub(cameraPos);
    // moveVector.x>0 摄像机在人物的右边
    // moveVector.x<0 摄像机在人物的左边
    // moveVector.y>0 摄像机在人物的下边
    // moveVector.y<0 摄像机在人物的上边

    // newMoveVector=cameraPos.add(cameraOffset);
    // moveVector.x>0 向左移动
    // moveVector.x<0 向右移动
    // moveVector.y>0 向上移动
    // moveVector.y<0 向下移动

    var newMoveVector = new Point(moveVector.x, moveVector.y);
    if (moveVector.x <0){//向右移动
        newMoveVector.x = Math.max(moveVector.x, maxOffsetRect.right);
    }else if(moveVector.x > 0){//向左移动
        newMoveVector.x = Math.min(moveVector.x, maxOffsetRect.left);
    }
    if (moveVector.y <0){//向下移动
        newMoveVector.y = Math.max(moveVector.y, maxOffsetRect.bottom);
    }else if(moveVector.y > 0){//向上移动
        newMoveVector.y = Math.min(moveVector.y, maxOffsetRect.top)
    }

    // fl.trace("newMoveVector: " + newMoveVector.toString())
    return newMoveVector;
}