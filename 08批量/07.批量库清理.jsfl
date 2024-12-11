/**
 * Created with JetBrains Rider.
 * User: admin
 * Date: 2024/12/8
 * Time: 14:58
 * To change this template use File | Settings | File Templates.
 */


function checkDom() {
    if (doc == null) {
        alert("请打开 [.fla] 文件");
        return false;
    }

    // if (selection.length < 1) {
    //     alert("请选择元件？");
    //     return false;
    // }
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


var doc=fl.getDocumentDOM();//文档
var selection = doc.selection;//选择
var library=doc.library;//库文件

var timeline=doc.getTimeline();//时间轴
var layers=timeline.layers;//图层

function Main() {
    if (!checkDom()) {
        return;
    }
    
    var isClean = confirm("该操作会清理库中所有未使用的文件，是否继续？");
    if (!isClean) {
        return;
    }

    var unUsedItems =library.unusedItems;

    for (var i = 0; i < unUsedItems.length; i++) {
        var item = unUsedItems[i];
        // fl.trace(item.name);
        library.deleteItem(item.name);
    }

}
Main();




