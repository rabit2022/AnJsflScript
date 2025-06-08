/**
 * @file: numpy.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/7 23:45
 * @project: AnJsflScript
 * @description:
 */
define(function () {
    /**
     * 判断两个数值是否在一定容差范围内相等。
     * 类似于 NumPy 的 np.isclose 函数。
     * @param {number} a - 第一个数值。
     * @param {number} b - 第二个数值。
     * @param {number} [atol=1e-8] - 绝对容差。
     * @param {number} [rtol=1e-5] - 相对容差。
     * @returns {boolean} 如果两个数值在容差范围内相等，则返回 true，否则返回 false。
     */
    function isclose(a, b, atol, rtol) {
        atol = atol || 1e-8; // 默认绝对容差
        rtol = rtol || 1e-5; // 默认相对容差

        return Math.abs(a - b) <= atol + rtol * Math.abs(b);
    }

    /**
     * 返回一个数值的绝对值，并带有另一个数值的符号。
     * 类似于 NumPy 的 np.copysign 函数。
     * @param {number} x - 要取绝对值的数值。
     * @param {number} y - 提供符号的数值。
     * @returns {number} 返回带有 y 符号的 x 的绝对值。
     */
    function copysign(x, y) {
        return Math.sign(y) * Math.abs(x);
    }

    var tanh = Math.tanh;

    var numpy = {
        isclose: isclose,
        copysign: copysign,
        tanh: tanh
    };

    return numpy;
});
