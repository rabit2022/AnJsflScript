/**
 * @file: 06.一键回正.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/5 16:33
 * @project: WindowSWF-master
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
        
        for (var i = 0; i < selection.length; i++) {
            var angle = selection[i].rotation;
            // alert("当前选区的旋转角度为："+angle);
            doc.rotateSelection(-angle, "center");//旋转选区
        }
    }

    Main();
})();