/**
 * @file: ElementQuery.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 20:59
 * @project: AnJsflScript
 * @description:
 */

define(["SAT"], function ({ Rectangle }) {
    /**
     * 获取element的名称
     * @param {Element} element 元素
     * @returns {string} 名称
     */
    function getName(element) {
        if (element.elementType === "instance") {
            return element.libraryItem.name;
        } else {
            return element.name;
        }
    }

    /**
     * 获取最右边的元素
     * @param {Element[]} elements 元素数组
     * @returns {Element}
     */
    function getMaxRight(elements) {
        function getTopRight(element) {
            var rect = new Rectangle(element);
            return rect.getCorner("top right");
        }

        // 获取最右边的元素
        var maxRightElement = elements[0];
        var maxTopRight = getTopRight(maxRightElement);
        for (var i = 0; i < elements.length; i++) {
            var curElement = elements[i];
            var curTopRight = getTopRight(curElement);

            if (curTopRight.IsInDirectionOf(maxTopRight, "right center")) {
                maxRightElement = curElement;
                maxTopRight = curTopRight;
            }
        }
        return maxRightElement;
    }
    /**
     * 获取symbol的 内部 总帧数
     * @param {Element} symbol symbol元素
     * @returns {number} frameCount
     */
    function getFrameCount(symbol) {
        var symbolTimeline = symbol.libraryItem.timeline;
        var frameCount = symbolTimeline.frameCount;
        return frameCount;
    }

    return {
        getName: getName,
        getMaxRight: getMaxRight,
        getFrameCount: getFrameCount
    };
});
