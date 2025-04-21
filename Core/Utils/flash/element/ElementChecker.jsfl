/**
 * @file: ElementChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 20:53
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 判断是否是 组
     * @param {Element} element 元素
     * @returns {boolean} 是否是 组
     */
    function IsGroup(element) {
        return element && element.isGroup;
    }

    /**
     * 判断是否是 元件
     * @param {Element} element 元素
     * @returns {boolean} 是否是 元件
     */
    function IsSymbol(element) {
        return (
            // 非空元素，非组
            !IsGroup(element) &&
            // instance+symbol  或者  symbolType
            ((element.elementType === 'instance' && element.instanceType === 'symbol') ||
                element.symbolType !== undefined)
        );
    }

    /**
     * 判断是否是 位图
     * @param {Element} element 元素
     * @returns {boolean} 是否是 位图
     */
    function IsBitmap(element) {
        return (
            !IsGroup(element) &&
            element.elementType === 'instance' &&
            element.instanceType === 'bitmap'
        );
    }

    /**
     * 判断是否是 形状
     * @param {Element} element 元素
     * @param {boolean} [strict=false] 是否严格判断，严格判断时，子类 绘制对象 等 都不算形状
     * @returns {boolean} 是否是 形状
     */
    function IsShape(element, strict) {
        if (strict === undefined) strict = false;

        var isShape = !IsGroup(element) && element.elementType === 'shape';
        var isChildren;
        if (strict) {
            isChildren = IsDrawingObject(element);
        }
        return isShape && !isChildren;
    }

    /**
     * 判断是否是 绘制对象
     * @param {Element} element 元素
     * @returns {boolean} 是否是 绘制对象
     */
    function IsDrawingObject(element) {
        return (
            !IsGroup(element) &&
            (element.elementType === 'shapeObj' || element.isDrawingObject)
        );
    }

    return {
        IsGroup: IsGroup,
        IsSymbol: IsSymbol,
        IsBitmap: IsBitmap,
        IsShape: IsShape,
        IsDrawingObject: IsDrawingObject
    };
});
