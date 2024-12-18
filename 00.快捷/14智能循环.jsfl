/**
 * @type {Document}
 * @Author 见水中月
 */



function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }
    if (selection.length < 1) {
        alert("请选择元件？");
        return false;
    }
    // if (selection.length > 1) {
    //     alert("请选择单个元件");
    //     return false;
    // }
    // if (selection.length === 1) {
    //     alert("请选择至少两个元件");
    //     return false;
    // }
    return true;
}


var doc = fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library = doc.library;//库文件

function Main() {
    if (!checkDom()) {
        return;
    }
    
    var element = doc.selection[0];
    element.loop = "loop";
    
    var timeline = element.libraryItem.timeline;
    var layer = timeline.layers[0];
    
    // 获取关键帧的起始帧
    var startFrame = layer.frames[element.firstFrame].startFrame;
    element.firstFrame = startFrame;
    element.lastFrame = layer.frames[startFrame].duration + startFrame-1;
}
Main();


