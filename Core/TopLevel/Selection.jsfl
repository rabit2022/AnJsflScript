/**
 * @file: Selection.jsfl
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
    
    if (!elements){
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



/**
 * 检查选择的元件或帧是否符合指定的模式和条件。
 *
 * @param {Array} selection - 选择的元件或帧数组。
 * @param {"selectElement"|"selectFrame"|"elementOnFrame"} [mode="selectElement"] - 检查模式，默认值为 "selectElement"。
 * @param {"No limit"|"Not Zero"|"Zero"|"Only one"|"Only two"|"More"|
 * ">0"|"=0"|"=1"|"=2"|">1"} [condition="No selection"] - 检查条件，默认值为 "No selection"。
 * @returns {boolean} - 如果选择符合指定条件，则返回 true，否则返回 false。
 */
function CheckSelection(selection, mode,condition) {
    // 设置默认值
    mode = mode || "selectElement";
    condition = condition || "No selection";
    if(condition==="No limit") return true;
    
    if (selection.length < 1) {
        if(condition==="Zero"||condition==="=0") return true;
        
        if (mode === "selectElement") {
            alert("请选择元件？");
        } else if (mode === "selectFrame") {
            alert("请选择至少一个帧");
        } else if (mode === "elementOnFrame") {
            alert("当前帧上至少有一个元件");
        }
        return false;
    }
    
    if(condition==="Not Zero"||condition===">0") return true;
    
    if (selection.length === 1) {
        if(condition==="Only one"||condition==="=1") return true;

        if (mode === "selectElement") {
            alert("请选择至少两个元件");
        } else if (mode === "selectFrame") {
            alert("请选择至少两个帧");
        } else if (mode === "elementOnFrame") {
            alert("当前帧上至少需要两个元件");
        }
        return false;
    }
    if (selection.length === 2) {
        if(condition==="Only two"||condition==="=2") return true;
        
    }
    if (selection.length > 1) {
        if(condition==="More"||condition===">1") return true;

        if (mode === "selectElement") {
            alert("请选择单个元件");
        } else if (mode === "selectFrame") {
            alert("请选择单个帧");
        } else if (mode === "elementOnFrame") {
            alert("当前帧上只能有一个元件");
        }
        return false;
    }
    return true;
}

/**
 * 检查文档是否存在
 * @param {Document} doc
 * @returns {boolean}
 */
function CheckDom(doc) {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }
    return true;
}
