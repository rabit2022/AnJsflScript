/**
 * @file: 11.批量改帧长.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 15:29
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
        // if (selection.length === 1) {
        //     alert("请选择至少两个元件");
        //     return false;
        // }
        return true;
    }


    function KeyframeDurationHandler(input) {
        this.defaultDuration = 30;
        this.mode = "normal";
        // 确定增加、减少或统一持续帧数
        const sign = input[0];
        const number = parseInt(input, 10);
        if (isNaN(number)) {
            alert("请输入合法的数字");
            return;
        }

        // 绝对值
        this.defaultDuration = Math.abs(number);
        switch (sign) {
            case '+':
                this.mode = "increase";
                break;
            case '-':
                this.mode = "decrease";
                break;
            default:
                this.mode = "normal";
                break;
        }
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

        var msg = prompt("请输入关键帧持续帧数（“+3”为增加，“-3”为减少，无符号“3”为统一）", 30);
        if (msg == null || msg === "") {
            alert("请输入合法的关键帧持续帧数");
            return;
        }

        var kdh = new KeyframeDurationHandler(msg);

        // 选中的帧范围
        var selectedFrames = timeline.getSelectedFrames();
        if (selectedFrames.length < 1) {
            alert("请选择要调整长度的关键帧或图层！");
            return;
        }
        var selectedFrs = wrapSelectedFrames(selectedFrames);
        // fl.trace("==============================");

        for (var i = 0; i < selectedFrs.length; i++) {
            var selectedFr = selectedFrs[i];

            // 关键帧范围
            var layer = layers[selectedFr.layerIndex];
            var keyFrames = getKeyFrames(layer);
            var keyFrameRanges = wrapKeyFrames(selectedFr.layerIndex, keyFrames);
            if (keyFrameRanges.length < 1) {
                continue;
            }

            // 选中范围 包含在 关键帧范围中
            var keyFr = selectedFr.Contains(keyFrameRanges);
            if (keyFr == null) {
                continue;
            }
            // fl.trace("选中范围：" + keyFr.toString());

            // 设置选中图层
            timeline.setSelectedLayers(keyFr.layerIndex, true);

            // 删减关键帧，增加关键帧
            if (kdh.mode === "increase") {
                // fl.trace("增加关键帧持续帧数：" + kdh.defaultDuration);
                var toAddFrames = kdh.defaultDuration;
                if (toAddFrames > 0) {
                    // fl.trace("需要增加 " + toAddFrames + " 帧");
                    timeline.insertFrames(toAddFrames, false, keyFr.endFrame);
                }
            } else if (kdh.mode === "decrease") {
                // fl.trace("减少关键帧持续帧数：" + kdh.defaultDuration);
                var toRemoveFrames = kdh.defaultDuration;
                if (toRemoveFrames > 0) {
                    var startFrame = keyFr.startFrame;
                    var endFrame = keyFr.startFrame + toRemoveFrames - 1;
                    timeline.removeFrames(startFrame, endFrame);
                }
            } else {
                // fl.trace("统一关键帧持续帧数：" + kdh.defaultDuration);
                if (keyFr.duration > kdh.defaultDuration) {
                    var toRemoveFrames = keyFr.duration - kdh.defaultDuration;
                    var startFrame = keyFr.startFrame + toRemoveFrames;
                    var endFrame = keyFr.endFrame;
                    timeline.removeFrames(startFrame, endFrame);
                } else if (keyFr.duration < kdh.defaultDuration) {
                    var toAddFrames = kdh.defaultDuration - keyFr.duration;
                    timeline.insertFrames(toAddFrames, false, keyFr.startFrame);
                }
            }
        }

        // select None
        timeline.setSelectedFrames([0, 0, 0], true);
    }
    Main();
})();


