/**
 * @file: FramesSelect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 23:31
 * @project: AnJsflScript
 * @description:
 */

define(["Tips", "SAT"], function (Tips, SAT) {
    const { checkVariableRedeclaration } = Tips;
    const { FrameRange } = SAT;
    const { IsFrameRangeLike } = SAT.CHECk;

    /**
     *
     * 不选中时间轴中的所有帧
     * @param {Timeline} timeline
     */
    function SelectNoneFms(timeline) {
        checkVariableRedeclaration(timeline, "timeline");

        // select None
        timeline.setSelectedFrames([0, 0, 0], true);
    }
    /**
     * 选中时间轴中的所有帧
     * @param {Timeline} timeline 时间轴对象
     * @param {FrameRange|FrameRangeLike|Number|Array.<Number|FrameRange|FrameRangeLike>} [selectFrames] 选中的帧
     */
    function SelectAllFms(timeline, selectFrames) {
        checkVariableRedeclaration(timeline, "timeline");

        // 递归处理选中帧
        function selectFramesRecursively(frames) {
            if (frames === undefined) {
                // 选中所有帧
                timeline.setSelectedFrames(0, timeline.frameCount - 1, true);
            } else if (typeof frames === "number" || frames instanceof Number) {
                // 选中单个帧
                timeline.setSelectedFrames(frames, frames + 1, true);
            } else if (IsFrameRangeLike(frames)) {
                // 选中帧范围
                timeline.setSelectedFrames(frames.startFrame, frames.endFrame, true);
            } else if (frames instanceof Array) {
                // 递归处理数组中的每个元素
                frames.forEach(function (frame) {
                    selectFramesRecursively(frame);
                });
            } else {
                throw new Error("Invalid type for selectFrames: " + typeof frames);
            }
        }

        // 调用递归函数处理 selectFrames
        selectFramesRecursively(selectFrames);
    }

    /**
     * 重置选中帧
     * @param {Timeline} timeline 时间线
     * @param {FrameRange[]} startFrs 帧范围数组
     */
    function SelectStartFms(timeline, startFrs) {
        checkVariableRedeclaration(timeline, "timeline");

        SelectNoneFms(timeline);
        for (var i = 0; i < startFrs.length; i++) {
            var fr = startFrs[i];

            var frArray = fr.toArray();
            timeline.setSelectedFrames(frArray, false);
        }
    }

    return {
        SelectNoneFms: SelectNoneFms,
        SelectAllFms: SelectAllFms,
        SelectStartFms: SelectStartFms
    };
});
