/**
 * @file: DrawParallelogram.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2025/5/19 23:39
 * @project: AnJsflScript
 * @description:
 */

define([
    "DrawRectangle",
    "SAT",
    "SymbolNameGenerator",
    "assert",
    "chroma-js",
    "checkUtil"
], function (dr, SAT, sng, assert, chroma, checkUtil) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { drawRectangleWithoutLine, drawRectangleWithoutFill } = dr;

    const { wrapTransform } = SAT.GLOBALS;
    const { generateNameUntilUnique, generateNameUseLast } = sng;

    /**
     * 绘制平行四边形
     * @param {Rectangle} rect 矩形
     * @param {string} color 颜色
     * @param {Vector} skew 斜切角度
     * @param {Timeline} [timeline1] 时间轴
     * @param {FrameRange} [fr] 帧范围对象
     */
    function drawParallelogramWithoutLine(rect, color, skew, timeline1, fr) {
        color = chroma(color).hex();

        var doc = fl.getDocumentDOM(); //获取文档对象
        var timeline = doc.getTimeline(); //获取时间轴对象
        var layers = timeline.layers; //获取图层对象

        if (timeline1 === undefined) timeline1 = timeline;
        if (fr === undefined) {
            var frs = CheckSelectedFrames(timeline);
            if (frs === null) return;
            var firstLayer = layers[frs[0].layerIndex];
            var firstFrame = frs[0].startFrame;

            fr = frs[0];
        }

        drawRectangleWithoutLine(rect, color);

        // 选中矩形
        timeline1.setSelectedFrames([fr.layerIndex, fr.startFrame, fr.endFrame]);

        var selection = doc.selection; //选择
        if (selection.length !== 1) {
            console.error(
                "当前图层中选择的元素数量必须为1，否则无法进行平行四边形绘制。"
            );
            assert(
                selection.length === 1,
                "当前图层中选择的元素数量必须为1，否则无法进行平行四边形绘制。"
            );
            return;
        }

        selection.forEach(function (element) {
            var transform = wrapTransform(element).setSkew(skew);
        });
    }

    function drawParallelogramWithoutFill(rect, color, skew, timeline, fr) {
        drawRectangleWithoutFill(rect, color);

        // 选中矩形
        timeline.setSelectedFrames([fr.layerIndex, fr.startFrame, fr.endFrame]);

        var doc = fl.getDocumentDOM(); //获取文档对象
        var selection = doc.selection; //选择

        selection.forEach(function (element) {
            var transform = wrapTransform(element).setSkew(skew);
        });
    }

    return {
        drawParallelogramWithoutLine: drawParallelogramWithoutLine,
        drawParallelogramWithoutFill: drawParallelogramWithoutFill
    };
});
