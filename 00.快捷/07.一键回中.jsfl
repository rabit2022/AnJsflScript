/**
 * @file: 07.一键回中.jsfl
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

        // 获取屏幕的宽高
        var screenWidth = doc.width;
        var screenHeight = doc.height;
        var screenCenterPoint = new Point(screenWidth / 2, screenHeight / 2);

        // 获取选中内容的边界
        var boundsCenterPoint = wrapRect(doc.getSelectionRect()).center();

        // 计算偏移量
        var offset = screenCenterPoint.sub(boundsCenterPoint);

        // 移动所有选中的元件到屏幕中心
        doc.moveSelectionBy(offset.toObj());
    }

    Main();
})();

