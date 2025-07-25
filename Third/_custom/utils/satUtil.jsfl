﻿/**
 * @file: satUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/2/5 21:13
 * @project: AnJsflScript
 * @description:
 */

define(['SAT', 'random',"loglevel"], function(sat, random,log) {
    var wrapPosition = sat.GLOBALS.wrapPosition;
    var Vector = sat.Vector,
        Rectangle = sat.Rectangle;

    /**
     * 获取 摇头 的 变形点
     * @param {Element} element 元件
     * @param {Number} [ratio=5/6] 缩放比例
     * @returns {*}
     */
    function getShakeHeadTrPoint(element, ratio) {
        if (ratio === undefined) {
            ratio = 5 / 6;
        }
        // x:中间位置, y: height*5/6
        // element
        var elePos = wrapPosition(element);
        // log.info("elePos: ",elePos);

        var eleRect = new Rectangle(element);
        // log.info("eleRect: " ,eleRect);


        // trPoint
        var botttomPart = eleRect.getPart('bottom', 1 - ratio);
        var trPointWorld = botttomPart.getCorner('top center');

        var trPointLocal = trPointWorld.clone().sub(elePos);

        return trPointLocal;
    };


    /**
     * 计算新的向量，确保  小矩形的最终落点  不会超出  大矩形的边界
     * @param {Rectangle} bigRect 大矩形--限制范围
     * @param {Rectangle} smallRect 小矩形--要移动的矩形
     * @param {Vector} moveVector 要移动的向量
     * @returns {Vector} 可以移动的向量
     */
    function moveRectSafety(bigRect, smallRect, moveVector) {
        // 小矩形的边界   与   大矩形的边界  的距离
        // <0  小矩形在大矩形的  外面
        // >0  小矩形在大矩形的  里面
        // =0  小矩形在大矩形的  边界上
        // var maxOffsetRect = smallRect.sub(bigRect);
        var maxOffsetRect = smallRect.subOffset(bigRect);

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

        var newMoveVector = new Vector(moveVector.x, moveVector.y);
        if (moveVector.x < 0) {
            //向右移动
            newMoveVector.x = Math.max(moveVector.x, maxOffsetRect.right);
            if (maxOffsetRect.left < 0) {
                //small 在 big 的边界 左边
                newMoveVector.x = Math.min(newMoveVector.x, maxOffsetRect.left);
            }
        } else if (moveVector.x > 0) {
            //向左移动
            newMoveVector.x = Math.min(moveVector.x, maxOffsetRect.left);
            if (maxOffsetRect.right > 0) {
                //small 在 big 的边界 右边
                newMoveVector.x = Math.max(newMoveVector.x, maxOffsetRect.right);
            }
        }
        if (moveVector.y < 0) {
            //向下移动
            newMoveVector.y = Math.max(moveVector.y, maxOffsetRect.bottom);
            if (maxOffsetRect.top < 0) {
                //small 在 big 的边界上面
                newMoveVector.y = Math.min(newMoveVector.y, maxOffsetRect.top);
            }
        } else if (moveVector.y > 0) {
            //向上移动
            newMoveVector.y = Math.min(moveVector.y, maxOffsetRect.top);
            if (maxOffsetRect.bottom > 0) {
                //small 在 big 的边界下面
                newMoveVector.y = Math.max(newMoveVector.y, maxOffsetRect.bottom);
            }
        }

        // fl.trace("newMoveVector: " + newMoveVector.toString())
        return newMoveVector;
    };

    /**
     * 随机生成  一个矩形范围内的  随机点
     * @param {Rectangle} rect 矩形
     * @returns {Vector} 随机点
     */
    function generateRandomPointInRect(rect) {
        const randomX = random.uniform(rect.left, rect.right);
        const randomY = random.uniform(rect.top, rect.bottom);
        return new Vector(randomX, randomY);
    };

    /**
     * 计算矩形分割后每个小块的尺寸。
     * 尽可能均匀分割网格，例如 5x5 的小块。
     * @param {Size} rectSize - 矩形的大小，包含 width 和 height 属性。
     * @param {number} [gridSize=5] - 分割网格的大小，默认为 5。
     * @returns {[number, number, number, number]} [blockWidth, blockHeight, blockCountX, blockCountY] - 每个小块的宽度和高度，以及网格的数量。
     */
    function splitRectangle(rectSize, gridSize) {
        // 设置默认值
        if (gridSize === undefined) {
            gridSize = 5;
        }

        const { max_size: longerSide, min_size: shorterSide, width, height } = rectSize;

        // 计算每个网格块的长边尺寸
        const blockLongerSide = longerSide / gridSize;

        // 计算短边方向上最多能分割的块数
        const shorterMaxCount = Math.ceil(shorterSide / blockLongerSide);

        // 计算每个网格块的短边尺寸
        const blockShorterSide = shorterSide / shorterMaxCount;

        // 根据矩形的宽高比例返回结果
        if (width > height) {
            // 宽度为长边
            return [blockLongerSide, blockShorterSide, gridSize, shorterMaxCount];
        } else {
            // 高度为长边
            return [blockShorterSide, blockLongerSide, shorterMaxCount, gridSize];
        }
    };

    return {
        getShakeHeadTrPoint: getShakeHeadTrPoint,
        moveRectSafety: moveRectSafety,
        generateRandomPointInRect: generateRandomPointInRect,
        splitRectangle: splitRectangle
    };
});
