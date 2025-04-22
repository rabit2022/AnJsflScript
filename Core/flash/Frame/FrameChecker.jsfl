/**
 * @file: FrameChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 23:42
 * @project: AnJsflScript
 * @description:
 */

define(['FUNC'], function (FUNC) {
    const { IsEmpty } = FUNC;

    /**
     * 检查帧是否为空
     * @param {Frame} frame 要检查的帧
     * @return {Boolean} 帧是否为空
     * @see https://github.com/hufang360/FlashTool
     */
    function IsFrameBlank(frame) {
        return frame.elements.length === 0 && IsEmpty(frame.actionScript);
    }

    return {
        IsFrameBlank: isFrameBlank
    };
});
