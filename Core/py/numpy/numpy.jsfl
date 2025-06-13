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


    /**
     * 判断一个数值是否是另一个数值的整数倍。
     * @param {number} num - 要判断的数值。
     * @param {number} divisor - 除数。
     * @param {number} [tolerance=1e-9] - 容差值。
     * @returns {boolean} 如果 num 是 divisor 的整数倍，则返回 true，否则返回 false。
     */
    function isMultiple(num, divisor, tolerance) {
        if (tolerance===undefined) tolerance = 1e-9;
        // 检查输入是否为数字
        if (typeof num !== 'number' || typeof divisor !== 'number') {
            throw new TypeError("输入必须是数字");
        }

        // 检查除数是否为零
        if (divisor === 0) {
            throw new Error("除数不能为零");
        }

        // 对于整数，直接使用取模运算符
        if (Number.isInteger(num) && Number.isInteger(divisor)) {
            return num % divisor === 0;
        }

        // 对于浮点数，使用容差值来判断是否“足够接近”倍数关系
        return Math.abs(num % divisor) < tolerance;
    }

    return {
        isclose: isclose,
        copysign: copysign,
        isMultiple: isMultiple
    };
});
