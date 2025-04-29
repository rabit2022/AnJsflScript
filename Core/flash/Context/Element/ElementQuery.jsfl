/**
 * @file: ElementProperty.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 20:59
 * @project: AnJsflScript
 * @description:
 */

define(['SAT'], function ({ Rectangle }) {
    /**
     * 获取element的名称
     * @param {Element} element 元素
     * @returns {string} 名称
     */
    function getName(element) {
        if (element.elementType === 'instance') {
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
            return rect.getCorner('top right');
        }

        // 获取最右边的元素
        var maxElement = elements[0];
        var maxTopRight = getTopRight(maxElement);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var topRight = getTopRight(element);
            // print("topRight:" + topRight.toString())
            // print("maxTopRight:" + maxTopRight.toString())
            if (topRight.IsInDirectionOf(maxTopRight, 'top right')) {
                maxElement = element;
                maxTopRight = topRight;
            }
        }
        return maxElement;
    }
    return {
        getName: getName,
        getMaxRight: getMaxRight
    };
});
