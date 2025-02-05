﻿/**
 * @file: 10.音量调节.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/24 13:21
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

    // var MAX_CHANNEL = 32768;

    function Main() {
        if (!checkDom()) {
            return;
        }

        var curFrame = timeline.layers[timeline.currentLayer].frames[curFrameIndex];
        //优先检查当前段上有没有音频文件
        var soundEnvelope = curFrame.getSoundEnvelope();
        if (soundEnvelope.length < 1) {
            alert("当前帧没有音频文件");
            return;
        }
        // fl.trace(soundEnvelope[0].leftChannel + "  " +soundEnvelope[0].rightChannel + "  " +soundEnvelope[0].mark + "  "  )

        var envelopeElement = soundEnvelope[0];
        var curVolume = (envelopeElement.leftChannel + envelopeElement.rightChannel) / 2 / MAX_CHANNEL * 100;
        curVolume = Math.ceil(curVolume);

        var inputPercent = prompt("请输入百分比 (0-100):", curVolume);
        if (inputPercent === null || inputPercent === "" || isNaN(Number(inputPercent))) {
            return;
        }
        inputPercent = parseInt(inputPercent);


        var setVolume = Math.floor(MAX_CHANNEL / 100 * inputPercent)

        var newSoundEnvelope = [
            {leftChannel: setVolume, rightChannel: setVolume, mark: envelopeElement.mark}
        ]
        // fl.trace(soundEnvelope[0].leftChannel + "  " +soundEnvelope[0].rightChannel + "  " +soundEnvelope[0].mark + "  "  )
        curFrame.setSoundEnvelope(newSoundEnvelope)
    }

    Main();
})();

