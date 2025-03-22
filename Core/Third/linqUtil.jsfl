/**
 * @file: ArrayUtil.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/1/30 14:37
 * @project: AnJsflScript
 * @description:
 */

define(['linq'], function (Enumerable) {
    function LinqUtil() {}

    /**
     * 转换为程序的索引
     * 即 索引从0开始，而不是1开始
     * @param {Array.<number>} arr 索引数组
     * @return {Array.<number>} 程序员索引数组
     */
    LinqUtil.convertToProgrammeIndex = function (arr) {
        return LinqUtil.addOffset(arr, -1);
    };

    /**
     * 转换为人类可读的索引
     * 即 索引从1开始，而不是0开始
     * @param {Array.<number>} arr 索引数组
     * @return {Array.<number>} 人类可读索引数组
     */
    LinqUtil.convertToHumanIndex = function (arr) {
        return LinqUtil.addOffset(arr, 1);
    };

    /**
     * 增加第一个帧
     * @param {Array.<number>} arr 索引数组
     * @param {number} offset 第一个帧
     * @return {Array.<number>} 索引数组
     */
    LinqUtil.addOffset = function (arr, offset) {
        // 使用 linq.js 的 Enumerable 类
        return Enumerable.from(arr)
            .select(function (item) {
                return item + offset;
            })
            .toArray();
    };

    /**
     * 生成范围序列
     * @param {number} start 开始值
     * @param {number} [stop=start+1] 结束值
     * @param {number} [step=1] 步长
     * @return {Enumerable.IEnumerable<number>} 范围序列
     */
    LinqUtil.range = function () {
        // 获取参数
        var args = Array.prototype.slice.call(arguments);

        var start, stop, step;

        // 根据参数数量进行处理
        if (args.length === 1) {
            // 只有一个参数时，默认 start=0，step=1
            start = 0;
            stop = args[0];
            step = 1;
        } else if (args.length === 2) {
            // 有两个参数时，默认 step=1
            start = args[0];
            stop = args[1];
            step = 1;
        } else if (args.length === 3) {
            // 有三个参数时，直接使用传入的参数
            start = args[0];
            stop = args[1];
            step = args[2];
        } else {
            throw new Error(
                'Invalid number of arguments. Expected 1, 2, or 3 arguments.'
            );
        }

        // 检查 step 是否为零
        if (step === 0) {
            throw new Error('step cannot be zero');
        }

        // 计算生成的序列长度
        var count;
        if (step > 0) {
            count = Math.ceil((stop - start) / step);
        } else {
            count = Math.ceil((start - stop) / Math.abs(step));
        }

        // 如果步长方向与范围方向不一致，返回空序列
        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return Enumerable.empty();
        }

        // 使用 Enumerable.range 生成序列
        return Enumerable.range(0, count).select(function (x) {
            return x * step + start;
        });
    };
    return LinqUtil;
});
