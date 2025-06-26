/**
 * @file: KeyFrameOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 18:37
 * @project: AnJsflScript
 * @description:
 */

define(["Tips", "LayerQuery", "FrameQuery", "Context", "FrameChecker"], function (
    tips,
    lq,
    fq,
    Context,
    fc
) {
    // const { getKeyFrames } = kfq;
    const { checkVariableRedeclaration } = tips;
    const { convertToLayerIndex, convertToLayer } = lq;
    const { convertToFrameIndex, convertToFrame } = fq;
    const { IsNoneFrame } = fc;

    /**
     * 安全的转换为关键帧
     * @note 如果 需要转换的帧 已经是 关键帧，则不转换关键帧，以防止 bug    2025/04/22
     * @note bug:当前帧已经是关键帧，再次转换会把下一帧也变成关键帧  2025/04/22
     * @note 现在会 先选中当前图层，当前帧，再转换为关键帧  2025/06/05
     * @param {Timeline} timeline 时间线
     * @param {number[]|number|Frame|Frame[]} frameIndexs 帧数组
     * @param {Layer|number} [selectedLayer = curLayer]选中的图层
     */
    function convertToKeyframesSafety(timeline, frameIndexs, selectedLayer) {
        // 重复定义
        checkVariableRedeclaration(timeline, "timeline");

        // region context
        var context = new Context();
        context.update();
        context.setTimeline(timeline);
        const { frames, layers, curLayer, keyframeIndexes } = context;
        // endregion context

        // region frameIndexs处理
        // 转为数组
        if (!Array.isArray(frameIndexs)) {
            frameIndexs = [frameIndexs];
        }

        // 转为number[]
        frameIndexs = frameIndexs.map(function (frame) {
            return convertToFrameIndex(frames, frame);
        });
        // endregion frameIndexs处理

        // region selectedLayer处理
        // 设置选中的图层
        if (selectedLayer === undefined) {
            selectedLayer = curLayer;
        } else {
            selectedLayer = convertToLayer(layers, selectedLayer);

            var layerIndex = convertToLayerIndex(layers, selectedLayer);
            timeline.currentLayer = layerIndex;
        }
        // endregion selectedLayer处理

        // console.log(keyframeIndexes);

        for (var i = 0; i < frameIndexs.length; i++) {
            var frameIndex = frameIndexs[i];

            // 已经是关键帧，则跳过
            if (keyframeIndexes.includes(frameIndex)) {
                continue;
            }
            // 是否无效帧
            if (IsNoneFrame(selectedLayer, frameIndex)) {
                continue;
            }

            timeline.setSelectedFrames(frameIndex, frameIndex + 1);
            timeline.convertToKeyframes(frameIndex);
        }
    }

    // k 帧
    /**
     * 只选择一个帧时，自动创建关键帧
     * @param {Timeline} timeline 时间线
     * @param {Layer|number} [layer] 选中的图层
     */
    function KFrameOnlyOne(timeline, layer) {
        checkVariableRedeclaration(timeline, "timeline");

        var CheckSelectedFrames;
        require(["checkUtil"], function (checkUtil) {
            CheckSelectedFrames = checkUtil.CheckSelectedFrames;
        });
        var layers = timeline.layers; //图层

        // 获取第一帧
        var frs = CheckSelectedFrames(timeline);
        if (frs === null) return;
        // 只有一个帧时，自动创建关键帧
        if (frs.length > 1 || frs[0].duration > 1) return;
        // console.log(frs.length, frs[0].duration);

        var firstLayer = layers[frs[0].layerIndex];
        if (layer) {
            firstLayer = layer;
        }
        var firstFrame = frs[0].startFrame;

        // 关键帧
        var KEY_FRAMES = [firstFrame];
        // console.log(KEY_FRAMES);

        // 关键帧
        convertToKeyframesSafety(timeline, KEY_FRAMES, firstLayer);
    }

    return {
        convertToKeyframesSafety: convertToKeyframesSafety,
        KFrameOnlyOne: KFrameOnlyOne
    };
});
