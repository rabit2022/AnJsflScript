/**
 * @file: Select.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:17
 * @project: AnJsflScript
 * @description:
 */

/**
 * 选中当前元件
 * @param element
 */
function onlySelectCurrent(element) {
    var doc = fl.getDocumentDOM();//文档

    doc.selectNone();
    element.selected = true;
}

/**
 * 选中最开始的元件
 */
function SelectStart() {
    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;

    SelectAll(selection);
}

/**
 * 选中所有元件
 * @param {Element[]} elements
 */
function SelectAll(elements) {
    var doc = fl.getDocumentDOM();//文档

    // 先清空所有选中
    doc.selectNone();
    // 选中所有元件
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.selected = true;
    }
}


