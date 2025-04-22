/**
 * @file: FramesSelect.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/21 23:31
 * @project: AnJsflScript
 * @description:
 */


define(function() {
    /**
     *
     * 不选中时间轴中的所有帧
     * @param {Timeline} timeline
     */
    function SelectNoneFms(timeline) {
        // select None
        timeline.setSelectedFrames([0, 0, 0], true);
    }

    /**
     * 选中时间轴中的所有帧
     * @param {Timeline} timeline
     */
    function SelectAllFms(timeline) {
        // select All
        timeline.setSelectedFrames(0, timeline.frameCount - 1, true);
    }
    return {
        SelectNoneFms: SelectNoneFms,
        SelectAllFms: SelectAllFms
    };
});