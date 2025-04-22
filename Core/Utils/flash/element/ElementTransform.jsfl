/**
 * @file: ElementTransform.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 21:47
 * @project: AnJsflScript
 * @description:
 */

define(['ElementSelect'],function (es) {
    const {OnlySelectCurrent, SelectNone}=es;
    
    /**
     * 重置注册点
     * 1，新的注册点 是 原来的 变形点 </br>
     * 2，经常配合 {@link setTransformationPoint} 使用 </br>
     * 3，如果没有设置变形点，一般来说，元件的默认的变形点就是  中心点 </br>
     * @param {Element} element 元素
     * @deprecated 请使用  doc.convertToSymbol("graphic", symbolName, "center"); 提前设置好元件的注册点</br>
     *             请使用  element.setTransformationPoint(getZeroPoint().toObj());  把元件的变形点设置为 注册点 </br>
     *             这个方法尽量不要使用，因为它会让 元件的注册点 发生变化，导致  设置位置时，出现偏差 </br>
     */
    function resetRegisterPoint(element) {
        var trPoint = wrapPosition(element.getTransformationPoint());

        OnlySelectCurrent(element);

        // 重置注册点
        resetRegisterPointWrap(trPoint);

        OnlySelectCurrent(element);

        // 设置形变点为注册点
        element.setTransformationPoint(getOrigin().toObj());

        var doc = fl.getDocumentDOM();
        doc.moveSelectionBy(trPoint.reverse().toObj());

        /**
         * 重置注册点-editor
         * @param {Vector} transformationPoint 形变点
         */
        function resetRegisterPointWrap(transformationPoint) {
            var doc = fl.getDocumentDOM();
            doc.enterEditMode('inPlace');
            doc.selectAll();

            // 获取所有元件
            var selection = doc.selection;
            for (var i = 0; i < selection.length; i++) {
                var element = selection[i];
                // 选中当前元件
                OnlySelectCurrent(element);

                doc.moveSelectionBy(transformationPoint.reverse().toObj());

                SelectNone();
            }

            doc.exitEditMode();
        }
    }

    /**
     * 更改元件的变形点
     * @param {Element} element
     * @param {'top right'|'top left'|'bottom right'|'bottom left'|'top center'|'right center'|'bottom center'|'left center'} whichCorner
     */
    function setTransformationPointWithCorner(element, whichCorner) {
        // 变形点 到右上角
        var registerPoint = wrapPosition(element);

        OnlySelectCurrent(element);
        var doc = fl.getDocumentDOM();
        var rect = new Rectangle(doc.getSelectionRect());
        var topRight = rect.getCorner(whichCorner);

        // 相对位置
        var relativePoint = topRight.clone().sub(registerPoint);
        element.setTransformationPoint(relativePoint.toObj());
    }

    return {
        setTransformationPointWithCorner: setTransformationPointWithCorner,
        resetRegisterPoint: resetRegisterPoint
    };
});
