/**
 * @file: 摇头动作.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/24 21:49
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
(function(){const m=fl.scriptURI.match(/AnJsflScript(?:-[a-zA-Z0-9]+)?/);if(!m)throw new Error("Can't find project path ["+fl.scriptURI+"]");const i=fl.scriptURI.lastIndexOf(m[0]);const p=fl.scriptURI.substring(0,i+m[0].length);typeof require=="undefined"&&fl.runScript(p+"/config/require/CheckEnvironment.jsfl")})();
// @formatter:on

require([
    "checkUtil",
    "loglevel",
    "KeyFrameOperation",
    "SAT",
    "EaseCurve",
    "store-js"
], function (checkUtil, log, kfo, sat, es, store) {
    const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } =
        checkUtil;

    // const { getFrameCount } = eq;
    const { convertToKeyframesSafety } = kfo;
    const { setClassicEaseCurve } = es;

    const { Transform, Vector } = sat;

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
    // const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // 检查选择的元件
    if (!CheckSelection(selection, "selectElement", "No limit")) return;

    // // 检查选择的图层
    // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
    // if (!selectedLayers) return;
    // endregion doc

    const HEAD_LAYER_INDEX = 0;
    const EMOTION_LAYER_INDEX = 1;
    const SHAKE_LAYER_INDEX = 2;

    const HEAD_LAYER = layers[HEAD_LAYER_INDEX];
    const EMOTION_LAYER = layers[EMOTION_LAYER_INDEX];
    const SHAKE_LAYER = layers[SHAKE_LAYER_INDEX];

    const ns_store = store.namespace("11-组装万能头");

    function shakeHead(
        HALF_MOTION_FRAME,
        frameIndex,
        shakeIntensity,
        headDirection,
        shakeMode
    ) {
        // 关键帧：3,6
        var KEY_FRAMES = [HALF_MOTION_FRAME, frameIndex];
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // @note:08.丝滑摇头.jsfl
        var HALF_MOTION_ELEMENT = HEAD_LAYER.frames[HALF_MOTION_FRAME].elements[0];
        var tr = new Transform(HALF_MOTION_ELEMENT).setPosition(
            new Vector(headDirection * shakeIntensity, shakeIntensity)
        );

        switch (shakeMode) {
            case "traditional":
                // 传统摇头
                break;
            case "smooth":
                // 平滑摇头
                timeline.setSelectedFrames(
                    frameIndex,
                    frameIndex + MOTION_FRAME_COUNT - 1
                );
                setClassicEaseCurve(timeline);
                break;
            default:
                throw new Error("Invalid shake mode: " + shakeMode);
        }
    }

    function Main() {
        const ElementPosition = ns_store.get("ElementPosition");
        const MAX_MOTION_FRAME_COUNT = ns_store.get("MAX_MOTION_FRAME_COUNT");
        const config = ns_store.get("config");
        if (!ElementPosition || !MAX_MOTION_FRAME_COUNT || !config) {
            alert("[摇头动作]    请先运行脚本  11.组装万能头.jsfl");
            return;
        }

        // region test
        // var config = {
        //     shakeIntensity: 3,
        //     motionFrameCount: 6,
        //     headDirection: -1,
        //     shakeMode: "traditional",
        //     frameSelector: "keyFrame"
        // };
        //
        // // var headconfig = {
        // //     head: layers[1].frames[0].elements[0], expression: layers[0].frames[0].elements[0]
        // // };
        // // const { head, expression } = headconfig;
        // const MAX_MOTION_FRAME_COUNT = 300;
        // endregion test

        const {
            shakeIntensity,
            motionFrameCount,
            headDirection,
            shakeMode,
            frameSelector
        } = config;

        // 每一个表情的帧数:6
        const MOTION_FRAME_COUNT = motionFrameCount;
        const HALF_MOTION_FRAME_COUNT = parseInt(MOTION_FRAME_COUNT / 2);
        // 所有表情的总帧数:60
        // const MAX_MOTION_FRAME_COUNT = getFrameCount(expression);
        // 6, 12, 18,...
        for (
            var frameIndex = MOTION_FRAME_COUNT;
            frameIndex < MAX_MOTION_FRAME_COUNT;
            frameIndex += MOTION_FRAME_COUNT
        ) {
            // 中间帧：3，9，15，...
            var HALF_MOTION_FRAME = frameIndex - HALF_MOTION_FRAME_COUNT;

            shakeHead(
                HALF_MOTION_FRAME,
                frameIndex,
                shakeIntensity,
                headDirection,
                shakeMode
            );
        }

        // 这里是由于   关键帧：3,6  而导致  最后的帧数不足6帧
        var lastFrameIndex = frameIndex;
        // 295,300
        var LAST_HALF_MOTION_FRAME = lastFrameIndex - HALF_MOTION_FRAME_COUNT;
        if (LAST_HALF_MOTION_FRAME < MAX_MOTION_FRAME_COUNT) {
            shakeHead(
                LAST_HALF_MOTION_FRAME,
                lastFrameIndex,
                shakeIntensity,
                headDirection,
                shakeMode
            );

            // 多加了一帧
            var shake_layer_frames = SHAKE_LAYER.frameCount;
            if (shake_layer_frames > MAX_MOTION_FRAME_COUNT) {
                // 301,300
                var offset = shake_layer_frames - MAX_MOTION_FRAME_COUNT;
                // var startFrame = MAX_MOTION_FRAME_COUNT-1;
                var startFrame = shake_layer_frames - offset - 1;
                // convertToKeyframesSafety(timeline, startFrame);
                // 299,300
                timeline.removeFrames(startFrame, shake_layer_frames - 1);
            }
        }
    }

    Main();
});
