/**
 * @file: KeyFrameQuery.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 18:36
 * @project: AnJsflScript
 * @description:
 */

define(['SAT', 'Tips'], function (SAT, Tips) {
    const { FrameRange } = SAT;
    const { checkVariableRedeclaration } = Tips;

    /**
     * 获取选中元件的帧范围
     * @param {number[]} selectedFrames 选中帧数组 [layerIndex, startFrame, endFrame]
     * @return {FrameRange[]} 帧范围数组
     * @private
     */
    function wrapFrsFromSl(selectedFrames) {
        /**
         * 获取选中元件的帧范围
         * @type {FrameRange[]}
         */
        var frameRanges = [];
        for (var i = 0; i < selectedFrames.length; i += 3) {
            // fl.trace("选中元件：" + i);
            var layerIndex = selectedFrames[i];
            var startFrame = selectedFrames[i + 1];
            var endFrame = selectedFrames[i + 2];
            // i = i + 2;
            var fr = new FrameRange(layerIndex, startFrame, endFrame);
            frameRanges.push(fr);
        }
        return frameRanges;
    }

    /**
     * 获取选中元件的帧范围
     * var selectedFrames = timeline.getSelectedFrames();
     * @param {Timeline} timeline 时间线
     * @return {FrameRange[]} 帧范围数组
     */
    function getSelectedFrs(timeline) {
        checkVariableRedeclaration(timeline, 'timeline');
        var selectedFrames = timeline.getSelectedFrames();
        return wrapFrsFromSl(selectedFrames);
    }

    /**
     * 快速抽取关键帧索引-注意是索引， 不是frame对象
     * @param {Layer} layer 图层
     * @return {number[]} 关键帧索引数组
     * @see https://gitee.com/ninge/WindowSWF/tree/master/
     * @private
     */
    function getKeyFrames(layer) {
        var frames = layer.frames;

        /**
         * 关键帧数组
         * @type {number[]}
         */
        var keyFrames = [];
        for (var i = frames.length - 1; i >= 0; i--) {
            //情景模拟， 95  80  20  1 是关键帧
            //获取关键帧数
            var frame = frames[i]; //i=100
            var startFrame = frame.startFrame; //95
            i = startFrame; // 跳过 100-95序列
            keyFrames.push(startFrame); //95帧关键帧记录，//索引加1
        }
        keyFrames.sort(function (a, b) {
            return a - b;
        });
        return keyFrames;
    }

    /**
     * 获取关键帧 范围
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer|number} layer 图层
     * @param {number[]} keyFrames 关键帧索引数组
     * @return {FrameRange[]} 帧范围数组
     * @private
     */
    function wrapFrsFromKFs(layers, layer, keyFrames) {
        // 获取图层索引
        var layerIndex = convertToLayerIndex(layers, layer);

        /**
         * 关键帧范围数组
         * @type {FrameRange[]}
         */
        var keyFrameRanges = [];
        for (var i = 0; i < keyFrames.length; i++) {
            if (i + 1 >= keyFrames.length) continue;

            var startFrame = keyFrames[i];
            var endFrame = keyFrames[i + 1];
            // var layerIndex = layerIndex;
            var frameRange = new FrameRange(layerIndex, startFrame, endFrame);
            keyFrameRanges.push(frameRange);
        }
        return keyFrameRanges;
    }

    /**
     * 把 当前图层的关键帧  转为  FrameRange 对象。
     * @param {Array.<Layer>} layers 图层数组
     * @param {Layer} curLayer 当前图层
     * @return {FrameRange[]} 帧范围数组
     */
    function getKeyFrameRanges(layers, curLayer) {
        // 关键帧范围
        var keyFrames = getKeyFrames(curLayer);

        // 缺少最后一段，补上
        var lastKf = curLayer.frameCount; // 开区间
        keyFrames.push(lastKf);

        var keyFrameRanges = wrapFrsFromKFs(layers, curLayer, keyFrames);
        if (keyFrameRanges.length < 1) return null;

        return keyFrameRanges;
    }

    /**
     * 把  当前选中的帧范围  转为  关键帧中的  FrameRange 对象。
     * 要求  当前选中的范围  一定在某一个关键帧范围内，否则的话，只返回它最开始所在的FrameRange对象。
     * 相当于  只判断  选中范围的第一帧  在  关键帧范围内的  那个  FrameRange对象。
     * @param {FrameRange} selectedFrLittle 选中范围
     * @param {FrameRange[]} keyFrameRanges 关键帧范围数组
     * @return {FrameRange} 帧范围
     */
    function getKfrFromSlLittle(selectedFrLittle, keyFrameRanges) {
        var keyFr = null;
        for (var i = 0; i < keyFrameRanges.length; i++) {
            var keyFrameRange = keyFrameRanges[i];
            if (keyFrameRange.contain(selectedFrLittle)) {
                keyFr = keyFrameRange;
                break;
            }
        }
        return keyFr;
    }

    return {
        getSelectedFrs: getSelectedFrs,
        getKeyFrames: getKeyFrames,
        getKeyFrameRanges: getKeyFrameRanges,
        getKfrFromSlLittle: getKfrFromSlLittle
    };
});
