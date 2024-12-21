/**
 * @file: 08.智能交换.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/6 19:37
 * @project: WindowSWF-master
 * @description:
 */


(function () {
    function checkDom() {
        if (doc == null) {
            alert("请打开 [.fla] 文件");
            return false;
        }
        if (selection.length != 2) {
            alert("请选择两个元件");
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

        var elem1 = selection[0];
        var elem1Positon = new Point(elem1.x, elem1.y);
        var elem2 = selection[1];
        var elem2Positon = new Point(elem2.x, elem2.y);

        elem1.x = elem2Positon.x;
        elem1.y = elem2Positon.y;
        elem2.x = elem1Positon.x;
        elem2.y = elem1Positon.y;
    }

    Main();
})();

