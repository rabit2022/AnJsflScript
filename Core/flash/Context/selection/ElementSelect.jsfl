/**
 * @file: ElementSelect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 23:31
 * @project: AnJsflScript
 * @description:
 */

define(["ElementQuery"], function (eq) {
    const { getName } = eq;

    /**
     * 选中当前元件
     * @param element
     */
    function OnlySelectCurrent(element) {
        SelectNone();
        // element.selected = true;
        var doc = fl.getDocumentDOM(); //文档
        doc.selection = [element];
    }

    /**
     * 选中最开始的元件
     * @param {Element[]} selection 选中的元件数组
     */
    function SelectStart(selection) {
        SelectAll(selection);
    }

    /**
     * 选中所有元件
     * @param {Element[]} [elements] 没有参数时，选中所有元件；有参数时，选中参数中的所有元件
     */
    function SelectAll(elements) {
        var doc = fl.getDocumentDOM(); //文档

        if (!elements) {
            doc.selectAll();
            return;
        }

        // 先清空所有选中
        SelectNone();
        // 选中所有元件
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.selected = true;
        }
    }

    /**
     * 反选所有元件
     * @param {Element[]} [elements] 没有参数时，反选所有元件；有参数时，反选参数中的所有元件
     */
    function InvertSelection(elements) {
        var doc = fl.getDocumentDOM(); // 获取当前文档

        // 遍历所有元件，进行反选操作
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            // 如果当前元件被选中，则取消选中；否则选中
            element.selected = !element.selected;
        }
    }

    function SelectNone() {
        var doc = fl.getDocumentDOM();
        doc.selectNone();
    }

    /**
     * 在当前帧，选中 之前帧 选中的元素
     * @param {Element[]} selection 选中的元件数组
     * @note  在设置关键帧后(frUtil.convertToKeyframesSafety), 选中之前帧的元素会失效
     *        需要重新 在当前帧，选中 之前帧 选中的元素
     *        如果不使用这个函数，doc.selection 会一直为空,出现bug
     */
    function SelectBefore(selection) {
        var doc = fl.getDocumentDOM(); //文档
        var selectionNames = selection.map(getName); //选择的元件名称

        SelectAll();
        var lastSelection = [];

        var newSelection = doc.selection;
        for (var i = 0; i < newSelection.length; i++) {
            var element = newSelection[i];
            var elementName = getName(element);

            if (selectionNames.includes(elementName)) {
                lastSelection.push(element);
            }
        }

        SelectStart(lastSelection);
    }

    /**
     * 选中相同名称的元件
     * @param {Element} firstElement 第一个元件
     */
    function SelectSameName(firstElement) {
        var doc = fl.getDocumentDOM(); //文档
        var firstElementName = getName(firstElement);

        SelectAll();
        var selection = doc.selection; //选择
        for (var i = 0; i < selection.length; i++) {
            var element = selection[i];
            var selectionName = getName(element);
            // log.info('选择的元件名称：' + name);

            if (selectionName === firstElementName) {
                element.selected = true;
            }
        }
    }

    /**
     * 删除选中的元件
     * @param {Element[]} [elements] 没有参数时，删除所有选中的元件；有参数时，删除参数中的所有元件
     */
    function DeleteSelection(elements) {
        var doc = fl.getDocumentDOM();
        if (!elements) {
            doc.deleteSelection();
            return;
        }

        SelectAll(elements);
        doc.deleteSelection();
    }
    return {
        OnlySelectCurrent: OnlySelectCurrent,
        SelectStart: SelectStart,
        SelectAll: SelectAll,
        SelectNone: SelectNone,
        SelectBefore: SelectBefore,
        SelectSameName: SelectSameName,
        DeleteSelection: DeleteSelection,
        InvertSelection: InvertSelection
    };
});
