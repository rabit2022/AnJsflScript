/**
 * @file: FramesSelect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 23:31
 * @project: AnJsflScript
 * @description:
 */

define(['Tips'], function (Tips) {
    const { checkVariableRedeclaration } = Tips;

    /**
     *
     * 不选中时间轴中的所有帧
     * @param {Timeline} timeline
     */
    function SelectNoneFms(timeline) {
        checkVariableRedeclaration(timeline, 'timeline');

        // select None
        timeline.setSelectedFrames([0, 0, 0], true);
    }

    /**
     * 选中时间轴中的所有帧
     * @param {Timeline} timeline
     */
    function SelectAllFms(timeline) {
        checkVariableRedeclaration(timeline, 'timeline');

        // select All
        timeline.setSelectedFrames(0, timeline.frameCount - 1, true);
    }

    /**
     * 重置选中帧
     * @param {Timeline} timeline 时间线
     * @param {FrameRange[]} frs 帧范围数组
     */
    function SelectStartFms(timeline, frs) {
        checkVariableRedeclaration(timeline, 'timeline');

        SelectNoneFms(timeline);
        for (var i = 0; i < frs.length; i++) {
            var fr = frs[i];

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
