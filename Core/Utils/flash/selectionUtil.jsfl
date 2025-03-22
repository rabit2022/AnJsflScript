/**
 * @file: Selection.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:17
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 选中当前元件
     * @param element
     */
    function OnlySelectCurrent(element) {
        SelectNone();
        element.selected = true;
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

    function SelectNone() {
        var doc = fl.getDocumentDOM();
        doc.selectNone();
    }

    /**
     *
     * 不选中时间轴中的所有帧
     * @param {Timeline} timeline
     */
    function SelectNoneTl(timeline) {
        // select None
        timeline.setSelectedFrames([0, 0, 0], true);
    }

    /**
     * 选中时间轴中的所有帧
     * @param {Timeline} timeline
     */
    function SelectAllTl(timeline) {
        // select All
        timeline.setSelectedFrames(0, timeline.frameCount - 1, true);
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

    /**
     * 在当前帧，选中 之前帧 选中的元素
     * @param {Element[]} selection 选中的元件数组
     * @note  在设置关键帧后(frUtil.convertToKeyframesSafety), 选中之前帧的元素会失效
     *        需要重新 在当前帧，选中 之前帧 选中的元素
     *        如果不使用这个函数，doc.selection 会一直为空,出现bug
     */
    function SelectBefore(selection) {
        // polyfill
        // bug:ElementUtil.getName  循环引用的问题
        getName = function (element) {
            if (element.elementType === 'instance') {
                return element.libraryItem.name;
            } else {
                return element.name;
            }
        };

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

    return {
        OnlySelectCurrent: OnlySelectCurrent,
        SelectStart: SelectStart,
        SelectAll: SelectAll,
        SelectNone: SelectNone,
        SelectNoneTl: SelectNoneTl,
        SelectAllTl: SelectAllTl,
        DeleteSelection: DeleteSelection,
        SelectBefore: SelectBefore
    };
});
