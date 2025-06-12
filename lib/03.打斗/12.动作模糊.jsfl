/**
 * @file: 12.动作模糊.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/12 16:43
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
    "FilterDefinitions",
    "JSFLConstants",
    "linqUtil","KeyFrameOperation","FramesSelect"
], function (checkUtil, log, fd, JSFLConstants, 
             linqUtil,kfo,fms) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { BlurFilterBuilder } = fd.BUILDERS;

    const { FRAME_1, FRAME_2, FRAME_3, FRAME_4 } = JSFLConstants.Numerics.frame.frameList;
    const { $addOffset } = linqUtil;
    
    const { convertToKeyframesSafety } = kfo;
    const { SelectStartFms } = fms;

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

    // 获取第一帧
    var frs = CheckSelectedFrames(timeline, "请选择需要添加模糊的帧！");
    if (!frs) return;
    const { firstSlLayerIndex, firstSlFrameIndex } = frs;

    // endregion doc

    var KEY_FRAMES = [FRAME_1, FRAME_2, FRAME_3, FRAME_4];
    KEY_FRAMES = $addOffset(KEY_FRAMES, firstSlFrameIndex);
    log.info("KEY_FRAMES", KEY_FRAMES);

    var BLUR = [10, 30, 50, null];
    var builder = new BlurFilterBuilder().setQuality("medium");
    var FILTERS = [
        builder.clone().setBlur(BLUR[0]).build(),
        builder.clone().setBlur(BLUR[1]).build(),
        builder.clone().setBlur(BLUR[2]).build(),
        null
    ];
    log.info("模糊滤镜列表");
    FILTERS.forEach(function (filter) {
        log.info(filter);
    });

    function Main() {
        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // 请勿选择多个图层！
        var totalLayers = frs.getUniqueLayerIndexes();
        if (totalLayers.length > 1) {
            alert("请勿选择多个图层！");
            return;
        }
        timeline.currentLayer = totalLayers[0];
        
        // 关键帧
        convertToKeyframesSafety(timeline, KEY_FRAMES);

        // 添加滤镜
        for (var i = 0; i < KEY_FRAMES.length; i++) {
            var frameIndex = KEY_FRAMES[i];
            var filter = FILTERS[i];
            log.info(frameIndex, filter);
            if (filter) {
                curLayer.setFiltersAtFrame(frameIndex, [filter]);
            }
        }

        // 重置选择
        SelectStartFms(timeline, frs);
    }

    Main();
});
