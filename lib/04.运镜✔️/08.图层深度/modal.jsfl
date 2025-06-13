/**
 * @file: modal.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/8 00:10
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 自适应比例计算（取消提前计算limit的版本）
     *
     * @param {number} currentDepth 当前深度
     * @param {number} targetDepth 目标深度
     * @param {number} [factor=602] 缩放因子
     * @returns {number} 限制范围内的合理比值
     * @see 08.自适应函数.md
     */
    function adaptive_ratio(currentDepth, targetDepth, factor) {
        /**
         * 缩放因子
         * 来源：[-5000,10000]->[-10,20] 确定 缩放因子
         */
        if (factor === undefined) factor = 602;

        return (targetDepth + factor) / (currentDepth + factor);
    }

    return adaptive_ratio;
});
