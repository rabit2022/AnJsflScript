/**
 * @file: DrawParallelogram.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/19 23:39
 * @project: AnJsflScript
 * @description:
 */

define(["DrawRectangle", "SAT"], function(dr, SAT) {
    const { drawRectangleWithoutLine, drawRectangleWithoutFill } = dr;

    const { wrapTransform } = SAT.GLOBALS;

    /**
     * 绘制平行四边形
     * @param {Rectangle} rect 矩形
     * @param {string} color 颜色
     * @param {Vector} skew 斜切角度
     * @param {Timeline} timeline 时间轴
     * @param {FrameRange} fr 帧范围对象
     */
    function drawParallelogramWithoutLine(rect, color, skew, timeline, fr) {
        drawRectangleWithoutLine(rect, color);

        // 选中矩形
        timeline.setSelectedFrames([fr.layerIndex, fr.startFrame, fr.endFrame]);

        var doc = fl.getDocumentDOM(); //获取文档对象
        var selection = doc.selection; //选择

        selection.forEach(function(element) {
            var transform = wrapTransform(element).setSkew(skew);
        });
    }

    function drawParallelogramWithoutFill(rect, color, skew, timeline, fr) {
        drawRectangleWithoutFill(rect, color);

        // 选中矩形
        timeline.setSelectedFrames([fr.layerIndex, fr.startFrame, fr.endFrame]);

        var doc = fl.getDocumentDOM(); //获取文档对象
        var selection = doc.selection; //选择

        selection.forEach(function(element) {
            var transform = wrapTransform(element).setSkew(skew);
        });
    }

    return {
        drawParallelogramWithoutLine,
        drawParallelogramWithoutFill
    };
});
