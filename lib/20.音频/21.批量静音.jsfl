/**
 * @file: 03.批量静音.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/26 16:21
 * @project: AnJsflScript
 * @description:
 * @see:    lib\00.快捷✔️\10.音量调节.jsfl
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
require(["checkUtil", "loglevel", "KeyFrameMode", "JSFLConstants"], function (
    checkUtil,
    log,
    KeyFrameMode,
    JSFLConstants
) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;
    // const MAX_CHANNEL = JSFLConstants.Numerics.sound.channel.MAX_CHANNEL;
    const MIN_CHANNEL = JSFLConstants.Numerics.sound.channel.MIN_CHANNEL;

    // region doc
    var doc = CheckDom(); //文档
    if (doc === null) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧
    // endregion doc

    function silentFrame(curFrame) {
        //优先检查当前段上有没有音频文件
        var soundEnvelope = curFrame.getSoundEnvelope();
        if (soundEnvelope === null || soundEnvelope.length < 1) {
            // alert('当前帧没有音频文件');
            return;
        }

        var envelopeElement = soundEnvelope[0];
        var newSoundEnvelope = [
            {
                leftChannel: MIN_CHANNEL,
                rightChannel: MIN_CHANNEL,
                mark: envelopeElement.mark
            }
        ];
        curFrame.setSoundEnvelope(newSoundEnvelope);
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        var mode = KeyFrameMode();
        if (!mode) return;
        mode.forEach(function (item) {
            var { frame } = item;
            silentFrame(frame);
        });
    }

    Main();
});
