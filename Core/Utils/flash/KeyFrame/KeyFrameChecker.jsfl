/**
 * @file: KeyFrameChecker.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/4/22 18:36
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 判断指定帧是否为关键帧
     * @param layer 目标层
     * @param frameIndex 帧索引
     * @return {boolean} 关键帧返回true，否则返回false
     */
    function IsKeyFrame(layer, frameIndex) {
        var frame = layer.frames[frameIndex];
        if (!frame) return false;
        return frame.startFrame === frameIndex;
    }
    return {
        IsKeyFrame: IsKeyFrame
    };
});
