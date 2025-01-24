/**
 * @file: 11.批量改帧长.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/8 15:29
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

    function getMode() {
        var pr = promptUtil.parseNumberWithSign("请输入关键帧持续帧数（“+3”为增加，“-3”为减少，无符号“3”为统一）", 30, "请输入合法的数字，例如“+3”或“-3”或“3”");
        if (pr === null) return;
        var {num, hasSign} = pr;

        var mode = "unifiy";
        if (hasSign) {
            mode = "increase";
            if (num < 0) {
                mode = "decrease";
                num = Math.abs(num);
            }
        }
        return {num: num, mode: mode};
    }

    function Main() {
        if (!checkDom()) {
            return;
        }


        var {num, mode} = getMode();
        // print("关键帧持续帧数：" + num + "，模式：" + mode);

        // 选中的帧范围
        var selectedFrs = frUtil.getSelectedFrs(timeline);
        for (var i = 0; i < selectedFrs.length; i++) {
            // 某一个图层的 选中的帧范围
            var selectedFr = selectedFrs[i];
            // 某一个图层的 关键帧范围 列表
            var keyFrameRanges = frUtil.getKeyFrameRanges(timeline, selectedFr);

            // 选中范围 包含的 关键帧范围
            var keyFr = frUtil.getKfrFromSlLittle(selectedFr, keyFrameRanges);
            if (keyFr == null) continue;
            // fl.trace("选中范围：" + keyFr.toString());

            // 设置选中图层
            timeline.setSelectedLayers(keyFr.layerIndex, true);

            // 删减关键帧，增加关键帧
            switch (mode) {
                case "increase":
                    timeline.insertFrames(num, false, keyFr.endFrame);
                    break;
                case "decrease":
                    var startFrame = keyFr.startFrame;
                    var endFrame = keyFr.startFrame + num - 1;
                    timeline.removeFrames(startFrame, endFrame);
                    break;
                case "unifiy":
                    if (keyFr.duration === num) {
                        continue;
                    } else if (keyFr.duration > num) {
                        var toRemoveFrames = keyFr.duration - num;
                        var startFrame = keyFr.startFrame + toRemoveFrames;
                        var endFrame = keyFr.endFrame;
                        timeline.removeFrames(startFrame, endFrame);
                    } else if (keyFr.duration < num) {
                        var toAddFrames = num - keyFr.duration;
                        timeline.insertFrames(toAddFrames, false, keyFr.startFrame);
                    }
                    break;
                default:
                    throw new Error("未知模式：" + mode);
            }
        }

        // select None
        SelectNoneTl(timeline);
    }

    Main();
})();


