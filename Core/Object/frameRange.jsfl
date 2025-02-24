/**
 * @file: FrameRange.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/17 22:56
 * @project: AnJsflScript
 * @description:
 */

define(function () {
    /**
     * 帧范围类
     * 左闭右开区间 [startFrame, endFrame)
     * @param {number} layerIndex 图层索引
     * @param {number} startFrame 开始帧
     * @param {number} endFrame 结束帧
     */
    function FrameRange(layerIndex, startFrame, endFrame) {
        this.layerIndex = layerIndex;
        this.startFrame = startFrame;
        this.endFrame = endFrame;

        this.duration = endFrame - startFrame;
    }
    /**
     * 判断两个帧范围是否有重叠
     * @param {FrameRange} other 另一个帧范围
     * @return {boolean} 是否有重叠
     */
    FrameRange.prototype.intersects = function (other) {
        return (
            this.startFrame <= other.endFrame &&
            other.startFrame <= this.endFrame
        );
    };

    FrameRange.prototype.clone = function () {
        return new FrameRange(this.layerIndex, this.startFrame, this.endFrame);
    };
    /**
     * 输出字符串
     * @return {string} 字符串
     */
    FrameRange.prototype.toString = function () {
        return (
            'FrameRange(layerIndex=' +
            this.layerIndex +
            ', startFrame=' +
            this.startFrame +
            ', endFrame=' +
            this.endFrame +
            ')'
        );
    };

    /**
     * 判断 当前 FrameRange 是否包含   fr2 选中范围
     * @param {FrameRange} fr2 选中范围数组
     * @return {boolean} 是否包含
     */
    FrameRange.prototype.contain = function (fr2) {
        // print("this=" + this.toString() + ", fr2=" + fr2.toString())
        if (this.layerIndex !== fr2.layerIndex) {
            return false;
        }
        return (
            this.startFrame <= fr2.startFrame && this.endFrame >= fr2.endFrame
        );
    };

    /**
     * 转换为数组
     * @return {[number, number, number]} 数组
     */
    FrameRange.prototype.toArray = function () {
        return [this.layerIndex, this.startFrame, this.endFrame];
    };

    return FrameRange;
});
