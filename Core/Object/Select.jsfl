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
function OnlySelectCurrent(element) {
    var doc = fl.getDocumentDOM();//文档

    // doc.selectNone();
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
 * @param {Element[]} [elements]
 */
function SelectAll(elements) {
    var doc = fl.getDocumentDOM();//文档
    
    // 先清空所有选中
    // doc.selectNone();
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
function SelectNoneTl(timeline){
    // select None
    timeline.setSelectedFrames([0, 0, 0], true);
}

/**
 * 选中时间轴中的所有帧
 * @param {Timeline} timeline
 */
function SelectAllTl(timeline){
    // select All
    timeline.setSelectedFrames(0, timeline.frameCount - 1, true);
}

// /**
//  * 删除  选中时间轴中的所有帧
//  * @param {Timeline} timeline
//  */
// function DeleteSelectedTl(timeline){
//     // 删除所有帧
//     timeline.removeFrames(1, timeline.frameCount);
// }