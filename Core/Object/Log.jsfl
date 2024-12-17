/**
 * @file: Log.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:31
 * @project: WindowSWF-master
 * @description:
 */

/**
 * 打印矩阵
 * @param {Matrix} matrix 矩阵
 */
function LogMatrix(matrix) {
    fl.trace("[" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + "] [" + matrix.tx + ", " + matrix.ty +"]");
}

/**
 * 打印数组中的数字
 * @param {number[]}numbers 数组
 */
function LogNumbers(numbers) {
    var str = "";
    for (var i = 0; i < numbers.length; i++) {
        str += numbers[i] + " ";
    }
    fl.trace(str);
}