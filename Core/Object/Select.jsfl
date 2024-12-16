/**
 * @file: 库.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:17
 * @project: WindowSWF-master
 * @description:
 */

/**
 * 选中当前元件
 * @param element
 */
function onlySelectCurrent(element){
    doc.selectNone();
    element.selected = true;
}
/**
 * 选中最开始的元件
 */
function SelectStart() {
    SelectAll(selection);
}

function SelectAll(elements) {
    // 选中所有元件
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.selected = true;
    }
}






