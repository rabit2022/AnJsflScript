/**
 * @file: RectUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/23 17:25
 * @project: AnJsflScript
 * @description:
 */


/**
 * 矩形工具类
 * @constructor
 * @class {RectUtil}
 */
function RectUtil() {

}

/**
 * 计算新的向量，确保  小矩形的最终落点  不会超出  大矩形的边界
 * @param {Rect} bigRect 大矩形
 * @param {Rect} smallRect 小矩形
 * @param {Point} moveVector 原始向量
 * @returns {Point} 新的向量
 */
RectUtil.prototype.calculateSafeMoveVector= function (bigRect, smallRect, moveVector) {
    // 小矩形的边界   与   大矩形的边界  的距离 
    // <0  小矩形在大矩形的  外面
    // >0  小矩形在大矩形的  里面
    // =0  小矩形在大矩形的  边界上
    var maxOffsetRect = smallRect.sub(bigRect);
    
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
    if (moveVector.x < 0) {//向右移动
        newMoveVector.x = Math.max(moveVector.x, maxOffsetRect.right);
        if (maxOffsetRect.left < 0) {//small 在 big 的边界 左边
            newMoveVector.x = Math.min(newMoveVector.x, maxOffsetRect.left);
        }
    } else if (moveVector.x > 0) {//向左移动
        newMoveVector.x = Math.min(moveVector.x, maxOffsetRect.left);
        if (maxOffsetRect.right > 0) {//small 在 big 的边界 右边
            newMoveVector.x = Math.max(newMoveVector.x, maxOffsetRect.right);
        }
    }
    if (moveVector.y < 0) {//向下移动
        newMoveVector.y = Math.max(moveVector.y, maxOffsetRect.bottom);
        if (maxOffsetRect.top < 0) {//small 在 big 的边界上面
            newMoveVector.y = Math.min(newMoveVector.y, maxOffsetRect.top);
        }
    } else if (moveVector.y > 0) {//向上移动
        newMoveVector.y = Math.min(moveVector.y, maxOffsetRect.top)
        if (maxOffsetRect.bottom > 0) {//small 在 big 的边界下面
            newMoveVector.y = Math.max(newMoveVector.y, maxOffsetRect.bottom);
        }
    }

    // fl.trace("newMoveVector: " + newMoveVector.toString())
    return newMoveVector;
}

/**
 * 随机生成  一个矩形范围内的  随机点
 * @param {Rect} rect 矩形
 * @returns {Point} 随机点
 */
RectUtil.prototype.generateRandomPointInRect= function (rect) {
    const randomX =random.uniform(rect.left, rect.right);
    const randomY =random.uniform(rect.top, rect.bottom);
    return new Point(randomX, randomY);
}

/**
 * 计算矩形分割后每个小块的尺寸。
 * 尽可能的均匀分割5x5的小块。
 * @param {Size} rectSize - 矩形的大小。
 * @param {number} [gridSize=5] - 分割网格的大小，默认为5。
 * @returns {[number, number, number, number]} [blockWidth, blockHeight,blockCountX,blockCountY]- 每个小块的宽度和高度，以及网格的数量。
 */
RectUtil.prototype.splitRectangle= function (rectSize, gridSize) {
    if (!gridSize) {
        gridSize = 5;
    }
    // 计算矩形的长边和短边
    const longerSide = rectSize.max;
    const shorterSide = rectSize.min;

    // 计算每个网格块的长边尺寸，不超过gridSize
    const blockLongerSide = longerSide / gridSize;
    // 计算短边方向上最多能分割的块数
    const shorterMaxCount = Math.ceil(shorterSide / blockLongerSide);

    // 计算每个网格块的短边尺寸
    const blockShorterSide = shorterSide / shorterMaxCount;

    // fl.trace("longerSide:"+longerSide+" shorterSide:"+shorterSide+" blockLongerSide:"+blockLongerSide+" blockShorterSide:"+blockShorterSide);
    // 返回每个小块的宽度和高度
    // 这里我们假设返回的顺序是宽度和高度，根据传入的width和height的对应关系
    // [blockWidth, blockHeight,blockCountX,blockCountY]
    if (rectSize.width > rectSize.height) {
        return [blockLongerSide, blockShorterSide, gridSize, shorterMaxCount];
    } else {
        return [blockShorterSide, blockLongerSide, shorterMaxCount, gridSize];
    }
}

var rectUtil = new RectUtil();
