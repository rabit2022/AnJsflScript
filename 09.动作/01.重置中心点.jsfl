/**
 * @file: 01.重置中心点.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/7 20:16
 * @project: WindowSWF-master
 * @description:
 */


function checkDom() {
    doc = fl.getDocumentDOM();//文档
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }

    selection = doc.selection;//选择
    library = doc.library;//库文件

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

/**
 * @type {Document}
 */
var doc;//文档

var selection;//选择
/**
 * @type {Library}
 */
var library;//库文件

function Main() {
    if (!checkDom()) {
        return;
    }

    
    for (var i = 0; i < selection.length; i++) {
        // 只选中一个元素
        // for (var j = 0; j < selection.length; j++) {
        //     var element = selection[j];
        //     element.selected = false;
        // }
        doc.selectNone();
        var item = selection[i];
        item.selected = true;
        
        
        var current = new Point(item.x, item.y);
        var r = doc.getSelectionRect();
        var center = new Point((r.left + r.right) / 2, (r.top + r.bottom) / 2);
        
        // var offset = current.sub(center);
        var offset = center.sub(current);
        
        item.setTransformationPoint(offset.toObj());
    }
    
    // 还原选择
    for (var j = 0; j < selection.length; j++) {
        var element = selection[j];
        element.selected = true;
    }
    


}

Main();

