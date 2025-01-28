/**
 * @file: 03.批量图层.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 13:29
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

        var LAYER_NAME_ARRAY = [
            // "摄像机", 
            "特效1", "特效2",
            "角色1", "角色2", "角色3", "角色4", "角色5", "角色6",
            "背景", "配音",
            "音效1", "音效2"];

        for (var i = 0; i < LAYER_NAME_ARRAY.length; i++) {
            // var layer = layers[i];
            var toAddLayerName = LAYER_NAME_ARRAY[i];
            if (!layerUtil.IsLayerExists(timeline, toAddLayerName)) {
                timeline.addNewLayer(toAddLayerName, "normal", false);
            }
        }
    }

    Main();
})();
