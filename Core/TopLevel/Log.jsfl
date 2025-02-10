/**
 * @file: Log.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:31
 * @project: AnJsflScript
 * @description:
 */

/**
 * 打印矩阵
 * @param {Matrix} matrix 矩阵
 */
function LogMatrix(matrix) {
    fl.trace("[" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + "] [" + matrix.tx + ", " + matrix.ty + "]");
}

/**
 * 打印数组中的数字
 * @param {number[]}numbers 数组
 */
function LogArray(numbers) {
    var str = "[ ";
    for (var i = 0; i < numbers.length; i++) {
        if (i === numbers.length - 1) {
            str += numbers[i] + " ]";
            break;
        }

        str += numbers[i] + ", ";
    }
    fl.trace(str);
}


function print() {
    if (!(typeof DEBUG_MODE!==undefined&&DEBUG_MODE===true)) return;
    
    // 将 arguments 转换为真正的数组
    var args = Array.prototype.slice.call(arguments);

    // 将所有参数拼接成一个字符串
    var str = args.join("    ");

    // 调用 fl.trace 方法
    fl.trace(str);
}
