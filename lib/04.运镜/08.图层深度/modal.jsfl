/**
 * @file: modal.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/8 00:10
 * @project: AnJsflScript
 * @description:
 */


require(["numpy"],function(np) {
    /**
     * 自适应比例计算
     * @note 解决问题：1.当前值 与 目标值 差距过大时，需要限制比例范围；2.当前值 与 目标值 为0 时，需要返回1。3.分母为0时，需要返回0。
     * @param {number} current - 当前值
     * @param {number} target - 目标值/原始值
     * @param {number} [max_ratio=10] - 最大允许正比值 (默认10)
     * @param {number} [min_ratio=-10] - 最小允许负比值 (默认-10)
     * @returns {number} 限制范围内的合理比值
     */
    function adaptiveRatio(current, target, max_ratio, min_ratio) {
        if (typeof max_ratio === 'undefined') { max_ratio = 10; }
        if (typeof min_ratio === 'undefined') { min_ratio = -10; }

        var EPSILON = 1e-10; // 内部极小常量

        // 处理目标值为零或接近零的情况
        if (np.isclose(target, 0.0,undefined, EPSILON)) {
            if (np.isclose(current, 0.0,undefined, EPSILON)) {
                return 1; // 0/0情况返回0
            }

            // 根据current符号动态确定limit
            var limit = current > 0 ? max_ratio : min_ratio;
            var dynamicTarget = current / limit;
            return current / (dynamicTarget + np.copysign(EPSILON, dynamicTarget));
        }

        // 常规情况处理
        var signedTarget = target + np.copysign(EPSILON, target);
        var rawRatio = current / signedTarget;

        // 根据比值符号确定limit并应用平滑限制
        limit = rawRatio > 0 ? max_ratio : min_ratio;
        return limit * np.tanh(rawRatio / limit);
    }

// 测试
    console.log(adaptiveRatio(10, -5000)); // 输出结果
    console.log(adaptiveRatio(10, 10000)); // 输出结果
    console.log(adaptiveRatio(0, 0)); // 输出结果
});