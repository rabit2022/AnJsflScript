/**
 * @file: 10.音量调节.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/24 13:21
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on
require(["checkUtil", "JSFLConstants"], function (checkUtil, JSFLConstants) {
    const MAX_CHANNEL = JSFLConstants.Numerics.sound.channel.MAX_CHANNEL;

    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    // region doc
    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var frames = curLayer.frames; //当前图层的帧列表
    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = frames[curFrameIndex]; //当前帧

    // // 获取第一帧
    // var selectedFrames = CheckSelectedFrames(timeline);
    // if (!selectedFrames) return;
    // const { firstSlLayerIndex, firstSlFrameIndex } = selectedFrames;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    function Main() {
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
