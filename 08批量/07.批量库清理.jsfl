/**
 * @file: 07.批量库清理.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 15:10
 * @project: AnJsflScript
 * @description:
 */


(function () {
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


    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引

    function Main() {
        if (!checkDom()) {
            return;
        }

        var isClean = confirm("该操作会清理库中所有未使用的文件，是否继续？\n" + "穹的兔兔  提醒您：请谨慎操作，避免误删重要文件！尽量有备份文件。");
        if (!isClean) {
            return;
        }

        var unUsedItems = library.unusedItems;

        for (var i = 0; i < unUsedItems.length; i++) {
            var item = unUsedItems[i];
            // fl.trace(item.name);
            library.deleteItem(item.name);
        }

    }

    Main();
})();




