/**
 * @file: 11.渐变消失.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/7/4 22:26
 * @project: AnJsflScript
 * @description:
 */

// @formatter:off
// prettier-ignore
"undefined"==typeof require&&fl.runScript(function(){var r=fl.scriptURI.match(/(?:^|.*[\/])(AnJsflScript(?:-[a-zA-Z0-9]+)?)(?=[\/]|$)/)[1],t=fl.scriptURI.match(r);if(t){var n=t[0],i=fl.scriptURI.lastIndexOf(n);return fl.scriptURI.substring(0,i+n.length)}throw new Error("Can't find project path ["+fl.scriptURI+"]")}()+"/config/require/CheckEnvironment.jsfl");
// @formatter:on

require(["checkUtil", "loglevel", "FilterDefinitions", "KeyFrameOperation", "JSFLConstants", "linqUtil",
    "EaseCurve"],
    function(checkUtil, log, fd, kfo, JSFLConstants,
             linqUtil,ec) {
        const { CheckDom, CheckSelection, CheckSelectedFrames, CheckSelectedLayers } = checkUtil;

        const { AdjustColorFilterBuilder } = fd.BUILDERS;
        const { convertToKeyframesSafety } = kfo;

        const { FRAME_1, FRAME_15 } = JSFLConstants.Numerics.frame.frameList;

        const { $addOffset } = linqUtil;
        const { setEaseCurveEx } = ec;

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
        var selectedFrames = CheckSelectedFrames(timeline);
        if (!selectedFrames) return;
        const { firstSlLayerIndex, firstSlFrameIndex, firstSlLayer, firstSlFrame } = selectedFrames;

        // 检查选择的元件
        if (!CheckSelection(selection, "selectElement", "No limit")) return;

        // // 检查选择的图层
        // var selectedLayers = CheckSelectedLayers(timeline, "No limit");
        // if (!selectedLayers) return;
        // endregion doc

        const FILTER = [
            new AdjustColorFilterBuilder().build()
        ];
        var KEY_FRAMES = [FRAME_1, FRAME_15];
        KEY_FRAMES = $addOffset(KEY_FRAMES, firstSlFrameIndex);

        const ALPHA_TRANSFORM = {
            mode: "Alpha",
            alphaPercent: 0
        };

        function Main() {

            convertToKeyframesSafety(timeline, KEY_FRAMES);

            firstSlLayer.setFiltersAtFrame(KEY_FRAMES[1], FILTER);
            firstSlLayer.setColorTransformAtFrame(KEY_FRAMES[1], ALPHA_TRANSFORM);

            setEaseCurveEx(timeline,KEY_FRAMES,"Classic Ease");
        }

        Main();
    });
