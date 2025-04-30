/**
 * @file: 10.音量调节.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/24 13:21
 * @project: AnJsflScript
 * @description:
 */

// bug,FirstRun.jsfl 未运行
if (typeof require === "undefined") {
    var msg =
        "【温馨提示】请先运行FirstRun.jsfl,然后再尝试运行这个脚本。\n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}

// bug,Temp 未解压
if ($ProjectFileDir$.includes("AppData/Local/Temp")) {
    var msg = "【温馨提示】当前项目文件没有解压，请解压后再运行。 \n 作者：@穹的兔兔";
    fl.trace(msg);
    throw new Error(msg);
}
require(["checkUtil", "JSFLConstants"], function (
    { CheckDom: checkDom, CheckSelection: checkSelection },
    JSFLConstants
) {
    const MAX_CHANNEL = JSFLConstants.Numerics.sound.channel.MAX_CHANNEL;

    var doc = fl.getDocumentDOM(); //文档
    if (!checkDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    function Main() {
        // 检查选择的元件
        if (!checkSelection(selection, "selectElement", "No limit")) return;

        // var curFrame =
        //     timeline.layers[timeline.currentLayer].frames[curFrameIndex];
        //优先检查当前段上有没有音频文件
        var soundEnvelope = curFrame.getSoundEnvelope();
        if (soundEnvelope === null || soundEnvelope.length < 1) {
            alert("当前帧没有音频文件");
            return;
        }
        // fl.trace(soundEnvelope[0].leftChannel + "  " +soundEnvelope[0].rightChannel + "  " +soundEnvelope[0].mark + "  "  )

        var envelopeElement = soundEnvelope[0];
        var curVolume =
            ((envelopeElement.leftChannel + envelopeElement.rightChannel) /
                2 /
                MAX_CHANNEL) *
            100;
        curVolume = Math.ceil(curVolume);

        var inputPercent = prompt("请输入百分比 (0-100):", curVolume);
        if (inputPercent === null || inputPercent === "" || isNaN(Number(inputPercent))) {
            return;
        }
        inputPercent = parseInt(inputPercent);

        var setVolume = Math.floor((MAX_CHANNEL / 100) * inputPercent);

        var newSoundEnvelope = [
            {
                leftChannel: setVolume,
                rightChannel: setVolume,
                mark: envelopeElement.mark
            }
        ];
        // fl.trace(soundEnvelope[0].leftChannel + "  " +soundEnvelope[0].rightChannel + "  " +soundEnvelope[0].mark + "  "  )
        curFrame.setSoundEnvelope(newSoundEnvelope);
    }

    Main();
});
