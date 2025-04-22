/**
 * @file: KeyFrameOperation.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 18:37
 * @project: AnJsflScript
 * @description:
 */

define(['KeyFrameQuery'], function(kfq) {
    const { getKeyFrames } = kfq;

    /**
     * 安全的转换为关键帧
     * 如果 需要转换的帧 已经是 关键帧，则不转换关键帧，以防止bug
     * @bug(当前帧已经是关键帧，再次转换会把下一帧也变成关键帧)
     * @param {Timeline} timeline 时间线
     * @param {number[]} keyFramesIndex 帧数组
     * @param {Layer|number} [selectedLayer = curLayer]选中的图层
     */
    function convertToKeyframesSafety(timeline, keyFramesIndex, selectedLayer) {
        if (timeline === undefined) {
            throw new Error(
                '在函数 Main 中，你重新定义了一个局部变量 timeline，这会导致局部变量覆盖全局变量'
            );
        }
        // timeline.convertToKeyframes(frame_1);
        var layers = timeline.layers; //图层
        var curLayerIndex = timeline.currentLayer; //当前图层索引
        var curLayer = layers[curLayerIndex]; //当前图层

        if (selectedLayer === undefined) {
            selectedLayer = curLayer;
        } else {
            selectedLayer = convertToLayer(layers, selectedLayer);
            var layerIndex = convertToLayerIndex(layers, selectedLayer);
            timeline.currentLayer = layerIndex;
        }

        var keyFrames = getKeyFrames(selectedLayer);

        for (var i = 0; i < keyFramesIndex.length; i++) {
            var fr = keyFramesIndex[i];
            if (keyFrames.includes(fr)) {
                continue;
            }
            timeline.convertToKeyframes(fr);
        }
    }

    // // k 帧
    // function KFrameOnlyOne(timeline, layers) {
    //     var CheckSelectedFrames;
    //     require(['checkUtil'], function(checkUtil) {
    //         CheckSelectedFrames = checkUtil.CheckSelectedFrames;
    //     });
    //     // 获取第一帧
    //     var frs = CheckSelectedFrames(timeline);
    //     if (frs === null) return;
    //     var firstLayer = layers[frs[0].layerIndex];
    //     var firstFrame = frs[0].startFrame;
    //
    //     // 关键帧
    //     var KEY_FRAMES = [firstFrame];
    //
    //     // 关键帧
    //     convertToKeyframesSafety(timeline, KEY_FRAMES);
    // }

    return {
        convertToKeyframesSafety: convertToKeyframesSafety,
        // convertToKeyframesAtFirstSelected: convertToKeyframesAtFirstSelected
    };
});
