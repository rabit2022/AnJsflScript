/**
 * @file: 06.批量删帧.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 13:46
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

        var currentFrame = timeline.currentFrame;
        var startFrame = 0;
        var endFrame = timeline.frameCount;

        var direction = prompt("请输入方向：空格-向前删除 右-向后删除", "右");
        if (direction == null || direction === "") {
            alert("请输入正确的方向！");
            return;
        }

        var END_FRAME = 0;
        if (direction === " ") {
            END_FRAME = startFrame;
        } else if (direction === "右") {
            END_FRAME = endFrame;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            timeline.setSelectedLayers(i, true);
            // 删除所有帧
            timeline.removeFrames(currentFrame, END_FRAME);
        }

        // 回到最开始选择的帧
        timeline.currentFrame = currentFrame;

        // select None
        timeline.setSelectedFrames([0, 0, 0], true);
    }

    Main();
})();