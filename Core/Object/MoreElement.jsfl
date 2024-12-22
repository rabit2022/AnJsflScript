/**
 * @file: MoreElement.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/22 17:06
 * @project: AnJsflScript
 * @description:
 */

function MoreElement(element,horizontalSpacing, verticalSpacing) {
    this.element = element;
    this.positioin = new Point(element.x, element.y);

    this.offsetX = element.width * horizontalSpacing;
    this.offsetY = element.height * verticalSpacing;
}

/**
 * 整齐排列元素
 * @param x 横向坐标
 * @param y 纵向坐标
 * @returns {Point} 元素坐标
 */
MoreElement.prototype.Neat = function (x, y) {
    var elementX = this.positioin.x + this.offsetX * x;
    var elementY = this.positioin.y + this.offsetY * y;
    return new Point(elementX, elementY);
}

/**
 * 交错排列元素
 * @param x 横向坐标
 * @param y 纵向坐标
 * @returns {Point} 元素坐标
 */
MoreElement.prototype.Staggered = function (x, y) {    
    var pos=this.Neat(x,y);
    // 偶数行，实际行数减1（实际奇数行在程序中是偶数行，实际偶数行在程序中是奇数行）
    if(y%2!==0){
        pos.x+=this.offsetX/2;
    }
    return pos;
}
