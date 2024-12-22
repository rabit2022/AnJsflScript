/**
 * @file: 05.元件分身.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 16:33
 * @project: AnJsflScript
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }
        if (selection.length < 1) {
            alert("请选择元件？");
            return false;
        }
        if (selection.length > 1) {
            alert("请选择单个元件");
            return false;
        }
        return true;
    }

    var doc = fl.getDocumentDOM();//文档
    var selection = doc.selection;//选择
    var library = doc.library;//库文件

    var timeline = doc.getTimeline();//时间轴
    var layers = timeline.layers;//图层
    var curFrameIndex = timeline.currentFrame;//当前帧索引


    function PackSymbol() {
        // 元件编辑模式
        doc.enterEditMode("inPlace");
        doc.selectAll();
        var selection = doc.selection;
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            // symbol: 打散
            if (ele.IsSymbol(item)) {
                // 打散
                doc.breakApart();
                doc.group();
            } else {
                // break;
                continue;
            }

            PackSymbol();
        }
        doc.exitEditMode();
    }

    function Main() {
        if (!checkDom()) {
            return;
        }

        ele.CopySymbol(selection[0],"ask");

        PackSymbol();
    }

    Main();
})();
