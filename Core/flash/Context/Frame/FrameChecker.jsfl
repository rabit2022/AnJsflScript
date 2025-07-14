/**
 * @file: FrameChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 23:42
 * @project: AnJsflScript
 * @description:
 */

define(["FUNC"], function (FUNC) {
    const { IsEmpty } = FUNC;

    /**
     * 检查帧是否为空
     * @param {Frame} frame 要检查的帧
     * @return {Boolean} 帧是否为空
     * @see https://github.com/hufang360/FlashTool
     */
    function IsFrameBlank(frame) {
        // 元件数量为0
        // 动作脚本为空
        // return frame.elements.length === 0 && IsEmpty(frame.actionScript);
        return IsEmptyFrame(frame) && IsEmpty(frame.actionScript);
    }

    /**
     * 检查是否为无效帧
     * @note 无效帧指的是  帧索引   超过了  最大帧索引
     * @param {Layer} layer 要检查的层
     * @param {Number} frameIndex 要检查的帧索引
     * @return {Boolean} 帧是否为无效帧
     */
    function IsNoneFrame(layer, frameIndex) {
        var max_frames = layer.frames.length;
        return frameIndex >= max_frames;
    }

    /**
     * 检查是否为空帧
     * @param {Frame} frame 要检查的帧
     * @return {Boolean} 帧是否为空帧
     */
    function IsEmptyFrame(frame) {
        return frame.isEmpty;
    }

    return {
        IsFrameBlank: IsFrameBlank,
        IsNoneFrame: IsNoneFrame
        // IsEmptyFrame: IsEmptyFrame
    };
});
