/**
 * @file: FrameQuery.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/6/9 18:52
 * @project: AnJsflScript
 * @description:
 */
define(function () {
    /**
     * @description: 转换帧索引
     * @param {Frame[]} frames 帧数组
     * @param {Number|Frame} frame 帧索引
     * @return {Number} 转换后的帧索引
     * @bug: 如果帧name相同，则返回第一个帧的索引，可能与预期不符，尽量传入number类型帧索引,以避免歧义
     */
    function convertToFrameIndex(frames, frame) {
        var frameIndex = -1;
        if (typeof frame === "number") {
            frameIndex = frame;
        } else {
            frameIndex = frames.indexOf(frame);
        }
        return frameIndex;
    }

    /**
     * @description: 转换帧
     * @param {Frame[]} frames 帧数组
     * @param {Number|Frame} frame 帧索引
     * @return {Frame} 转换后的帧
     */
    function convertToFrame(frames, frame) {
        if (typeof frames === "number") {
            var frameIndex = frame;
            return frames[frameIndex];
        } else {
            return frame;
        }
    }

    return {
        convertToFrameIndex: convertToFrameIndex,
        convertToFrame: convertToFrame
    };
});
