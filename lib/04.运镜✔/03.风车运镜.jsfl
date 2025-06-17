/**
 * @file: 03.风车运镜.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/16 14:01
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "promptUtil",
    "KeyFrameOperation",
    "EaseCurve",
    "Tween"
], function (checkUtil, log, promptUtil, kfo, curve, Tween) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { parseNumberWithMode } = promptUtil;
    const { convertToKeyframesSafety } = kfo;
    const { setEaseCurve } = curve;
    const { setTweenRotation } = Tween;

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

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline);
    if (frs === null) return;
    var firstLayer = layers[frs[0].layerIndex];
    var firstFrame = frs[0].startFrame;
    var endFrame = frs[0].endFrame;

    // endregion doc

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 旋转圈数
        var config = parseNumberWithMode(
            "输入旋转圈数（正顺负逆）:",
            2,
            "请输入合法的数字（正顺负逆）,例如：2、-3、4.5"
        );
        if (!config) return;

        const { num, num: motionTweenRotateTimes, mode, direction } = config;
        log.info("旋转圈数：" + num);
        log.info("旋转模式：" + mode);
        log.info("旋转方向：" + direction);

        var motionTweenRotate = direction >= 0 ? "clockwise" : "counter-clockwise";

        log.info("motionTweenRotate：" + motionTweenRotate);
        log.info("motionTweenRotateTimes：" + motionTweenRotateTimes);

        // note:确保选中的图层 是 第一层,这样可以保证，k帧一定在 镜头图层，而不用担心 其他图层的影响
        if (timeline.camera.cameraEnabled === false) {
            timeline.camera.cameraEnabled = true;
        } else if (timeline.camera.cameraEnabled === true) {
            timeline.currentLayer = 0;
        }

        // 选中的第一段的 (最开始，最后的) 转 关键帧
        var KEY_FRAMES = [firstFrame, endFrame];
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 补间动画
        // 获取allKeyFrames first,last
        var firstF = KEY_FRAMES[0];
        var lastF = KEY_FRAMES[KEY_FRAMES.length - 1];
        // 选中所有帧
        timeline.setSelectedFrames(firstF, lastF, true);

        timeline.createMotionTween();
        setEaseCurve(timeline, "Sine Ease-In-Out");

        // 设置旋转缓动
        setTweenRotation(timeline, motionTweenRotate, motionTweenRotateTimes);
    }

    Main();
});
