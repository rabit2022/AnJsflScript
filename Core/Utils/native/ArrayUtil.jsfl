/**
 * @file: ArrayUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 14:37
 * @project: AnJsflScript
 * @description:
 */


function ArrayUtil() {

}


/**
 * 转换为程序的索引
 * 即 索引从0开始，而不是1开始
 * @param {number[]} arr 索引数组
 * @return {number[]} 程序员索引数组
 */
ArrayUtil.prototype.convertToProgrammeIndex= function (arr) {
    return this.addOffset(arr, -1);
}

/**
 * 转换为人类可读的索引
 * 即 索引从1开始，而不是0开始
 * @param {number[]} arr 索引数组
 * @return {number[]} 人类可读索引数组
 */
ArrayUtil.prototype.convertToHumanIndex= function (arr) {
    return this.addOffset(arr, 1);
}

/**
 * 增加第一个帧
 * @param {number[]} arr 索引数组
 * @param {number} offset 第一个帧
 * @return {number[]} 索引数组
 */
ArrayUtil.prototype.addOffset = function (arr, offset) {
    // 每一个帧都加上firstFrame
    return arr.map(function (item) {    
        return item + offset;
    });
}
var arrUtil = new ArrayUtil();