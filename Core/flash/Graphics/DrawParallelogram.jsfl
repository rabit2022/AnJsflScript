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
    "checkUtil",
    "ElementSelect",
    "ElementChecker"
], function (dr, SAT, sng, assert, chroma, checkUtil, es, ec) {
    const { CheckDom, CheckSelection, CheckSelectedFrames } = checkUtil;

    const { drawRectangle, drawRectangleWithoutLine } = dr;

    const { Vector } = SAT;
    const { wrapTransform } = SAT.GLOBALS;
    const { generateNameUntilUnique, generateNameUseLast } = sng;
    const { SelectAll, InvertSelection, SelectNone } = es;
    const { IsShape } = ec;

    /**
     * 绘制平行四边形
     * @param {Rectangle} rect 矩形
     * @param {string|W3CX11ColorName} [color="black"] 颜色
     * @param {Vector} [skew=new Vector(0,0)] 斜切角度
     */
    function drawParallelogram(rect, color, skew) {
        if (color === undefined) color = "black";
        color = chroma(color).hex();
        if (skew === undefined) skew = new Vector(0, 0);

        var doc = fl.getDocumentDOM(); //获取文档对象
        var timeline = doc.getTimeline(); //获取时间轴对象

        drawRectangle(rect, color);

        // doc.mouseClick(rect.getCenterVector().toObj(), false, false);
        // timeline.setSelectedFrames([0, 0, 1]);
        doc.setSelectionRect(rect.toObj());
        // CompleteTodo:可能包含元件,需要过滤出元件，并且反选
        // 选中不是形状的元素。
        SelectAll();
        var allElements = doc.selection;
        var nonShapeElements = allElements.filter(function (element) {
            return IsShape(element) === false;
        });

        // shape selection
        InvertSelection(nonShapeElements);

        var selection = doc.selection; //选择
        var element = selection[0];

        var transform = wrapTransform(element).setSkew(skew);
    }

    function drawParallelogramWithoutLine(rect, color, skew) {
        if (color === undefined) color = "black";
        color = chroma(color).hex();
        if (skew === undefined) skew = new Vector(0, 0);

        var doc = fl.getDocumentDOM(); //获取文档对象

        // drawRectangle(rect, color, false, false);
        drawRectangleWithoutLine(rect, color);

        doc.mouseClick(rect.getCenterVector().toObj(), false, false);

        var selection = doc.selection; //选择
        var element = selection[0];

        var transform = wrapTransform(element).setSkew(skew);
    }

    function drawParallelogramWithoutFill(rect, color, skew) {
        drawParallelogram(rect, color, skew);

        SelectNone();

        var doc = fl.getDocumentDOM(); //获取文档对象
        doc.mouseClick(rect.getCenterVector().toObj(), false, false);
        doc.deleteSelection();
    }

    return {
        drawParallelogram: drawParallelogram,
        drawParallelogramWithoutLine: drawParallelogramWithoutLine,
        drawParallelogramWithoutFill: drawParallelogramWithoutFill
    };
});
