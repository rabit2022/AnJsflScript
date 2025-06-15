/**
 * @file: #00.当前图层有几个音频.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/3/18 20:51
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof AnJsflScript=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on
require(["checkUtil", "loglevel", "KeyFrameQuery", "LayerChecker"], function (
    checkUtil,
    log,
    kfq,
    lc
) {
    const { CheckDom, CheckSelection } = checkUtil;
    const { getKeyFrameRanges } = kfq;
    const { hasSound } = lc;

    var doc = fl.getDocumentDOM(); //文档
    if (!CheckDom(doc)) return;

    var selection = doc.selection; //选择
    var library = doc.library; //库文件
    var timeline = doc.getTimeline(); //时间轴

    var layers = timeline.layers; //图层
    var curLayerIndex = timeline.currentLayer; //当前图层索引
    var curLayer = layers[curLayerIndex]; //当前图层

    var curFrameIndex = timeline.currentFrame; //当前帧索引
    var curFrame = curLayer.frames[curFrameIndex]; //当前帧

    function getKeyFrameSoundName(layer, startFrame, endFrame) {
        if (startFrame === undefined) startFrame = 0;
        if (endFrame === undefined) endFrame = layer.frames.length - 1;

        // for (var f = 0; f < layer.frames.length; f++) {
        for (var f = startFrame; f <= endFrame; f++) {
            var frame = layer.frames[f];
            // undefined 可能是因为 空白帧
            if (frame === undefined) continue;
            // if (frame.getSoundEnvelope()) {
            if (frame.soundLibraryItem) {
                return frame.soundName; // 发现声音对象
            }
        }
        return null; // 没有声音对象
    }

    function getKeyFrameSoundRange(layer, startFrame, endFrame) {
        if (startFrame === undefined) startFrame = 0;
        if (endFrame === undefined) endFrame = layer.frames.length - 1;

        // for (var f = 0; f < layer.frames.length; f++) {
        for (var f = startFrame; f <= endFrame; f++) {
            var frame = layer.frames[f];
            // undefined 可能是因为 空白帧
            if (frame === undefined) continue;
            // if (frame.getSoundEnvelope()) {
            if (frame.soundLibraryItem) {
                return frame.getSoundEnvelopeLimits(); // 发现声音对象
            }
        }
        return null; // 没有声音对象
    }

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 获取当前图层的音频数量

        // 1, 判断当前图层是否有音频
        var IsHasSound = hasSound(curLayer);
        if (!IsHasSound) {
            console.info("当前图层没有音频");
            return;
        }

        log.info("当前图层 %s 音频", IsHasSound ? "有" : "没有");

        // 2, 获取当前图层的关键帧列表
        // 注意，我发现每个关键帧上只能放一个音频,每次拖入新的音频时，都会添加新的关键帧 。
        // 所以这里只需要判断关键帧是否有音频即可。
        var keyFrames = getKeyFrameRanges(layers, curLayer);
        if (!keyFrames) {
            console.info("当前图层没有关键帧");
            return;
        }

        log.info("当前图层关键帧数量 %d", keyFrames.length);
        log.info("当前图层关键帧列表 ", keyFrames);

        // 3, 判断每一段关键帧是否有音频
        var soundObjs = {};
        keyFrames.forEach(function (keyFrame) {
            var hasSound = hasSound(curLayer, keyFrame.startFrame, keyFrame.endFrame);
            // log.info(hasSound ? '有' : '没有');

            var soundName = LayerManager.getKeyFrameSoundName(
                curLayer,
                keyFrame.startFrame,
                keyFrame.endFrame
            );

            var soundRange = LayerManager.getKeyFrameSoundRange(
                curLayer,
                keyFrame.startFrame,
                keyFrame.endFrame
            );

            if (soundRange) {
                log.info("range %d-%d", soundRange.start, soundRange.end);
                if (soundRange.start === 0 && soundRange.end === 0) {
                    hasSound = false;
                }
            }

            // log.info('音频名称 %s', soundName);
            console.info(
                "关键帧 %d-%d 帧之间, %s 音频,  %s",
                keyFrame.startFrame,
                keyFrame.endFrame,
                hasSound ? "有" : "没有",
                hasSound && soundName ? soundName : ""
            );
            if (hasSound) {
                soundObjs[keyFrame.startFrame + "-" + keyFrame.endFrame] = soundName;
            }
        });

        console.info("当前图层关键帧音频数量 %d", Object.keys(soundObjs).length);

        // console.info('当前图层关键帧音频列表 ', soundObjs);

        // 4, bug,判断音频并不准确，没有好的办法

        // frame.getSoundEnvelope()
        // console.info('当前帧音频 %s', curFrame.getSoundEnvelope());
    }

    Main();
});
